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
    <section className="bg-stone-50 px-4 py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
              Lo mejor de MixMekatos
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-(--color-text)">
              Productos destacados
            </h2>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-(--color-text-muted) shadow-sm transition hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-(--color-text-muted) shadow-sm transition hover:border-accent hover:text-accent"
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
