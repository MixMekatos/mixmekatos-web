import { ChefHat, Flame, BadgeCheck, type LucideIcon } from "lucide-react";
import StaggerGroup from "@/app/components/motion/StaggerGroup";
import StaggerItem from "@/app/components/motion/StaggerItem";

interface Valor {
  icon: LucideIcon;
  label: string;
  desc: string;
}

const VALORES: Valor[] = [
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

// Deliberately a beat, not a destination: a hairline-bordered strip with one
// line per value, not a full section with a heading, centered icon circles,
// and generous padding like Canales/Productos above it. The heading is kept
// as an sr-only h2 so the document outline stays intact without adding
// visual weight.
export default function HomeValores() {
  return (
    <section className="border-y border-white/10 bg-ink px-4 py-2 sm:py-0">
      <h2 className="sr-only">Por qué elegir MixMekatos</h2>
      <StaggerGroup
        stagger={0.06}
        className="mx-auto flex max-w-5xl flex-col divide-y divide-white/10 sm:flex-row sm:items-center sm:divide-y-0 sm:divide-x sm:divide-dashed"
      >
        {VALORES.map(({ icon: Icon, label, desc }) => (
          <StaggerItem
            key={label}
            // Horizontal translation (not just a vertical nudge) since this
            // is already a horizontal rail on desktop: each value slides in
            // from the left, in reading order.
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
    </section>
  );
}
