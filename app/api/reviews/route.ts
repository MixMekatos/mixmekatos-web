import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/app/lib/supabase";

const rateLimitMap = new Map<string, number>();

function isRateLimited(ip: string, productId: string): boolean {
  const key = `${ip}:${productId}`;
  const last = rateLimitMap.get(key);
  if (last && Date.now() - last < 24 * 60 * 60 * 1000) return true;
  rateLimitMap.set(key, Date.now());
  return false;
}

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("product_id");
  if (!productId) {
    return NextResponse.json({ error: "product_id requerido" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, body, created_at")
    .eq("product_id", productId)
    .eq("flagged", false)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: "Error al obtener reseñas" }, { status: 500 });
  }

  return NextResponse.json({ reviews: data });
}


export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { product_id, author_name, rating, review_body, honeypot } =
    body as Record<string, unknown>;

  if (honeypot) {
    return NextResponse.json({ ok: true }); 
  }

  if (
    typeof product_id !== "string" ||
    typeof author_name !== "string" ||
    typeof rating !== "number" ||
    typeof review_body !== "string"
  ) {
    return NextResponse.json({ error: "Campos inválidos" }, { status: 400 });
  }

  if (author_name.trim().length < 2 || author_name.trim().length > 60) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 422 });
  }
  if (review_body.trim().length < 10 || review_body.trim().length > 1000) {
    return NextResponse.json({ error: "La reseña debe tener entre 10 y 1000 caracteres" }, { status: 422 });
  }
  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return NextResponse.json({ error: "Rating inválido" }, { status: 422 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip, product_id)) {
    return NextResponse.json(
      { error: "Solo puedes dejar una reseña por producto cada 24 horas" },
      { status: 429 }
    );
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id,
      author_name: author_name.trim(),
      rating,
      body: review_body.trim(),
    })
    .select("id, author_name, rating, body, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: "Error al guardar la reseña" }, { status: 500 });
  }

  return NextResponse.json({ review: data }, { status: 201 });
}
