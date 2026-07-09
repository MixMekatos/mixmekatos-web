"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Product = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  variant: "photo" | "typography";
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  duotone?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "empanadas",
    eyebrow: "Lo más pedido",
    title: "Empanadas de maíz 🫓",
    description:
      "Horneadas, crujientes por fuera y rellenas de puro sabor por dentro. La estrella de la casa.",
    variant: "photo",
    // TEMP stock photo, swap for real product photography.
    image: "/layout/banner-example.jpg",
    imageAlt:
      "Empanadas de maíz doradas servidas con salsa criolla y ají picante sobre un plato negro",
    imagePosition: "object-[58%_42%]",
    duotone: true,
  },
  {
    id: "queso",
    eyebrow: "Imperdible",
    title: "Palos de queso 🧀",
    description:
      "Queso fundido envuelto en una mezcla dorada e irresistible. Para compartir, o no.",
    variant: "photo",
    // TEMP stock photo, swap for real product photography.
    image: "/products/temp/temp-dedos-queso-pexels.jpg",
    imageAlt:
      "Palitos de queso empanizados y fritos, dorados y crocantes, servidos en un plato blanco",
  },
  {
    id: "congelados",
    eyebrow: "Supermercados & mayorista",
    title: "Congelados prefritos ❄️",
    description:
      "Listos para calentar en minutos. Misma calidad MixMekatos en tu casa o negocio.",
    variant: "typography",
  },
];

/**
 * The standout scroll moment of the page: a GSAP ScrollTrigger sticky-stack.
 * Each product pins at the top of the viewport as the next one arrives,
 * scaling and fading back to reveal the one behind it, with its own photo
 * drifting via a separate scroll-scrubbed parallax tween. Isolated from the
 * Framer Motion primitives used elsewhere on the page (GSAP and Framer
 * Motion must never share a component tree), and gated by
 * `ScrollTrigger.matchMedia` so the heavier pin choreography only runs at
 * tablet width and up, avoiding a janky pin on small phones.
 */
export default function HomeProductos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) {
      // Static stacked layout: cards simply flow and scroll normally, no
      // pin, no scale, no parallax.
      return;
    }

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      const imageEls = gsap.utils.toArray<HTMLElement>(".stack-card-image");

      ScrollTrigger.matchMedia({
        // Desktop/tablet: full pin + scale-back stack, plus a stronger
        // photo parallax while each card holds the top of the viewport.
        "(min-width: 768px)": () => {
          cardEls.forEach((card, i) => {
            if (i === cardEls.length - 1) return;

            ScrollTrigger.create({
              trigger: card,
              start: "top top",
              endTrigger: cardEls[cardEls.length - 1],
              end: "top top",
              pin: true,
              pinSpacing: false,
            });

            gsap.to(card, {
              scale: 0.92,
              opacity: 0.55,
              ease: "none",
              scrollTrigger: {
                trigger: cardEls[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          });

          imageEls.forEach((imgWrap) => {
            gsap.to(imgWrap, {
              y: 70,
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

        // Mobile: no pin (avoids a heavy/janky pin on small screens with
        // large product photos), just a lighter photo parallax so the
        // section still feels alive while scrolling.
        "(max-width: 767px)": () => {
          imageEls.forEach((imgWrap) => {
            gsap.to(imgWrap, {
              y: 36,
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
        <p className="mx-auto mb-3 inline-flex w-fit rounded-full bg-glow/12 px-4 py-1 font-baloo text-[11px] font-semibold uppercase tracking-[0.2em] text-glow">
          Nuestros productos
        </p>
        <h2 className="mb-10 font-display text-2xl font-semibold text-ink-text sm:text-3xl">
          Hechos para que repitas
        </h2>
      </div>

      <div ref={containerRef} className="relative px-4">
        <div className="mx-auto flex max-w-6xl flex-col">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className="stack-card group relative flex min-h-[100dvh] items-end overflow-hidden rounded-3xl"
              style={{ zIndex: index + 1 }}
            >
              {product.variant === "photo" ? (
                <>
                  <div
                    className="stack-card-image absolute inset-x-0"
                    style={{ top: -80, bottom: -80 }}
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
                  <div className="relative w-full p-6 sm:p-10 md:p-14">
                    <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                      {product.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base text-white/85 sm:text-lg">
                      {product.description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="relative flex h-full w-full flex-col justify-between bg-ink-surface p-6 sm:p-10 md:p-14">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-glow/15 via-transparent to-transparent"
                  />
                  <span className="relative w-fit rounded-full bg-glow/15 px-3 py-1 font-baloo text-[11px] font-semibold uppercase tracking-[0.15em] text-glow">
                    {product.eyebrow}
                  </span>
                  <div className="relative">
                    <h3 className="font-display text-3xl font-semibold text-ink-text sm:text-4xl md:text-5xl">
                      {product.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base text-ink-text-muted sm:text-lg">
                      {product.description}
                    </p>
                  </div>
                </div>
              )}
            </article>
          ))}
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
