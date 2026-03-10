import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/app/lib/supabase";
import { generateCouponCode, sanitizeWaNumber } from "@/app/lib/coupons";
import { sendCouponViaWhatsApp } from "@/app/lib/whatsapp";

const FOLLOW_COOLDOWN_DAYS = 60; 
const HASHTAG_COOLDOWN_DAYS = 30;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_PLATFORMS = ["instagram", "tiktok", "facebook"] as const;
const ALLOWED_REWARD_TYPES = ["follow", "hashtag"] as const;
type SocialPlatform = (typeof ALLOWED_PLATFORMS)[number];
type RewardType = (typeof ALLOWED_REWARD_TYPES)[number];

/* ---- POST /api/loyalty ---- */
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "FormData invalido" }, { status: 400 });
  }


  const honeypot = formData.get("website");
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const reward_type = (formData.get("reward_type") as string | null)
    ?.toLowerCase() as RewardType | null;
  const social_handle = (formData.get("social_handle") as string | null)?.trim();
  const social_platform = (formData.get("social_platform") as string | null)
    ?.toLowerCase() as SocialPlatform | null;
  const requester_name = (formData.get("requester_name") as string | null)?.trim();
  const wa_raw = (formData.get("wa_number") as string | null)?.trim();
  const screenshot = formData.get("screenshot") as File | null;
  const post_url_raw = (formData.get("post_url") as string | null)?.trim() || null;

  // ---- Validaciones ----
  if (!reward_type || !ALLOWED_REWARD_TYPES.includes(reward_type)) {
    return NextResponse.json({ error: "Tipo de recompensa invalido" }, { status: 422 });
  }
  if (!requester_name || requester_name.length < 2 || requester_name.length > 80) {
    return NextResponse.json({ error: "Nombre invalido (2-80 caracteres)" }, { status: 422 });
  }
  if (!social_handle || social_handle.length < 2 || social_handle.length > 80) {
    return NextResponse.json({ error: "Handle invalido" }, { status: 422 });
  }
  if (!social_platform || !ALLOWED_PLATFORMS.includes(social_platform)) {
    return NextResponse.json({ error: "Red social invalida" }, { status: 422 });
  }
  if (!wa_raw) {
    return NextResponse.json({ error: "Numero de WhatsApp requerido" }, { status: 422 });
  }
  if (!screenshot || screenshot.size === 0) {
    return NextResponse.json({ error: "Captura de pantalla requerida" }, { status: 422 });
  }
  if (screenshot.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "La imagen no puede superar 5 MB" }, { status: 422 });
  }
  if (!screenshot.type.startsWith("image/")) {
    return NextResponse.json({ error: "El archivo debe ser una imagen" }, { status: 422 });
  }

  // Validar URL del post solo si se proporcionó
  let post_url: string | null = null;
  if (post_url_raw) {
    try {
      const u = new URL(post_url_raw);
      if (!["http:", "https:"].includes(u.protocol)) {
        return NextResponse.json({ error: "URL del post invalida" }, { status: 422 });
      }
      post_url = post_url_raw;
    } catch {
      return NextResponse.json({ error: "URL del post invalida" }, { status: 422 });
    }
  }

  const wa_number = sanitizeWaNumber(wa_raw);
  if (wa_number.length < 10) {
    return NextResponse.json({ error: "Numero de WhatsApp invalido" }, { status: 422 });
  }

  const supabase = createServerClient();

  // ---- Anti-abuso: cooldown por (wa_number + social_platform + reward_type) ----
  const cooldownDays =
    reward_type === "follow" ? FOLLOW_COOLDOWN_DAYS : HASHTAG_COOLDOWN_DAYS;
  const cooldownDate = new Date(
    Date.now() - cooldownDays * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data: existing } = await supabase
    .from("coupon_requests")
    .select("id")
    .eq("wa_number", wa_number)
    .eq("social_platform", social_platform)
    .eq("reward_type", reward_type)
    .gte("created_at", cooldownDate)
    .limit(1)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      {
        error: `Ya participaste con esta red social recientemente. Puedes intentarlo de nuevo en ${cooldownDays} dias.`,
      },
      { status: 429 }
    );
  }

  // ---- Subir screenshot a Storage ----
  const ext = screenshot.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = `${reward_type}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const arrayBuffer = await screenshot.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("loyalty-screenshots")
    .upload(fileName, arrayBuffer, {
      contentType: screenshot.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("loyalty-screenshots")
    .getPublicUrl(fileName);

  // ---- FLUJO FOLLOW: codigo auto + enviar por WhatsApp ----
  if (reward_type === "follow") {
    let code = "";
    let attempts = 0;
    while (attempts < 5) {
      const candidate = generateCouponCode();
      const { data: dup } = await supabase
        .from("coupon_requests")
        .select("id")
        .eq("code", candidate)
        .maybeSingle();
      if (!dup) {
        code = candidate;
        break;
      }
      attempts++;
    }
    if (!code) {
      return NextResponse.json({ error: "Error generando el codigo" }, { status: 500 });
    }

    const { sent } = await sendCouponViaWhatsApp(wa_number, code, requester_name);
    const status = sent ? "issued" : "pending_whatsapp";

    const { error: insertError } = await supabase.from("coupon_requests").insert({
      social_handle,
      social_platform,
      screenshot_url: urlData.publicUrl,
      wa_number,
      code,
      requester_name,
      reward_type: "follow",
      status,
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Error al guardar la solicitud" }, { status: 500 });
    }

    return NextResponse.json({ sent: true, via_whatsapp: sent }, { status: 201 });
  }

  // ---- FLUJO HASHTAG: guardar para revision manual ----
  const { error: insertError } = await supabase.from("coupon_requests").insert({
    social_handle,
    social_platform,
    screenshot_url: urlData.publicUrl,
    wa_number,
    requester_name,
    reward_type: "hashtag",
    post_url,
    status: "pending_review",
  });

  if (insertError) {
    console.error("Insert error:", insertError);
    return NextResponse.json({ error: "Error al guardar la solicitud" }, { status: 500 });
  }

  return NextResponse.json({ pending: true }, { status: 201 });
}