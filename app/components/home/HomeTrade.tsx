import {
  Store,
  Boxes,
  Building2,
  UtensilsCrossed,
  PartyPopper,
  Landmark,
  ChefHat,
  Flame,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/app/components/motion/ScrollReveal";
import StaggerGroup from "@/app/components/motion/StaggerGroup";
import StaggerItem from "@/app/components/motion/StaggerItem";

interface TradeChannel {
  icon: LucideIcon;
  label: string;
  desc: string;
}

// The real trade channels MixMekatos serves. A complementary angle to the
// hero's shorter subcopy list (not a repeat of it): each channel gets its
// own one-line elaboration instead of a single run-on sentence.
const TRADE_CHANNELS: TradeChannel[] = [
  {
    icon: Store,
    label: "Minoristas",
    desc: "Tiendas de barrio con antojo constante de nuestros productos.",
  },
  {
    icon: Boxes,
    label: "Mayoristas",
    desc: "Volumen y precio especial para quienes distribuyen a otros negocios.",
  },
  {
    icon: Building2,
    label: "Cadenas de supermercados",
    desc: "Punto de venta seleccionado dentro de grandes superficies.",
  },
  {
    icon: UtensilsCrossed,
    label: "Restaurantes",
    desc: "Insumo listo para tu carta, con la misma calidad de siempre.",
  },
  {
    icon: PartyPopper,
    label: "Eventos",
    desc: "Catering y celebraciones con entrega puntual, sin sorpresas.",
  },
  {
    icon: Landmark,
    label: "Sector institucional",
    desc: "Comedores y entidades con contratos de suministro constante.",
  },
];

interface ValueProp {
  icon: LucideIcon;
  label: string;
  desc: string;
}

const VALUE_PROPS: ValueProp[] = [
  {
    icon: ChefHat,
    label: "Elaboración artesanal",
    desc: "Preparamos y controlamos cada lote con el mismo cuidado, sin atajos.",
  },
  {
    icon: Flame,
    label: "Sabor que enamora",
    desc: "Recetas propias con ingredientes de calidad.",
  },
  {
    icon: BadgeCheck,
    label: "Congelado sin perder calidad",
    desc: "Proceso certificado para que el sabor llegue intacto.",
  },
];

/**
 * Structural rebuild (stage 9): replaces the old thin HomeValores hairline
 * strip and the separate small HomeMayorista panel with one consolidated,
 * substantial section. The primary content is a real 6-cell bento grid of
 * the actual trade channels MixMekatos serves (B2B2C positioning with
 * actual weight, not a repeated sentence); the original 3 value props are
 * folded in underneath as a visually secondary supporting row, styled the
 * same way the old HomeValores strip was, so they read as a footnote to the
 * main content rather than a whole section of their own.
 */
export default function HomeTrade() {
  return (
    <section className="bg-ink px-4 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal y={32} duration={0.5} className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-ink-text sm:text-3xl">
            Hacemos parte de tu negocio, sea cual sea.
          </h2>
          <p className="mt-3 text-sm text-ink-text-muted sm:text-base">
            Del mostrador de barrio a la cadena regional, entregamos el mismo producto
            con el volumen y el trato que cada canal necesita.
          </p>
        </ScrollReveal>

        <StaggerGroup
          stagger={0.06}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TRADE_CHANNELS.map(({ icon: Icon, label, desc }) => (
            <StaggerItem
              key={label}
              y={24}
              duration={0.45}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-surface p-5"
            >
              <Icon className="h-5 w-5 text-glow" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-ink-text">{label}</h3>
                <p className="mt-1 text-sm text-ink-text-muted">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup
          stagger={0.06}
          className="mt-10 flex flex-col divide-y divide-white/10 border-t border-white/10 sm:flex-row sm:divide-y-0 sm:divide-x sm:divide-dashed"
        >
          {VALUE_PROPS.map(({ icon: Icon, label, desc }) => (
            <StaggerItem
              key={label}
              y={0}
              x={-24}
              duration={0.4}
              className="flex items-center gap-3 py-3 sm:flex-1 sm:justify-center sm:px-5 sm:py-4"
            >
              <Icon className="h-5 w-5 shrink-0 text-glow" aria-hidden="true" />
              <p className="text-sm leading-snug">
                <span className="font-semibold text-ink-text">{label}.</span>{" "}
                <span className="text-ink-text-muted">{desc}</span>
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
