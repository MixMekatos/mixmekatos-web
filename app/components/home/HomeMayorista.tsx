import Link from "next/link";
import ScrollReveal from "@/app/components/motion/ScrollReveal";

export default function HomeMayorista() {
  return (
    <section className="bg-ink px-4 py-14">
      <ScrollReveal
        y={24}
        duration={0.5}
        className="max-w-4xl mx-auto rounded-3xl border border-glow/25 bg-ink-surface p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8"
      >
        <div className="text-6xl shrink-0">📦</div>
        <div className="text-center sm:text-left">
          <h2 className="font-display text-xl font-semibold text-ink-text sm:text-2xl">
            ¿Necesitas producto al por mayor?
          </h2>
          <p className="mt-2 text-sm text-ink-text-muted max-w-md">
            Vendemos congelado prefrito en grandes cantidades para eventos, empresas y distribuidores.
            Precio especial, entrega a tiempo y el mismo sabor que enamora.
          </p>
          <Link
            href="/eventos"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-glow px-6 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink-surface"
          >
            Saber más sobre eventos
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
