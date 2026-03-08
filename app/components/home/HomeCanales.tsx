import Link from "next/link";
import { ShoppingBag, Store, CalendarHeart, type LucideIcon } from "lucide-react";

interface Canal {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  iconColor: string;
  cta: { label: string; href: string };
}

const CANALES: Canal[] = [
  {
    icon: ShoppingBag,
    title: "Pídelo a domicilio",
    desc: "Estamos en Rappi y DiDi Food. Tu antojo llega caliente a la puerta.",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-accent",
    cta: { label: "Ver apps", href: "/#delivery" },
  },
  {
    icon: Store,
    title: "En supermercados",
    desc: "Encuentra nuestros congelados prefritos en puntos de venta seleccionados en Medellín.",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    cta: { label: "¿Dónde?", href: "/donde-estamos" },
  },
  {
    icon: CalendarHeart,
    title: "Para eventos",
    desc: "Venta al por mayor de producto congelado prefrito. Perfecto para sociales, empresas y catering.",
    color: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
    cta: { label: "Cotizar", href: "/contacto" },
  },
];

export default function HomeCanales() {
  return (
    <section className="bg-stone-50 px-4 py-14">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text) text-center mb-10">
          ¿Cómo quieres tus mekatos?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CANALES.map(({ icon: Icon, title, desc, color, iconColor, cta }) => (
            <div
              key={title}
              className={`flex flex-col gap-4 rounded-2xl border p-6 ${color} transition hover:shadow-md`}
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ${iconColor}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold text-(--color-text) text-base">{title}</h3>
                <p className="mt-1 text-sm text-(--color-text-muted)">{desc}</p>
              </div>
              <Link
                href={cta.href}
                className="mt-auto text-sm font-semibold text-accent hover:underline underline-offset-2"
              >
                {cta.label} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
