import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Store, CalendarHeart, type LucideIcon } from "lucide-react";
import ScrollReveal from "@/app/components/motion/ScrollReveal";
import StaggerGroup from "@/app/components/motion/StaggerGroup";
import StaggerItem from "@/app/components/motion/StaggerItem";

interface Canal {
  icon: LucideIcon;
  title: string;
  desc: string;
  accentClass: string;
  bgClass: string;
  cta: { label: string; href: string };
}

const CANALES: Canal[] = [
  {
    icon: ShoppingBag,
    title: "Pídelo a domicilio",
    desc: "Estamos en Rappi y DiDi Food. Tu antojo llega caliente a la puerta.",
    accentClass: "text-accent",
    bgClass: "bg-accent/10",
    cta: { label: "Ver apps", href: "/#delivery" },
  },
  {
    icon: Store,
    title: "En supermercados",
    desc: "Encuentra nuestros congelados prefritos en puntos de venta seleccionados en Medellín.",
    accentClass: "text-masa",
    bgClass: "bg-masa/15",
    cta: { label: "¿Dónde?", href: "/donde-estamos" },
  },
  {
    icon: CalendarHeart,
    title: "Para eventos",
    desc: "Venta al por mayor de producto congelado prefrito. Perfecto para sociales, empresas y catering.",
    accentClass: "text-bar",
    bgClass: "bg-bar/10",
    cta: { label: "Cotizar", href: "/contacto" },
  },
];

// Real retail partners currently carrying MixMekatos product. Logged here
// once as the single source of truth for this "dónde nos encuentras" strip.
const RETAIL_PARTNERS = [
  { src: "/branding/almacenes_paraiso.png", alt: "Logo de Almacenes Paraíso" },
  { src: "/branding/el_chispazo.png", alt: "Logo de Supermercado El Chispazo" },
  { src: "/branding/la_granja.png", alt: "Logo de Autoservicio La Granja" },
  { src: "/branding/pasadena.png", alt: "Logo de Pasadena Supermercados" },
];

export default function HomeCanales() {
  return (
    <section className="bg-stone-50 px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal y={16} duration={0.45}>
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-(--color-text) sm:text-3xl">
            ¿Cómo quieres tus mekatos?
          </h2>
        </ScrollReveal>

        {/* Rail/ticket layout: one continuous card, channels separated by a
            dashed "tear line" instead of three isolated tiles — distinct
            from the bordered-card grid used elsewhere on the page. */}
        <StaggerGroup
          stagger={0.08}
          className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm divide-y divide-dashed divide-stone-200 sm:grid sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
        >
          {CANALES.map(({ icon: Icon, title, desc, accentClass, bgClass, cta }) => (
            <StaggerItem key={title} y={20} duration={0.45} className="flex flex-col gap-4 p-6 sm:p-7">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${bgClass} ${accentClass}`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-base font-semibold text-(--color-text)">{title}</h3>
                <p className="mt-1 text-sm text-(--color-text-muted)">{desc}</p>
              </div>

              {title === "En supermercados" && (
                <div className="mt-1">
                  <p className="font-nunito text-[11px] uppercase tracking-wide text-(--color-text-muted)">
                    Nos encuentras en
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {RETAIL_PARTNERS.map((partner) => (
                      <div key={partner.src} className="relative h-9 w-24 sm:h-10 sm:w-28">
                        <Image
                          src={partner.src}
                          alt={partner.alt}
                          fill
                          sizes="112px"
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href={cta.href}
                className="mt-auto inline-flex min-h-11 w-fit items-center gap-1 rounded-sm text-sm font-semibold text-accent underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {cta.label} →
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
