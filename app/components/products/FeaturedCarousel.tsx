"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/app/lib/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function FeaturedCarousel({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-ink px-4 py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-glow mb-1">
              Lo mejor de MixMekatos
            </p>
            <h2 className="font-display text-xl font-semibold text-ink-text sm:text-2xl">
              Productos destacados
            </h2>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-glow/20 bg-ink-surface text-ink-text-muted shadow-sm transition hover:border-glow hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-glow/20 bg-ink-surface text-ink-text-muted shadow-sm transition hover:border-glow hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[31%] xl:w-[23%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
