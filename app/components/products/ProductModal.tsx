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
  CATEGORY_ICON,
  CATEGORY_BG,
} from "@/app/lib/products";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import Image from "next/image";

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${sz} ${
            s <= Math.round(rating)
              ? "fill-glow text-glow"
              : "fill-ink-text-muted/20 text-ink-text-muted/30"
          }`}
        />
      ))}
    </div>
  );
}

interface NewReview {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
}

interface Props {
  product: Product;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "573016046264";

interface GalleryPanelProps {
  product: Product;
  imgIndex: number;
  imgError: Record<number, boolean>;
  onPrev: () => void;
  onNext: () => void;
  onThumbClick: (i: number) => void;
  onImgError: (i: number) => void;
}

function GalleryPanel({ product, imgIndex, imgError, onPrev, onNext, onThumbClick, onImgError }: GalleryPanelProps) {
  const hasImages = product.images.length > 0;
  const currentImgOk = hasImages && !imgError[imgIndex];
  const CategoryIcon = CATEGORY_ICON[product.category];

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`relative w-full rounded-2xl overflow-hidden
          aspect-square lg:aspect-auto lg:flex-1
          ${!currentImgOk ? `${CATEGORY_BG[product.category]} flex items-center justify-center` : "bg-ink-surface"}`}
        style={{ minHeight: "220px" }}
      >
        {currentImgOk ? (
          <Image
            src={product.images[imgIndex]}
            alt={`${product.name} - imagen ${imgIndex + 1}`}
            className="w-full h-full object-cover"
            onError={() => onImgError(imgIndex)}
          />
        ) : (
          <CategoryIcon className="h-24 w-24 text-glow/40" aria-hidden="true" />
        )}

        {product.discount && (
          <span className="absolute top-3 left-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow">
            -{product.discount}%
          </span>
        )}

        {product.images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/55 transition"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/55 transition"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {hasImages && product.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {product.images.map((src, i) => {
            const ok = !imgError[i];
            return (
              <button
                key={i}
                onClick={() => onThumbClick(i)}
                className={`shrink-0 h-14 w-14 rounded-xl overflow-hidden border-2 transition-all ${
                  i === imgIndex
                    ? "border-glow opacity-100 scale-105"
                    : "border-transparent opacity-55 hover:opacity-80"
                }`}
              >
                {ok ? (
                  <Image
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => onImgError(i)}
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center ${CATEGORY_BG[product.category]}`}
                  >
                    <CategoryIcon
                      className="h-6 w-6 text-glow/40"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DetailsPanel({ product }: { product: Product }) {
  const visibleTags = product.tags?.filter((t) => t !== "destacado") ?? [];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola! Me interesa el producto: ${product.name} - ${formatPrice(product.price)}`
  )}`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-glow/20 bg-ink px-3 py-1 text-xs font-medium text-ink-text-muted">
          {CATEGORIES[product.category]}
        </span>
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              TAG_BADGE_STYLE[tag] ?? "bg-ink text-ink-text-muted"
            }`}
          >
            {TAG_LABELS[tag]}
          </span>
        ))}
      </div>

      <div className="flex items-end flex-wrap gap-x-3 gap-y-1">
        <p className="font-display text-3xl font-extrabold text-glow">
          {formatPrice(product.price)}
        </p>
        {product.originalPrice && (
          <p className="text-lg text-ink-text-muted line-through">
            {formatPrice(product.originalPrice)}
          </p>
        )}
        {product.discount && product.originalPrice && (
          <span className="text-sm font-bold text-rose-400">
            Ahorras {formatPrice(product.originalPrice - product.price)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Stars rating={product.rating} />
        <span className="text-sm font-semibold text-ink-text">
          {product.rating.toFixed(1)}
        </span>
        <span className="text-sm text-ink-text-muted">
          ({product.ratingCount} {product.ratingCount === 1 ? "resena" : "resenas"})
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2.5 rounded-xl bg-ink border border-glow/10 p-3">
          <Scale className="h-5 w-5 text-glow shrink-0" />
          <div>
            <p className="text-[10px] text-ink-text-muted uppercase tracking-wide">Peso</p>
            <p className="text-sm font-semibold text-ink-text">{product.weight}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-ink border border-glow/10 p-3">
          <Package className="h-5 w-5 text-glow shrink-0" />
          <div>
            <p className="text-[10px] text-ink-text-muted uppercase tracking-wide">Presentacion</p>
            <p className="text-sm font-semibold text-ink-text">{product.unit}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-sm font-bold text-ink-text mb-1.5">Descripcion</h3>
        <p className="text-sm text-ink-text-muted leading-relaxed">
          {product.description}
        </p>
      </div>

      {product.ingredients && product.ingredients.length > 0 && (
        <div>
          <h3 className="font-display text-sm font-bold text-ink-text mb-2">Ingredientes</h3>
          <div className="flex flex-wrap gap-1.5">
            {product.ingredients.map((ing) => (
              <span
                key={ing}
                className="rounded-full bg-ink px-2.5 py-1 text-xs text-ink-text-muted"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

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
        <span className="text-xs text-ink-text-muted">
          {product.stock > 10
            ? "Disponible"
            : product.stock > 0
            ? `Ultimas ${product.stock} unidades`
            : "Agotado"}
        </span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-(--color-whatsapp) py-3.5 text-sm font-bold text-white transition hover:brightness-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-surface"
      >
        <MessageCircle className="h-5 w-5" />
        Pedir por WhatsApp
      </a>
    </div>
  );
}

export default function ProductModal({ product, onClose }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [newReview, setNewReview] = useState<NewReview | null>(null);

  const prevImg = () =>
    setImgIndex((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () =>
    setImgIndex((i) => (i + 1) % product.images.length);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/60 p-0 lg:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="
          relative bg-ink-surface shadow-2xl w-full
          rounded-t-3xl lg:rounded-3xl
          max-h-[95dvh] lg:max-h-[88dvh]
          lg:max-w-5xl
          flex flex-col lg:flex-row
          overflow-hidden
        "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-ink/90 shadow-md text-ink-text-muted hover:bg-ink hover:text-glow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        <div
          className="
            lg:w-[42%] lg:shrink-0
            lg:overflow-y-auto lg:border-r lg:border-glow/10
            p-4 lg:p-6 lg:flex lg:flex-col lg:gap-4
            [&::-webkit-scrollbar]:hidden
          "
        >
          <h2 className="lg:hidden font-display font-bold text-ink-text text-lg leading-snug pr-10 mb-3">
            {product.name}
          </h2>
          <GalleryPanel
            product={product}
            imgIndex={imgIndex}
            imgError={imgError}
            onPrev={prevImg}
            onNext={nextImg}
            onThumbClick={setImgIndex}
            onImgError={(i) => setImgError((p) => ({ ...p, [i]: true }))}
          />
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar-track]:bg-ink [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-glow/30 [&::-webkit-scrollbar]:w-1.5">
          <div className="p-5 lg:p-8 flex flex-col gap-0">
            <h2 className="hidden lg:block font-display font-bold text-ink-text text-2xl leading-snug mb-5">
              {product.name}
            </h2>

            <DetailsPanel product={product} />

            <ReviewsList
              productId={product.id}
              optimisticReview={newReview}
              baseRating={product.rating}
            />

            <div className="mt-5 mb-1">
              <ReviewForm
                productId={product.id}
                onSubmitted={(review) => setNewReview(review)}
              />
            </div>

            <div className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}