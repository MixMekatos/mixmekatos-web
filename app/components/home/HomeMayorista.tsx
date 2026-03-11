import Link from "next/link";

export default function HomeMayorista() {
  return (
    <section className="bg-(--color-bg) px-4 py-14">
      <div className="max-w-4xl mx-auto rounded-3xl border border-orange-200 bg-orange-50 p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
        <div className="text-6xl shrink-0">📦</div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-(--color-text)">
            ¿Necesitas producto al por mayor?
          </h2>
          <p className="mt-2 text-sm text-(--color-text-muted) max-w-md">
            Vendemos congelado prefrito en grandes cantidades para eventos, empresas y distribuidores.
            Precio especial, entrega a tiempo y el mismo sabor que enamora.
          </p>
          <Link
            href="/eventos"
            className="mt-5 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover"
          >
            Saber más sobre eventos
          </Link>
        </div>
      </div>
    </section>
  );
}
