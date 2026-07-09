import Link from "next/link";
import ScrollReveal from "@/app/components/motion/ScrollReveal";

interface HomeCTAProps {
  emoji?: string;
  titulo: string;
  subtitulo: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function HomeCTA({
  emoji = "🫓",
  titulo,
  subtitulo,
  ctaLabel,
  ctaHref,
}: HomeCTAProps) {
  return (
    <section className="px-4 py-16 text-center bg-ink-surface">
      <ScrollReveal y={20} duration={0.5}>
        <p className="text-5xl mb-4">{emoji}</p>
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
