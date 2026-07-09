import Link from "next/link";

// Signature motif: a torn, jagged edge marks where the toasted "crust" band
// opens up into the warm masa-gold band below — visually echoing the product
// itself (crisp shell, warm filling revealed). It's about the food, not a
// "hidden kitchen" business story, and it also replaces the old carousel's
// three repeated placeholder photos with a deliberate color/type moment.
const TORN_EDGE_PATH =
  "M0,0 L0,18 L60,32 L120,10 L180,38 L240,14 L300,42 L360,8 L420,34 L480,16 L540,44 L600,6 L660,30 L720,20 L780,40 L840,12 L900,36 L960,18 L1020,42 L1080,10 L1140,32 L1200,16 L1260,40 L1320,8 L1380,34 L1440,20 L1440,60 L0,60 Z";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Toasted crust band */}
      <div className="relative bg-char px-4 pt-10 pb-14 text-center sm:pt-12 sm:pb-16 md:pt-16 md:pb-20">
        <p className="motion-safe:animate-hero-in inline-flex items-center gap-2 rounded-full bg-masa/15 px-4 py-1.5 font-baloo text-[11px] font-semibold uppercase tracking-[0.2em] text-masa">
          De la planta a tu góndola · Medellín, Colombia
        </p>

        <svg
          className="absolute inset-x-0 bottom-0 h-10 w-full text-(--color-bg) sm:h-12 md:h-14"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={TORN_EDGE_PATH} fill="currentColor" />
        </svg>
      </div>

      {/* Warm masa band */}
      <div className="relative bg-gradient-to-b from-masa/12 to-(--color-bg) px-4 pt-6 pb-16 text-center sm:pb-20">
        <h1 className="motion-safe:animate-hero-in [animation-delay:60ms] mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-(--color-text) sm:text-5xl md:text-6xl">
          El sabor que buscabas,{" "}
          <span className="text-accent">lo hacemos nosotros.</span>
        </h1>
        <p className="motion-safe:animate-hero-in [animation-delay:120ms] mx-auto mt-6 max-w-xl text-lg text-(--color-text-muted)">
          Empanadas de maíz horneadas, palos de queso y más mekatos irresistibles,
          directo a supermercados, restaurantes, eventos y comedores institucionales
          de toda la región.
        </p>
        <div className="motion-safe:animate-hero-in [animation-delay:180ms] mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/productos"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Ver catálogo
          </Link>
          <Link
            href="/contacto"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent px-7 py-3 text-sm font-semibold text-accent transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Hablemos de tu pedido
          </Link>
        </div>
        <p className="motion-safe:animate-hero-in [animation-delay:220ms] mt-5 font-nunito text-xs text-(--color-text-muted)">
          Distribución directa · Pedidos por mayor y para eventos
        </p>
      </div>
    </section>
  );
}
