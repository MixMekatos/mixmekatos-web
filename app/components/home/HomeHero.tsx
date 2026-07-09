"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero opening moment, driven entirely by GSAP (isolated from the Framer
 * Motion primitives used elsewhere on the page, per the animation-engine
 * split: GSAP for heavy scroll choreography, Framer Motion for simple
 * viewport reveals). Replaces the old static torn-edge SVG divider between
 * the "char" and "masa" bands with a scroll-scrubbed parallax: the two bands
 * drift at different rates as the hero scrolls out of view, so the
 * transition is a live scroll-linked effect instead of a fixed graphic.
 */
export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const charBandRef = useRef<HTMLDivElement>(null);
  const masaBandRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const entranceEls = (
        [
          eyebrowRef.current,
          headlineRef.current,
          subcopyRef.current,
          ctaRef.current,
          captionRef.current,
        ] as (HTMLElement | null)[]
      ).filter((el): el is HTMLElement => el !== null);

      if (prefersReducedMotion) {
        // No entrance choreography, no scroll-linked parallax: content
        // renders in its final state immediately.
        gsap.set(entranceEls, { opacity: 1, y: 0 });
        return;
      }

      // Wider vertical nudge than before (24px -> 40px) for a stronger sense
      // of movement, plus a small horizontal component on the eyebrow badge
      // so the opening moment reads as real component translation rather
      // than a uniform fade-up.
      gsap.set(entranceEls, { opacity: 0, y: 40 });
      gsap.set(eyebrowRef.current, { x: -28 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.7 },
      });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, x: 0 })
        .to(headlineRef.current, { opacity: 1, y: 0 }, "-=0.45")
        .to(subcopyRef.current, { opacity: 1, y: 0 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.35")
        .to(captionRef.current, { opacity: 1, y: 0 }, "-=0.3");

      // Scroll-scrubbed parallax: the char band drifts up and scales
      // slightly faster than the masa band as the hero exits, replacing the
      // old torn-edge SVG with a live scroll-linked transition device.
      gsap.to(charBandRef.current, {
        yPercent: -10,
        scale: 1.06,
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(masaBandRef.current, {
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
      {/* Toasted crust band, now the page's base tone rather than an
          isolated dark strip. */}
      <div ref={charBandRef} className="relative px-4 pt-10 pb-14 text-center sm:pt-12 sm:pb-16 md:pt-16 md:pb-20">
        <p
          ref={eyebrowRef}
          className="relative inline-flex items-center gap-2 rounded-full bg-glow/15 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-glow"
        >
          De la planta a tu góndola · Medellín, Colombia
        </p>
      </div>

      {/* Same ink base, lifted with a soft surface-to-ink gradient instead
          of the old masa-to-cream band, so the two halves read as one
          unified dark scene. */}
      <div
        ref={masaBandRef}
        className="relative bg-gradient-to-b from-ink-surface/50 to-ink px-4 pt-6 pb-16 text-center sm:pb-20"
      >
        <h1
          ref={headlineRef}
          className="relative mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-ink-text sm:text-5xl md:text-6xl"
        >
          El sabor que buscabas,{" "}
          <span className="text-glow">lo hacemos nosotros.</span>
        </h1>
        <p ref={subcopyRef} className="relative mx-auto mt-6 max-w-xl text-lg text-ink-text-muted">
          Empanadas de maíz horneadas, palos de queso y más mekatos irresistibles,
          directo a supermercados, restaurantes, eventos y comedores institucionales
          de toda la región.
        </p>
        <div ref={ctaRef} className="relative mt-9 flex flex-wrap justify-center gap-4">
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
        <p ref={captionRef} className="relative mt-5 font-nunito text-xs text-ink-text-muted">
          Distribución directa · Pedidos por mayor y para eventos
        </p>
      </div>
    </section>
  );
}
