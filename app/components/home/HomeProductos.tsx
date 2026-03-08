import Link from "next/link";

const PRODUCTOS = [
  {
    emoji: "🫓",
    name: "Empanadas de maíz",
    desc: "Horneadas, crujientes por fuera y rellenas de puro sabor por dentro. La estrella de la casa.",
    tag: "Lo más pedido",
  },
  {
    emoji: "🧀",
    name: "Palos de queso",
    desc: "Queso fundido envuelto en una mezcla dorada e irresistible. Para compartir… o no.",
    tag: "Imperdible",
  },
  {
    emoji: "❄️",
    name: "Congelados prefritos",
    desc: "Listos para calentar en minutos. Misma calidad MixMekatos en tu casa o negocio.",
    tag: "Súpermercados & Mayorista",
  },
];

export default function HomeProductos() {
  return (
    <section className="bg-(--color-bg) px-4 py-14">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-accent text-center mb-2">
          Nuestros productos
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text) text-center mb-10">
          Hechos para que repitas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PRODUCTOS.map(({ emoji, name, desc, tag }) => (
            <div
              key={name}
              className="relative flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <span className="absolute top-4 right-4 rounded-full bg-bar px-2.5 py-0.5 text-[10px] font-semibold text-white">
                {tag}
              </span>
              <span className="text-5xl">{emoji}</span>
              <h3 className="font-bold text-(--color-text) text-lg">{name}</h3>
              <p className="text-sm text-(--color-text-muted)">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/productos"
            className="rounded-full bg-bar px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent hover:shadow-md"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
