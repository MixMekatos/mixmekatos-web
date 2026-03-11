"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle } from "lucide-react";

interface Props {
  productId: string;
  onSubmitted: (review: {
    id: string;
    author_name: string;
    rating: number;
    body: string;
    created_at: string;
  }) => void;
}

export default function ReviewForm({ productId, onSubmitted }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Selecciona una calificación"); return; }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          author_name: authorName,
          rating,
          review_body: body,
          honeypot: "", // campo  vacío; el honeypot invisible lo pone el input oculto
        }),
      });

      const json = await res.json() as { review?: { id: string; author_name: string; rating: number; body: string; created_at: string }; error?: string };

      if (!res.ok) {
        setError(json.error ?? "Error al enviar la reseña");
        return;
      }

      if (json.review) {
        onSubmitted(json.review);
        setDone(true);
      }
    } catch {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 px-4 py-4">
        <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">¡Gracias por tu reseña!</p>
          <p className="text-xs text-green-700 mt-0.5">Ya está publicada para que otros clientes la vean.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl bg-stone-50 border border-stone-100 p-4">
      <h4 className="text-sm font-bold text-(--color-text)">Deja tu reseña</h4>

      <div className="flex items-center gap-1" role="group" aria-label="Calificación">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setRating(s)}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${s} estrella${s > 1 ? "s" : ""}`}
          >
            <Star
              className={`h-7 w-7 transition-colors ${
                s <= (hovered || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-stone-200 text-stone-300"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="review-name" className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-wide">
          Tu nombre
        </label>
        <input
          id="review-name"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Ej: Valentina M."
          maxLength={60}
          required
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-(--color-text) placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="review-body" className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-wide">
          Tu opinión
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="¿Qué te pareció el producto?"
          maxLength={1000}
          required
          rows={3}
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-(--color-text) placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
        <p className="text-xs text-(--color-text-muted) text-right">{body.length}/1000</p>
      </div>

      <input
        type="text"
        name="honeypot_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
        onChange={() => {}} // honey: si se rellena, el backend lo rechazará
      />

      {error && (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-sm font-bold text-white transition hover:bg-accent-hover disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Enviando..." : "Publicar reseña"}
      </button>
    </form>
  );
}
