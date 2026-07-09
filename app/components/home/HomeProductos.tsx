"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productsData from "@/app/data/products.json";
import { formatPrice, type Product } from "@/app/lib/products";

gsap.registerPlugin(ScrollTrigger);

// Real catalog, the same 8-SKU source used on /productos, wired into the
// home page for the first time (stage 9): each card below surfaces real
// price/weight/rating data pulled from here instead of hardcoded copy.
const CATALOG = productsData as unknown as Product[];

function getSku(id: string): Product {
  const sku = CATALOG.find((product) => product.id === id);
  if (!sku) {
    throw new Error(`HomeProductos: SKU "${id}" not found in app/data/products.json`);
  }
  return sku;
}

type CardCopy = {
  id: string;
  skuId: string;
  eyebrow: string;
  title: string;
  description: string;
  variant: "photo" | "typography";
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  duotone?: boolean;
  dataRowTone: "onPhoto" | "onSurface";
};

const PRODUCTS: CardCopy[] = [
  {
    id: "empanadas",
    skuId: "emp-maiz-x6",
    eyebrow: "Lo más pedido",
    title: "Empanadas de maíz",
    description:
      "Horneadas, crujientes por fuera y rellenas de puro sabor por dentro. La estrella de la casa.",
    variant: "photo",
    // TEMP stock photo, swap for real product photography.
    image: "/layout/banner-example.jpg",
    imageAlt:
      "Empanadas de maíz doradas servidas con salsa criolla y ají picante sobre un plato negro",
    imagePosition: "object-[58%_42%]",
    duotone: true,
    dataRowTone: "onPhoto",
  },
  {
    id: "queso",
    skuId: "dedos-queso-x6",
    eyebrow: "Imperdible",
    title: "Palos de queso",
    description:
      "Queso fundido envuelto en una mezcla dorada e irresistible. Para compartir, o no.",
    variant: "photo",
    // TEMP stock photo, swap for real product photography.
    image: "/products/temp/temp-dedos-queso-pexels.jpg",
    imageAlt:
      "Palitos de queso empanizados y fritos, dorados y crocantes, servidos en un plato blanco",
    dataRowTone: "onPhoto",
  },
  {
    id: "congelados",
    skuId: "congelado-emp-x12",
    eyebrow: "Supermercados & mayorista",
    title: "Congelados prefritos",
    description:
      "Listos para calentar en minutos. Misma calidad MixMekatos en tu casa o negocio.",
    variant: "typography",
    dataRowTone: "onSurface",
  },
];

/** Confident-specificity data row: price, weight/unit, rating - 3 data
 * points max, styled as a thin divided strip rather than a spec table.
 * Only one middle-dot on the whole row (inside the weight/unit segment) to
 * respect the project's separator-rationing convention; the other two
 * segments are split with hairline dividers instead of repeated dots. */
function ProductDataRow({ sku, tone }: { sku: Product; tone: "onPhoto" | "onSurface" }) {
  const textClass = tone === "onPhoto" ? "text-white/90" : "text-ink-text";
  const borderClass = tone === "onPhoto" ? "border-white/20" : "border-glow/20";
  const dividerClass = tone === "onPhoto" ? "border-white/25" : "border-glow/25";

  return (
    <div
      className={`relative mt-4 flex flex-wrap items-center border-t pt-3 text-sm font-semibold sm:text-base ${borderClass} ${textClass}`}
    >
      <span className="pr-4">{formatPrice(sku.price)}</span>
      <span className={`border-l pl-4 pr-4 ${dividerClass}`}>
        {sku.weight} · {sku.unit}
      </span>
      <span className={`inline-flex items-center gap-1 border-l pl-4 ${dividerClass}`}>
        <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        {sku.rating} ({sku.ratingCount})
      </span>
    </div>
  );
}

/**
 * Stage 10 rebuild: the previous version pinned each card at full-viewport
 * height (`min-h-[100dvh]`), which read as bloated and made the
 * `rounded-3xl` corner radius visually imperceptible at that scale ("una
 * card sale hasta sin bordes redondeados"). Cards are now a fixed, generous
 * but genuinely finite height (520px / 600px at sm+) so the radius is
 * actually visible and the section reads as a confident showcase rather
 * than a screen takeover.
 *
 * The pin/stack mechanic is replaced with a pronounced per-card scroll
 * entrance (scale 0.85 -> 1, y 80 -> 0, fade in) via GSAP ScrollTrigger,
 * plus the same photo parallax from the previous stage (kept, magnitude
 * tuned down to match the smaller card). Isolated from the Framer Motion
 * primitives used elsewhere on the page (GSAP and Framer Motion must never
 * share a component tree). `ScrollTrigger.matchMedia` still gates the
 * parallax magnitude by breakpoint; the entrance reveal itself is cheap
 * enough (no pin, no layout thrash) to run at every width.
 */
export default function HomeProductos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) {
      // Static stacked layout: cards simply flow and scroll normally, no
      // entrance animation, no parallax.
      return;
    }

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      const imageEls = gsap.utils.toArray<HTMLElement>(".stack-card-image");

      // Pronounced entrance: each card scales/fades/rises into place as it
      // crosses into view. This is the section's signature scroll moment
      // now that full-viewport pinning is gone.
      cardEls.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, scale: 0.85, y: 80 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          imageEls.forEach((imgWrap) => {
            gsap.to(imgWrap, {
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: imgWrap.closest(".stack-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        },

        "(max-width: 767px)": () => {
          imageEls.forEach((imgWrap) => {
            gsap.to(imgWrap, {
              y: 20,
              ease: "none",
              scrollTrigger: {
                trigger: imgWrap.closest(".stack-card"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ink py-14">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="mx-auto mb-3 inline-flex w-fit rounded-full bg-glow/12 px-4 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-glow">
          Nuestros productos
        </p>
        <h2 className="mb-10 font-display text-2xl font-semibold text-ink-text sm:text-3xl">
          Hechos para que repitas
        </h2>
      </div>

      <div ref={containerRef} className="relative px-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:gap-10">
          {PRODUCTS.map((product) => {
            const sku = getSku(product.skuId);
            return (
              <article
                key={product.id}
                className="stack-card group relative flex h-[520px] items-end overflow-hidden rounded-3xl sm:h-[600px]"
              >
                {product.variant === "photo" ? (
                  <>
                    <div
                      className="stack-card-image absolute inset-x-0"
                      style={{ top: -60, bottom: -60 }}
                    >
                      <Image
                        src={product.image as string}
                        alt={product.imageAlt as string}
                        fill
                        sizes="(min-width: 768px) 80vw, 100vw"
                        className={`object-cover transition duration-300 motion-safe:group-hover:scale-105 ${
                          product.imagePosition ?? ""
                        }`}
                      />
                    </div>
                    {product.duotone && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-masa opacity-40 mix-blend-color"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
                    />
                    <span className="absolute top-6 right-6 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-ink shadow-sm backdrop-blur-sm sm:top-8 sm:right-8">
                      {product.eyebrow}
                    </span>
                    <div className="relative w-full p-6 sm:p-8 md:p-10">
                      <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                        {product.title}
                      </h3>
                      <p className="mt-3 max-w-md text-base text-white/85 sm:text-lg">
                        {product.description}
                      </p>
                      <div className="max-w-md">
                        <ProductDataRow sku={sku} tone={product.dataRowTone} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative flex h-full w-full flex-col justify-between bg-ink-surface p-6 sm:p-8 md:p-10">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-br from-glow/15 via-transparent to-transparent"
                    />
                    <span className="relative w-fit rounded-full bg-glow/15 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-glow">
                      {product.eyebrow}
                    </span>
                    <div className="relative">
                      <h3 className="font-display text-2xl font-semibold text-ink-text sm:text-3xl md:text-4xl">
                        {product.title}
                      </h3>
                      <p className="mt-3 max-w-md text-base text-ink-text-muted sm:text-lg">
                        {product.description}
                      </p>
                      <div className="max-w-md">
                        <ProductDataRow sku={sku} tone={product.dataRowTone} />
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4 text-center">
        <Link
          href="/productos"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-glow px-8 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-glow-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}
