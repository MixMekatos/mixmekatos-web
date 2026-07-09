import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "@/app/components/motion/ScrollReveal";
import ParallaxGlow from "@/app/components/motion/ParallaxGlow";

interface HomeCTAProps {
  titulo: ReactNode;
  subtitulo: string;
  ctaLabel: string;
  ctaHref: string;
}

// Stage 18: "Hay problemas que se resuelven con una empanada" read as a
// leftover joke from the site's earlier casual voice, out of place next to
// the data-forward Hero and the muted premium palette elsewhere on the
// page ("no tiene sentido"). `titulo` now accepts a ReactNode instead of a
// plain string so the calling page can highlight a word with the same
// glow-accent-span pattern the Hero headline already uses, and the section
// picked up a subtle divider + wider type scale for more visual weight
// ("mejor estilo").
export default function HomeCTA({
  titulo,
  subtitulo,
  ctaLabel,
  ctaHref,
}: HomeCTAProps) {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-center bg-ink-surface sm:py-24">
      <ParallaxGlow range={30} />
      <ScrollReveal y={48} scale={0.95} duration={0.6} className="relative">
        <div className="mx-auto mb-6 h-px w-16 bg-glow/40" aria-hidden="true" />
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-ink-text sm:text-5xl md:text-6xl">
          {titulo}
        </h2>
        <p className="mt-5 text-ink-text-muted max-w-sm mx-auto text-sm sm:text-base">
          {subtitulo}
        </p>
        <Link
          href={ctaHref}
          className="mt-9 inline-flex min-h-11 items-center justify-center rounded-full bg-glow px-8 py-3 text-sm font-bold text-ink shadow-md transition hover:bg-glow-hover hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-surface"
        >
          {ctaLabel}
        </Link>
      </ScrollReveal>
    </section>
  );
}
