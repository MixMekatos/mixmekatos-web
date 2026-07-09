import Link from "next/link";
import ScrollReveal from "@/app/components/motion/ScrollReveal";
import ParallaxGlow from "@/app/components/motion/ParallaxGlow";

interface HomeCTAProps {
  titulo: string;
  subtitulo: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function HomeCTA({
  titulo,
  subtitulo,
  ctaLabel,
  ctaHref,
}: HomeCTAProps) {
  return (
    <section className="relative overflow-hidden px-4 py-16 text-center bg-ink-surface">
      <ParallaxGlow range={30} />
      <ScrollReveal y={36} duration={0.55} className="relative">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold leading-tight text-ink-text sm:text-4xl md:text-5xl">
          {titulo}
        </h2>
        <p className="mt-4 text-ink-text-muted max-w-sm mx-auto text-sm">{subtitulo}</p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-glow px-8 py-3 text-sm font-bold text-ink shadow-md transition hover:bg-glow-hover hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-surface"
        >
          {ctaLabel}
        </Link>
      </ScrollReveal>
    </section>
  );
}
