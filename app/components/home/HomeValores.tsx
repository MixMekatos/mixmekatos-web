import { ChefHat, Flame, BadgeCheck, type LucideIcon } from "lucide-react";

interface Valor {
  icon: LucideIcon;
  label: string;
  desc: string;
}

const VALORES: Valor[] = [
  { icon: ChefHat, label: "Elaboración artesanal", desc: "Preparamos y controlamos cada lote con el mismo cuidado, sin atajos." },
  { icon: Flame, label: "Sabor que enamora", desc: "Recetas propias con ingredientes de calidad." },
  { icon: BadgeCheck, label: "Congelado sin perder calidad", desc: "Proceso certificado para que el sabor llegue intacto." },
];

export default function HomeValores() {
  return (
    <section className="bg-stone-50 px-4 py-14">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text) text-center mb-10">
          Por qué elegir MixMekatos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {VALORES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bar text-white shadow">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="font-semibold text-(--color-text) text-sm">{label}</h3>
              <p className="text-xs text-(--color-text-muted)">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
