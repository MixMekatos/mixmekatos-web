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
    <section className="px-4 py-16 text-center bg-bar">
      <ScrollReveal y={20} duration={0.5}>
        <p className="text-5xl mb-4">{emoji}</p>
        <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
          {titulo}
        </h2>
        <p className="mt-4 text-white/75 max-w-sm mx-auto text-sm">{subtitulo}</p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-bar shadow-md transition hover:bg-stone-100 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bar"
        >
          {ctaLabel}
        </Link>
      </ScrollReveal>
    </section>
  );
}
