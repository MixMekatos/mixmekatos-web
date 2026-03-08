import Link from "next/link";

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
      <p className="text-5xl mb-4">{emoji}</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white max-w-xl mx-auto leading-snug">
        {titulo}
      </h2>
      <p className="mt-3 text-white/75 max-w-sm mx-auto text-sm">{subtitulo}</p>
      <Link
        href={ctaHref}
        className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-bar shadow-md transition hover:bg-stone-100 hover:shadow-lg"
      >
        {ctaLabel}
      </Link>
    </section>
  );
}
