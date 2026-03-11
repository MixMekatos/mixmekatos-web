"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "@/app/lib/products";
import {
  formatPrice,
  CATEGORIES,
  TAG_LABELS,
  TAG_CHIP_STYLE,
  TAG_CHIP_PRIORITY,
  CATEGORY_EMOJI,
  CATEGORY_BG,
} from "@/app/lib/products";
import ProductModal from "./ProductModal";

function StarsMini({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3 w-3 ${
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
}

export default function ProductCard({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const mainImage = product.images[0];
  const showPlaceholder = !mainImage || imgError;
  const tagChip = TAG_CHIP_PRIORITY.find((t) => product.tags?.includes(t));

  return (
    <>
      <article className="group flex flex-col rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <button
          onClick={() => setOpen(true)}
          className="relative w-full aspect-4/3 overflow-hidden focus:outline-none"
          aria-label={`Ver detalles de ${product.name}`}
        >
          {showPlaceholder ? (
            <div
              className={`w-full h-full flex items-center justify-center ${
                CATEGORY_BG[product.category]
              }`}
            >
              <span className="text-6xl select-none">{CATEGORY_EMOJI[product.category]}</span>
            </div>
          ) : (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          )}

          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            {product.discount && (
              <span className="rounded-full bg-rose-500 text-white px-2 py-0.5 text-[11px] font-bold shadow-sm">
                -{product.discount}%
              </span>
            )}
            {tagChip && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-sm ${
                  TAG_CHIP_STYLE[tagChip] ?? "bg-stone-700 text-white"
                }`}
              >
                {TAG_LABELS[tagChip]}
              </span>
            )}
          </div>

          <span className="absolute bottom-2 right-2 rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white">
            {CATEGORIES[product.category]}
          </span>
        </button>

        <div className="flex flex-col gap-2 p-4 flex-1">
          <h3 className="font-semibold text-(--color-text) text-sm leading-snug line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5">
            <StarsMini rating={product.rating} />
            <span className="text-xs text-(--color-text-muted)">({product.ratingCount})</span>
          </div>

          <p className="text-xs text-(--color-text-muted)">
            {product.weight} · {product.unit}
          </p>

          <div className="mt-auto pt-2 flex items-end justify-between gap-2">
            <div>
              <p className="text-base font-bold text-(--color-text)">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-xs text-(--color-text-muted) line-through -mt-0.5">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-hover active:scale-95 shrink-0"
            >
              Ver más
            </button>
          </div>
        </div>
      </article>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}
