"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, ThumbsUp } from "lucide-react";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
}

interface Props {
  productId: string;
  /** Reseña recién añadida por el usuario — se antepone sin refetch */
  optimisticReview?: Review | null;
  /** Calificación promedio actual del producto (para el breakdown) */
  baseRating: number;
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sz} ${
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-stone-200 text-stone-300"
          }`}
        />
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

function avatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default function ReviewsList({ productId, optimisticReview, baseRating }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/reviews?product_id=${encodeURIComponent(productId)}`);
      const json = await res.json() as { reviews?: Review[]; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Error");
      setReviews(json.reviews ?? []);
    } catch {
      setError("No pudimos cargar las reseñas.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  // Anteponer reseña optimista
  const displayReviews: Review[] = optimisticReview
    ? [optimisticReview, ...reviews.filter((r) => r.id !== optimisticReview.id)]
    : reviews;

  // Rating promedio de las reseñas cargadas (o base si aún no hay)
  const computedRating =
    displayReviews.length > 0
      ? displayReviews.reduce((acc, r) => acc + r.rating, 0) / displayReviews.length
      : baseRating;

  // Breakdown de estrellas
  function pctForStar(star: number) {
    if (displayReviews.length === 0) return 0;
    const count = displayReviews.filter((r) => Math.round(r.rating) === star).length;
    return Math.round((count / displayReviews.length) * 100);
  }

  return (
    <div className="flex flex-col gap-5 pt-6 mt-4 border-t border-stone-100">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-bold text-(--color-text) text-base">
          Reseñas de clientes
          {displayReviews.length > 0 && (
            <span className="ml-2 text-sm font-normal text-(--color-text-muted)">
              ({displayReviews.length})
            </span>
          )}
        </h3>
        {displayReviews.length > 0 && (
          <div className="flex items-center gap-2">
            <Stars rating={computedRating} />
            <span className="text-sm font-semibold text-(--color-text)">
              {computedRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Rating breakdown */}
      {displayReviews.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = pctForStar(star);
            return (
              <div key={star} className="flex items-center gap-2.5 text-xs">
                <span className="text-(--color-text-muted) w-3 shrink-0">{star}</span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                <div className="flex-1 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-(--color-text-muted) w-7 text-right shrink-0">{pct}%</span>
              </div>
            );
          })}
        </div>
      )}

      {/* States */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="shrink-0 h-9 w-9 rounded-full bg-stone-200" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-32 rounded bg-stone-200" />
                <div className="h-3 w-full rounded bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-rose-500">{error}</p>
      )}

      {!loading && !error && displayReviews.length === 0 && (
        <p className="text-sm text-(--color-text-muted)">
          Aún no hay reseñas. ¡Sé el primero en opinar!
        </p>
      )}

      {/* Lista de reseñas */}
      {!loading && displayReviews.length > 0 && (
        <div className="flex flex-col gap-5">
          {displayReviews.map((review) => (
            <div key={review.id} className="flex gap-3">
              <div className="shrink-0 h-9 w-9 rounded-full bg-bar flex items-center justify-center text-white text-xs font-bold uppercase">
                {avatarInitials(review.author_name)}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-(--color-text)">{review.author_name}</span>
                  <span className="text-xs text-(--color-text-muted)">{formatDate(review.created_at)}</span>
                </div>
                <Stars rating={review.rating} />
                <p className="text-sm text-(--color-text-muted) leading-relaxed mt-0.5">{review.body}</p>
                <button
                  onClick={() => setLiked((p) => ({ ...p, [review.id]: !p[review.id] }))}
                  className={`flex items-center gap-1.5 text-xs mt-1 w-fit transition ${
                    liked[review.id]
                      ? "text-accent font-semibold"
                      : "text-(--color-text-muted) hover:text-accent"
                  }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Útil{liked[review.id] ? " ✓" : ""}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
