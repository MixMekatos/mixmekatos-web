"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero opening moment, driven entirely by GSAP (isolated from the Framer
 * Motion primitives used elsewhere on the page, per the animation-engine
 * split: GSAP for heavy scroll choreography, Framer Motion for simple
 * viewport reveals).
 *
 * Structural rebuild (stage 9): replaces the old centered, text-only, two-
 * band layout with a genuine asymmetric split. The left column (~60%)
 * carries the value proposition; the right column (~40%) is a visual
 * panel. The scroll-scrubbed parallax concept is preserved, now driving
 * the text column and the panel at different rates instead of the old
 * char/masa bands.
 *
 * Stage 12: the right panel no longer shows the catalog's aggregate
 * rating/star-count (that stat lived on the SKUs, not the brand, and read
 * as a vague homepage claim rather than real evidence). It now shows an
 * actual product photo (canasta.png, a real basket of fried empanadas) as
 * the hero's visual centerpiece, rendered with no card/border/backdrop so
 * the transparent PNG reads directly against the page background. Motion
 * is limited to the entrance timeline and the scroll-scrubbed parallax
 * below; no idle/continuous animation.
 */
export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const dataPanelRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const entranceEls = (
        [eyebrowRef.current, headlineRef.current, subcopyRef.current, ctaRef.current] as (
          | HTMLElement
          | null
        )[]
      ).filter((el): el is HTMLElement => el !== null);

      if (prefersReducedMotion) {
        // No entrance choreography, no scroll-linked parallax, no idle
        // float: content renders in its final, static state immediately.
        gsap.set([...entranceEls, dataPanelRef.current], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(entranceEls, { opacity: 0, y: 40 });
      gsap.set(eyebrowRef.current, { x: -28 });
      gsap.set(dataPanelRef.current, { opacity: 0, y: 32, scale: 0.94 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.7 },
      });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, x: 0 })
        .to(headlineRef.current, { opacity: 1, y: 0 }, "-=0.45")
        .to(subcopyRef.current, { opacity: 1, y: 0 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.35")
        .to(dataPanelRef.current, { opacity: 1, y: 0, scale: 1 }, "-=0.5");

      // Scroll-scrubbed parallax: the data panel drifts up and scales
      // slightly faster than the text column as the hero exits, so the two
      // halves of the asymmetric split separate gently on scroll rather than
      // moving as one flat plane.
      gsap.to(dataPanelRef.current, {
        yPercent: -10,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(textColRef.current, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink bg-grain">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pb-16 pt-14 sm:pb-20 sm:pt-16 md:grid-cols-[3fr_2fr] md:items-center md:gap-10 md:pt-20">
        <div ref={textColRef} className="text-center md:text-left">
          <p
            ref={eyebrowRef}
            className="relative inline-flex items-center gap-2 rounded-full bg-glow/15 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-glow"
          >
            De la planta a tu góndola · Medellín, Colombia
          </p>
          <h1
            ref={headlineRef}
            className="relative mt-5 font-display text-4xl font-semibold leading-[1.05] text-ink-text sm:text-5xl md:text-6xl"
          >
            El sabor que buscabas,{" "}
            <span className="text-glow">lo hacemos nosotros.</span>
          </h1>
          <p
            ref={subcopyRef}
            className="relative mx-auto mt-6 max-w-xl text-lg text-ink-text-muted md:mx-0"
          >
            Empanadas de maíz horneadas, palos de queso y más mekatos, directo a
            supermercados, restaurantes y eventos en toda la región.
          </p>
          <div
            ref={ctaRef}
            className="relative mt-9 flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <Link
              href="/productos"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-glow px-7 py-3 text-sm font-semibold text-ink shadow-[0_4px_16px_-6px_rgba(193,154,95,0.35)] transition hover:bg-glow-hover hover:shadow-[0_6px_20px_-6px_rgba(193,154,95,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contacto"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-glow px-7 py-3 text-sm font-semibold text-glow transition hover:bg-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Hablemos de tu pedido
            </Link>
          </div>
        </div>

        <div
          ref={dataPanelRef}
          className="relative mx-auto aspect-square w-full max-w-xs md:mx-0 md:max-w-none"
        >
          <Image
            src="/canasta.png"
            alt="Canasta de mimbre con empanadas de maíz recién hechas"
            fill
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
