import LoyaltySection from "@/app/components/loyalty/LoyaltySection";
import LoyaltyForm from "@/app/components/loyalty/LoyaltyForm";

export const metadata = {
  title: "Club MixMekatos - Siguenos y gana un regalo",
  description:
    "Siguenos en redes sociales, sube tu captura y recibe un producto gratis de MixMekatos en tu siguiente pedido.",
};

export default function FidelizacionPage() {
  return (
    <main>
      <LoyaltySection />

      {/* Form section */}
      <div className="max-w-lg mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-(--color-text) mb-1">
            Reclama tu cupon
          </h2>
          <p className="text-sm text-(--color-text-muted) mb-6">
            Completa el formulario y obtendras tu codigo al instante.
          </p>
          <LoyaltyForm />
        </div>
      </div>
    </main>
  );
}
