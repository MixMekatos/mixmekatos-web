"use client";

import { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Package,
  Scale,
  Star,
} from "lucide-react";
import type { Product } from "@/app/lib/products";
import {
  formatPrice,
  CATEGORIES,
  TAG_LABELS,
  TAG_BADGE_STYLE,
  CATEGORY_EMOJI,
  CATEGORY_BG,
} from "@/app/lib/products";

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
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

interface Props {
  product: Product;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "573001234567";

export default function ProductModal({ product, onClose }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const hasImages = product.images.length > 0;
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  /* Body scroll lock + Escape key */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const prevImg = () =>
    setImgIndex((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () =>
    setImgIndex((i) => (i + 1) % product.images.length);

  const visibleTags = product.tags?.filter((t) => t !== "destacado") ?? [];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola! Me interesa el producto: ${product.name} — $${product.price.toLocaleString("es-CO")}`
  )}`;

  const currentImgOk = hasImages && !imgError[imgIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90dvh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col">
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-white border-b border-stone-100">
          <h2 className="font-bold text-(--color-text) text-lg leading-snug pr-4 line-clamp-1">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-(--color-text-muted) hover:bg-stone-200 transition"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Image gallery ── */}
        <div
          className={`relative w-full aspect-video overflow-hidden ${
            !currentImgOk
              ? `${CATEGORY_BG[product.category]} flex items-center justify-center`
              : ""
          }`}
        >
          {currentImgOk ? (
            <>
              <img
                src={product.images[imgIndex]}
                alt={`${product.name} — imagen ${imgIndex + 1}`}
                className="w-full h-full object-cover"
                onError={() => setImgError((prev) => ({ ...prev, [imgIndex]: true }))}
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`rounded-full transition-all duration-200 ${
                          i === imgIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/55"
                        }`}
                        aria-label={`Ver imagen ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <span className="text-[90px] select-none leading-none">
              {CATEGORY_EMOJI[product.category]}
            </span>
          )}

          {/* Discount badge */}
          {product.discount && (
            <span className="absolute top-3 left-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {hasImages && product.images.length > 1 && (
          <div className="flex gap-2 px-5 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`shrink-0 h-14 w-14 rounded-xl overflow-hidden border-2 transition ${
                  i === imgIndex ? "border-accent" : "border-transparent opacity-60"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={() => setImgError((prev) => ({ ...prev, [i]: true }))}
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Body ── */}
        <div className="flex flex-col gap-5 px-5 py-5">
          {/* Category + Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-(--color-text-muted)">
              {CATEGORIES[product.category]}
            </span>
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  TAG_BADGE_STYLE[tag] ?? "bg-stone-100 text-stone-600"
                }`}
              >
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-end flex-wrap gap-x-3 gap-y-1">
            <p className="text-3xl font-extrabold text-(--color-text)">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-lg text-(--color-text-muted) line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            {product.discount && product.originalPrice && (
              <span className="text-sm font-bold text-rose-500">
                Ahorras {formatPrice(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Stars rating={product.rating} size="md" />
            <span className="text-sm font-semibold text-(--color-text)">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-(--color-text-muted)">
              ({product.ratingCount} reseñas)
            </span>
          </div>

          {/* Characteristics grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-xl bg-stone-50 border border-stone-100 p-3">
              <Scale className="h-5 w-5 text-(--color-text-muted) shrink-0" />
              <div>
                <p className="text-[11px] text-(--color-text-muted) uppercase tracking-wide">Peso</p>
                <p className="text-sm font-semibold text-(--color-text)">{product.weight}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-stone-50 border border-stone-100 p-3">
              <Package className="h-5 w-5 text-(--color-text-muted) shrink-0" />
              <div>
                <p className="text-[11px] text-(--color-text-muted) uppercase tracking-wide">Presentación</p>
                <p className="text-sm font-semibold text-(--color-text)">{product.unit}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-(--color-text) mb-1.5">Descripción</h3>
            <p className="text-sm text-(--color-text-muted) leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-(--color-text) mb-2">Ingredientes</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-(--color-text-muted)"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stock indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                product.stock > 10
                  ? "bg-green-500"
                  : product.stock > 0
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            />
            <span className="text-xs text-(--color-text-muted)">
              {product.stock > 10
                ? "Disponible"
                : product.stock > 0
                ? `Últimas ${product.stock} unidades`
                : "Agotado"}
            </span>
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="sticky bottom-0 bg-white border-t border-stone-100 px-5 py-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white transition hover:bg-[#20bd5a] active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
