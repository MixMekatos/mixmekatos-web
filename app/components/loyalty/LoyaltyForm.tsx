"use client";

import { useState, useRef } from "react";
import { Loader2, CheckCircle, Upload, X, Clock, Heart, Hash } from "lucide-react";
import Image from "next/image";

type Platform = "instagram" | "tiktok" | "facebook";
type RewardType = "follow" | "hashtag";

interface Result {
  type: RewardType;
  via_whatsapp?: boolean;
}

const PLATFORM_OPTIONS: { value: Platform; label: string; color: string }[] = [
  { value: "instagram", label: "Instagram", color: "bg-pink-500" },
  { value: "tiktok",    label: "TikTok",    color: "bg-stone-900" },
  { value: "facebook",  label: "Facebook",  color: "bg-blue-600"  },
];

const TABS: { value: RewardType; icon: typeof Heart; label: string }[] = [
  { value: "follow",  icon: Heart, label: "Siguenos"    },
  { value: "hashtag", icon: Hash,  label: "Etiquetanos" },
];

export default function LoyaltyForm() {
  const [rewardType, setRewardType]       = useState<RewardType>("follow");
  const [platform, setPlatform]           = useState<Platform>("instagram");
  const [handle, setHandle]               = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [waNumber, setWaNumber]           = useState("");
  const [postUrl, setPostUrl]             = useState("");
  const [file, setFile]                   = useState<File | null>(null);
  const [preview, setPreview]             = useState<string | null>(null);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [result, setResult]               = useState<Result | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function clearFile() {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function switchTab(t: RewardType) {
    setRewardType(t);
    setError(null);
    clearFile();
    setHandle("");
    setPostUrl("");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Solo se aceptan imagenes (JPG, PNG, WEBP).");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5 MB.");
      return;
    }
    setFile(f);
    setError(null);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Adjunta la captura de pantalla."); return; }
    setError(null);
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("reward_type",    rewardType);
      fd.append("social_platform", platform);
      fd.append("social_handle",  handle);
      fd.append("requester_name", requesterName);
      fd.append("wa_number",      waNumber);
      fd.append("screenshot",     file);
      if (postUrl.trim()) fd.append("post_url", postUrl.trim());
      fd.append("website", "");  

      const res  = await fetch("/api/loyalty", { method: "POST", body: fd });
      const json = await res.json() as {
        sent?: boolean;
        pending?: boolean;
        via_whatsapp?: boolean;
        error?: string;
      };

      if (!res.ok) {
        setError(json.error ?? "Ocurrio un error. Intenta mas tarde.");
        return;
      }
      if (json.sent)    setResult({ type: "follow",  via_whatsapp: json.via_whatsapp });
      else if (json.pending) setResult({ type: "hashtag" });
    } catch {
      setError("Error de conexion. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  if (result?.type === "follow") {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-(--color-text)">
            Tu codigo esta en camino!
          </h3>
          <p className="mt-2 text-sm text-(--color-text-muted)">
            {result.via_whatsapp
              ? "Te enviamos el codigo a tu WhatsApp. Usalo en tu proximo pedido."
              : "Tu solicitud fue registrada. Te enviaremos el codigo pronto por WhatsApp."}
          </p>
        </div>
        <p className="text-xs text-(--color-text-muted) max-w-xs">
          El codigo es personal y esta vinculado a tu numero de WhatsApp. No lo compartas.
        </p>
      </div>
    );
  }

  if (result?.type === "hashtag") {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <Clock className="h-10 w-10 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-(--color-text)">
            Participacion registrada!
          </h3>
          <p className="mt-2 text-sm text-(--color-text-muted)">
            Revisaremos tu publicacion en las proximas horas y te enviaremos
            tu premio directamente por WhatsApp.
          </p>
        </div>
        <p className="text-xs text-(--color-text-muted) max-w-xs">
          Mantien tu publicacion visible mientras revisamos.
          Si no cumple los requisitos te avisamos tambien.
        </p>
      </div>
    );
  }

  const isFollow = rewardType === "follow";
  const platformLabel = PLATFORM_OPTIONS.find((p) => p.value === platform)?.label ?? "";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex rounded-2xl bg-stone-100 p-1 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => switchTab(tab.value)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
              rewardType === tab.value
                ? "bg-white shadow text-(--color-text)"
                : "text-(--color-text-muted) hover:text-(--color-text)"
            }`}
          >
            <tab.icon className="h-4 w-4" aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div
        className={`rounded-xl px-4 py-3 text-sm ${
          isFollow ? "bg-pink-50 text-pink-800" : "bg-amber-50 text-amber-800"
        }`}
      >
        {isFollow
          ? "Siguenos en Instagram, TikTok o Facebook y recibe un premio especial sorpresa."
          : "Haz una publicacion etiquetando @mixmekatos con #MixMekatos y gana un premio sorpresa especial."}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-name" className="text-sm font-semibold text-(--color-text)">
            Tu nombre
          </label>
          <input
            id="lf-name"
            type="text"
            value={requesterName}
            onChange={(e) => setRequesterName(e.target.value)}
            placeholder="Nombre Apellido"
            maxLength={80}
            minLength={2}
            required
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-(--color-text) focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-(--color-text)">
            Red social
          </label>
          <div className="flex gap-2 flex-wrap">
            {PLATFORM_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPlatform(opt.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  platform === opt.value
                    ? `${opt.color} text-white shadow-md scale-105`
                    : "bg-stone-100 text-(--color-text-muted) hover:bg-stone-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-handle" className="text-sm font-semibold text-(--color-text)">
            Tu usuario en {platformLabel}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted) text-sm select-none">
              @
            </span>
            <input
              id="lf-handle"
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="tu_usuario"
              maxLength={80}
              required
              className="w-full rounded-xl border border-stone-200 bg-white pl-7 pr-3 py-2.5 text-sm text-(--color-text) focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {!isFollow && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lf-posturl" className="text-sm font-semibold text-(--color-text)">
              URL de tu publicacion{" "}
              <span className="text-xs font-normal text-(--color-text-muted)">(recomendado)</span>
            </label>
            <input
              id="lf-posturl"
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://www.instagram.com/p/..."
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-(--color-text) focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-xs text-(--color-text-muted)">
              Pega el link de tu post para que podamos verificarlo mas rapido.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-(--color-text)">
            {isFollow
              ? "Captura mostrando que nos sigues (con fecha/hora visible)"
              : "Captura de tu publicacion (usuario, @mixmekatos y #MixMekatos visibles)"}
          </label>
          {preview ? (
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 max-h-48">
              <Image
                src={preview}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={clearFile}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 py-8 transition hover:border-accent hover:bg-orange-50"
            >
              <Upload className="h-8 w-8 text-(--color-text-muted)" />
              <span className="text-sm text-(--color-text-muted)">Toca para subir la imagen</span>
              <span className="text-xs text-(--color-text-muted) opacity-70">
                JPG, PNG o WEBP · max 5 MB
              </span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-wa" className="text-sm font-semibold text-(--color-text)">
            Tu numero de WhatsApp
          </label>
          <input
            id="lf-wa"
            type="tel"
            value={waNumber}
            onChange={(e) => setWaNumber(e.target.value)}
            placeholder="3001234567"
            required
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-(--color-text) focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-xs text-(--color-text-muted)">
            {isFollow
              ? "Tu codigo llegara a este numero. Usalo en tu proximo pedido para canjear tu regalo gratis."
              : "Tu premio llegara a este numero cuando verifiquemos tu publicacion."}
          </p>
        </div>

        <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-accent py-3 text-sm font-bold text-white transition hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : isFollow ? (
            "Reclamar mi regalo gratis"
          ) : (
            "Enviar mi participacion"
          )}
        </button>

        <p className="text-xs text-center text-(--color-text-muted)">
          Un beneficio por numero de WhatsApp por red social cada {isFollow ? "60" : "30"} dias.
          No acumulable.
        </p>
      </form>
    </div>
  );
}