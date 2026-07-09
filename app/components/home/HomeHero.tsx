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
 *
 * Stage 13: the entrance became scroll-reactive - it now reverses as the
 * hero scrolls out of view (handing off to Productos) and replays if the
 * user scrolls back up into it, instead of sitting static after the first
 * play.
 *
 * Stage 15: reworked how that scroll-reactivity is wired. Attaching
 * `scrollTrigger` directly to the timeline relied on ScrollTrigger
 * detecting the trigger's start condition as already satisfied at scrollY
 * 0 on mount and firing onEnter immediately - unreliable in practice
 * ("no veo animaciones en el hero aun"). Now the timeline is a plain
 * `paused: true` timeline that gets `.play()` called on it directly on
 * mount (guaranteed to run), and a separate, minimal `ScrollTrigger.create`
 * only handles the scroll-reactive part (`onLeave` reverses it,
 * `onEnterBack` replays it) - that half doesn't need any "already past"
 * detection since the user has to actually scroll for those to fire.
 *
 * Stage 18: removed the "De la planta a tu góndola" eyebrow badge entirely
 * per direct feedback - the headline now opens the hero directly.
 */
export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const dataPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const entranceEls = (
        [headlineRef.current, subcopyRef.current, ctaRef.current] as (HTMLElement | null)[]
      ).filter((el): el is HTMLElement => el !== null);

      if (prefersReducedMotion) {
        // No entrance choreography, no scroll-linked parallax, no idle
        // float: content renders in its final, static state immediately.
        gsap.set([...entranceEls, dataPanelRef.current], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Larger travel distances and per-element easing (stage 14 - the
      // previous version, uniform power3.out over 40px/28px, read as too
      // subtle to register as a real entrance/exit, "no me convencen").
      gsap.set(headlineRef.current, { opacity: 0, y: 70 });
      gsap.set(subcopyRef.current, { opacity: 0, y: 55 });
      gsap.set(ctaRef.current, { opacity: 0, y: 40 });
      gsap.set(dataPanelRef.current, { opacity: 0, y: 60, scale: 0.82, rotate: -3 });

      // Stage 15: attaching `scrollTrigger` directly to the timeline relied
      // on ScrollTrigger detecting that "top top" was already satisfied at
      // scrollY 0 on mount and firing onEnter immediately - unreliable in
      // practice (initial-state detection depends on refresh timing), and
      // the report was "no veo animaciones en el hero aun" (no entrance at
      // all, not just a missing reverse). Split into two independent
      // pieces: the timeline itself is a plain, unattached, paused
      // timeline that gets `.play()` called on it directly below -
      // guaranteed to run on mount regardless of ScrollTrigger's initial
      // measurement. A separate, minimal ScrollTrigger then only handles
      // the scroll-reactive part (reverse on exit, replay on re-entry),
      // which doesn't depend on any "already past start" detection since
      // by definition the user has to actually scroll for onLeave/
      // onEnterBack to fire.
      const tl = gsap.timeline({ paused: true });
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" })
        .to(
          subcopyRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.55"
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.4"
        )
        .to(
          dataPanelRef.current,
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1, ease: "expo.out" },
          "-=0.75"
        );

      // Guaranteed play on mount - not dependent on any ScrollTrigger
      // initial-state check.
      tl.play();

      // Scroll-reactive layer, separate from the entrance timeline itself:
      // reverse it out as the hero scrolls past (handing off to Productos),
      // replay it if the user scrolls back up into the hero. No `start`
      // dependency on "already past" detection - onLeave/onEnterBack only
      // fire on an actual scroll crossing.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
      });

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
          <h1
            ref={headlineRef}
            className="relative font-display text-4xl font-semibold leading-[1.05] text-ink-text sm:text-5xl md:text-6xl"
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
