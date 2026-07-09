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
      className={`stack-card-datarow relative mt-3 flex flex-wrap items-center border-t pt-2.5 text-xs font-semibold sm:text-sm ${borderClass} ${textClass}`}
    >
      <span className="pr-3">{formatPrice(sku.price)}</span>
      <span className={`border-l pl-3 pr-3 ${dividerClass}`}>
        {sku.weight} · {sku.unit}
      </span>
      <span className={`inline-flex items-center gap-1 border-l pl-3 ${dividerClass}`}>
        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
        {sku.rating} ({sku.ratingCount})
      </span>
    </div>
  );
}

/**
 * Stage 10 rebuild: the previous version pinned each card at full-viewport
 * height (`min-h-[100dvh]`), which read as bloated and made the
 * `rounded-3xl` corner radius visually imperceptible at that scale ("una
 * card sale hasta sin bordes redondeados"). Cards became a fixed, generous
 * but genuinely finite height (520px / 600px at sm+) so the radius was
 * actually visible and the section read as a confident showcase rather
 * than a screen takeover.
 *
 * Stage 11: still too big per direct feedback ("las card de productos aun
 * estan muy grandes"). Shrunk further to 380px / 440px, with the internal
 * type scale (eyebrow, title, description, ProductDataRow) and padding
 * trimmed one notch to match, so the smaller card reads as deliberately
 * compact rather than merely cropped.
 *
 * The pin/stack mechanic is replaced with a per-card scroll entrance
 * orchestrated as a small internal sequence rather than one flat tween: the
 * card container reveals first (scale/rotate/y/fade), then the eyebrow,
 * title, description and data row each get their own short staggered
 * fade-up so the card reads as "built" rather than dropped in as a single
 * block. Plus the same photo parallax from the previous stage (kept,
 * magnitude tuned down to match the smaller card). Isolated from the
 * Framer Motion primitives used elsewhere on the page (GSAP and Framer
 * Motion must never share a component tree). `ScrollTrigger.matchMedia`
 * still gates the parallax magnitude by breakpoint; the entrance reveal
 * itself is cheap enough (no pin, no layout thrash) to run at every width.
 *
 * Stage 13: `toggleActions` changed from "play none none reverse" to
 * "play reverse play reverse" - each card now genuinely exits (reverses)
 * as it scrolls away in either direction, not just when re-entering from
 * below. Previously a card that scrolled off the top going down stayed
 * frozen in its revealed state indefinitely.
 *
 * Stage 14: still read as too large per repeated direct feedback - the real
 * issue was never the height number, it was proportion: a single column of
 * full-container-width (~1150px) cards reads as oversized no matter how
 * short they are. Rebuilt as an actual 3-column grid (1 col mobile, 2
 * tablet, 3 desktop) - at roughly a third of the width each, the cards read
 * as a confident product grid instead of stacked banners. Entrance is more
 * dramatic to match ("entradas y salidas con scroll llamativas"): larger
 * scale/y travel and a small per-card rotation direction that alternates,
 * so the three cards feel like they're settling into place from slightly
 * different angles rather than identically.
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

      // Orchestrated entrance: the card container reveals first (scale +
      // slight rotate + rise + fade), then its content reveals itself in a
      // short staggered sequence (eyebrow -> title -> description -> data
      // row) rather than arriving as one flat block. Each card gets its own
      // timeline/ScrollTrigger so cards further down the page don't wait on
      // ones above them.
      cardEls.forEach((card, index) => {
        const innerEls = gsap.utils.toArray<HTMLElement>(
          [
            ".stack-card-eyebrow",
            ".stack-card-title",
            ".stack-card-desc",
            ".stack-card-datarow",
          ].join(","),
          card
        );

        // Alternating rotation direction per card (-1)^index, so the three
        // cards settle from slightly different angles instead of all
        // arriving identically - a small touch that reads as more crafted
        // once the cards are a modest grid size rather than full-width bars.
        const rotateFrom = index % 2 === 0 ? -4 : 4;

        // Stage 15: `toggleActions: "play reverse play reverse"` used a
        // fixed-duration tween (0.9s+) triggered by discrete play/reverse
        // calls - on any real scroll speed the animation couldn't keep up
        // with the trigger crossings, so the card's still-playing entrance
        // and its just-fired exit would collide mid-flight ("voy saliendo
        // cuando entran"). A `scrub`-linked tween has no independent
        // duration to outrun: its progress IS the scroll position, sampled
        // every frame, so it is mechanically impossible for it to lag
        // behind or fire out of order regardless of scroll speed.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 55%",
            scrub: 0.3,
          },
        });

        tl.fromTo(
          card,
          { autoAlpha: 0, scale: 0.78, y: 100, rotate: rotateFrom },
          { autoAlpha: 1, scale: 1, y: 0, rotate: 0, ease: "none" }
        );

        if (innerEls.length) {
          gsap.set(innerEls, { opacity: 0, y: 20 });
          tl.to(
            innerEls,
            { opacity: 1, y: 0, ease: "none", stagger: 0.1 },
            "-=0.45"
          );
        }
      });

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          imageEls.forEach((imgWrap) => {
            gsap.to(imgWrap, {
              y: 26,
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
              y: 16,
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const sku = getSku(product.skuId);
            return (
              <article
                key={product.id}
                className="stack-card group relative flex aspect-[4/5] items-end overflow-hidden rounded-3xl"
              >
                {product.variant === "photo" ? (
                  <>
                    <div
                      className="stack-card-image absolute inset-x-0"
                      style={{ top: -30, bottom: -30 }}
                    >
                      <Image
                        src={product.image as string}
                        alt={product.imageAlt as string}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
                    <span className="stack-card-eyebrow absolute top-4 right-4 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-semibold text-ink shadow-sm backdrop-blur-sm">
                      {product.eyebrow}
                    </span>
                    <div className="relative w-full p-4 sm:p-5">
                      <h3 className="stack-card-title font-display text-lg font-semibold text-white sm:text-xl">
                        {product.title}
                      </h3>
                      <p className="stack-card-desc mt-1.5 text-xs text-white/85 sm:text-sm">
                        {product.description}
                      </p>
                      <ProductDataRow sku={sku} tone={product.dataRowTone} />
                    </div>
                  </>
                ) : (
                  <div className="relative flex h-full w-full flex-col justify-between bg-ink-surface p-4 sm:p-5">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-br from-glow/15 via-transparent to-transparent"
                    />
                    <span className="stack-card-eyebrow relative w-fit rounded-full bg-glow/15 px-2.5 py-0.5 font-display text-[9px] font-semibold uppercase tracking-[0.15em] text-glow">
                      {product.eyebrow}
                    </span>
                    <div className="relative">
                      <h3 className="stack-card-title font-display text-lg font-semibold text-ink-text sm:text-xl">
                        {product.title}
                      </h3>
                      <p className="stack-card-desc mt-1.5 text-xs text-ink-text-muted sm:text-sm">
                        {product.description}
                      </p>
                      <ProductDataRow sku={sku} tone={product.dataRowTone} />
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
