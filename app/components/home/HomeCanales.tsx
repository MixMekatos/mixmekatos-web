import Image from "next/image";
import Link from "next/link";
import { CalendarHeart, Store } from "lucide-react";
import ScrollReveal from "@/app/components/motion/ScrollReveal";
import StaggerGroup from "@/app/components/motion/StaggerGroup";
import StaggerItem from "@/app/components/motion/StaggerItem";

// Real retail partners currently carrying MixMekatos product. Logged here
// once as the single source of truth for this "dónde nos encuentras" block.
const RETAIL_PARTNERS = [
  { src: "/branding/almacenes_paraiso.png", alt: "Logo de Almacenes Paraíso" },
  { src: "/branding/el_chispazo.png", alt: "Logo de Supermercado El Chispazo" },
  { src: "/branding/la_granja.png", alt: "Logo de Autoservicio La Granja" },
  { src: "/branding/pasadena.png", alt: "Logo de Pasadena Supermercados" },
];

/**
 * Structural rebuild (stage 9), rebalanced in stage 10: the "Pídelo a
 * domicilio" channel (Rappi/DiDi Food) was removed entirely per business
 * decision — MixMekatos isn't operating as a ghost kitchen yet, so those
 * delivery-app references aren't accurate. With only two real channels left
 * (eventos, supermercados), the layout moved from an asymmetric [3fr_2fr]
 * two-column split to a straightforward even two-column grid so neither
 * block reads as a leftover gap.
 */
export default function HomeCanales() {
  return (
    <section className="bg-ink px-4 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal y={32} duration={0.5}>
          <h2 className="mb-10 text-center font-display text-2xl font-semibold text-ink-text sm:text-3xl">
            ¿Cómo quieres tus mekatos?
          </h2>
        </ScrollReveal>

        <StaggerGroup
          stagger={0.1}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch"
        >
          <StaggerItem
            x={-32}
            y={0}
            duration={0.55}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-ink-surface p-6 sm:p-7"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-glow/12 text-glow">
              <CalendarHeart className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-ink-text">Para eventos</h3>
              <p className="mt-1 text-sm text-ink-text-muted">
                Venta al por mayor de producto congelado prefrito, listo para sociales,
                empresas y catering.
              </p>
            </div>
            <Link
              href="/contacto"
              className="mt-auto inline-flex min-h-11 w-fit items-center gap-1 rounded-sm text-sm font-semibold text-glow underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Cotizar →
            </Link>
          </StaggerItem>

          <StaggerItem
            x={32}
            y={0}
            duration={0.6}
            className="flex flex-col gap-6 rounded-3xl border border-glow/25 bg-ink-surface p-7 sm:p-9"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-glow/12 text-glow">
              <Store className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-ink-text">En supermercados</h3>
              <p className="mt-1 text-sm text-ink-text-muted">
                Encuentra nuestros congelados prefritos en puntos de venta seleccionados
                en Medellín.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {RETAIL_PARTNERS.map((partner) => (
                <div
                  key={partner.src}
                  className="relative h-16 rounded-xl bg-white/95 p-3 sm:h-20"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    fill
                    sizes="(min-width: 768px) 160px, 45vw"
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>

            <Link
              href="/donde-estamos"
              className="mt-auto inline-flex min-h-11 w-fit items-center gap-1 rounded-sm text-sm font-semibold text-glow underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              ¿Dónde? →
            </Link>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
