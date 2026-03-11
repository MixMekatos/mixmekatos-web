import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="bg-(--color-bg) px-4 py-16 text-center">
      <p className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">
        Cocina oculta · Medellín, Colombia
      </p>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-(--color-text) leading-tight max-w-2xl mx-auto">
        El sabor que buscabas<br />
        <span className="text-accent">lo hacemos nosotros</span>
      </h1>
      <p className="mt-5 text-lg text-(--color-text-muted) max-w-xl mx-auto">
        Empanadas de maíz horneadas, palos de queso y más mekatos irresistibles.
        Pídelos a domicilio, encuéntralos en supermercados o llévate un lote para tu próximo evento.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/productos"
          className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover hover:shadow-md"
        >
          Ver productos
        </Link>
        <Link
          href="/contacto"
          className="rounded-full border border-accent px-7 py-3 text-sm font-semibold text-accent transition hover:bg-orange-50"
        >
          Contáctanos
        </Link>
      </div>
    </section>
  );
}
