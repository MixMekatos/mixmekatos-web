import { Heart, Hash, Gift } from "lucide-react";

const TIERS = [
  {
    tag: "Siguenos",
    icon: Heart,
    headerColor: "bg-pink-100 text-pink-700",
    prizeColor: "text-pink-600",
    title: "Siguenos en redes sociales",
    prize: "Premio especial sorpresa",
    steps: [
      "Siguenos en Instagram, TikTok o Facebook",
      "Toma un screenshot mostrando que nos sigues",
      "Asegurate de que la fecha/hora sea visible",
      "Tu codigo llega directo a tu WhatsApp!",
    ],
  },
  {
    tag: "Etiquetanos",
    icon: Hash,
    headerColor: "bg-amber-100 text-amber-700",
    prizeColor: "text-amber-600",
    title: "Publica con #MixMekatos",
    prize: "Premio especial sorpresa",
    steps: [
      "Haz una publicacion visible en tu perfil",
      "Etiqueta a @mixmekatos en la publicacion",
      "Agrega #MixMekatos en la descripcion",
      "Envianos el screenshot y revisamos en horas",
    ],
  },
] as const;

export default function LoyaltySection() {
  return (
    <section className="w-full">
      <div className="bg-bar text-white py-14 px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
          Club MixMekatos
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
          Apoya la marca y{" "}
          <span className="text-amber-300">gana un premio</span>
        </h1>
        <p className="max-w-xl mx-auto text-base text-white/80">
          Dos formas de ganar: siguenos en redes o etiquetanos con #MixMekatos.
          Los premios llegan directo a tu WhatsApp.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TIERS.map((tier) => {
            const TierIcon = tier.icon;
            return (
              <div
                key={tier.tag}
                className="flex flex-col rounded-3xl bg-white border border-stone-100 shadow-sm overflow-hidden"
              >
                <div className="px-6 pt-6 pb-4 flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tier.headerColor}`}
                  >
                    <TierIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted)">
                      {tier.tag}
                    </span>
                    <h2 className="text-base font-bold text-(--color-text)">{tier.title}</h2>
                  </div>
                </div>

                <div className="mx-6 mb-4 flex items-center gap-2 rounded-xl bg-stone-50 border border-stone-100 px-4 py-2.5">
                  <Gift className={`h-4 w-4 shrink-0 ${tier.prizeColor}`} />
                  <div className="leading-tight">
                    <p className="text-xs text-(--color-text-muted)">Premio</p>
                    <p className={`text-sm font-bold ${tier.prizeColor}`}>{tier.prize}</p>
                  </div>
                </div>

                <ul className="mx-6 mb-6 flex flex-col gap-2.5">
                  {tier.steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-(--color-text-muted)"
                    >
                      <span
                        className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                          i === tier.steps.length - 1 ? "bg-accent" : "bg-stone-300"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-(--color-text-muted)">
          Por seguirno a MixMekatos, obtienes Un beneficio por numero de WhatsApp, por red social, cada 30-60 dias.
          Valido para pedidos por domicilio o WhatsApp. No acumulable.
        </p>
      </div>
    </section>
  );
}