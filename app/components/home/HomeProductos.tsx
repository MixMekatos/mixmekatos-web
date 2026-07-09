import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/app/components/motion/ScrollReveal";
import StaggerGroup from "@/app/components/motion/StaggerGroup";
import StaggerItem from "@/app/components/motion/StaggerItem";
import Parallax from "@/app/components/motion/Parallax";

export default function HomeProductos() {
  return (
    <section className="bg-(--color-bg) px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal y={16} duration={0.45} className="mb-10 text-center">
          <p className="mx-auto mb-3 inline-flex w-fit rounded-full bg-accent/10 px-4 py-1 font-baloo text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Nuestros productos
          </p>
          <h2 className="font-display text-2xl font-semibold text-(--color-text) sm:text-3xl">
            Hechos para que repitas
          </h2>
        </ScrollReveal>

        {/* Asymmetric showcase: one tall featured tile + two stacked tiles,
            so the product visuals themselves carry the layout instead of
            sitting behind small decorative icons — deliberately different
            from Canales' horizontal ticket rail above it. This is the
            standout motion moment of the page: the featured tile "arrives"
            first and with the most pronounced entrance, the two smaller
            tiles follow with a shorter stagger. */}
        <StaggerGroup
          stagger={0.12}
          delayChildren={0.05}
          amount={0.15}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2"
        >
          {/* Featured: Empanadas de maíz */}
          <StaggerItem
            y={36}
            scale={0.95}
            duration={0.65}
            className="group relative min-h-[380px] overflow-hidden rounded-3xl lg:row-span-2 lg:min-h-0"
          >
            {/* TEMP stock photo — swap for real product photography */}
            <Parallax range={20}>
              <Image
                src="/layout/banner-example.jpg"
                alt="Empanadas de maíz doradas servidas con salsa criolla y ají picante sobre un plato negro"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[58%_42%] transition duration-300 motion-safe:group-hover:scale-105"
              />
            </Parallax>
            {/* Duotone wash toward the brand's masa gold, so the photo's
                clashing teal backdrop reads as part of the site's palette
                instead of fighting it. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-masa opacity-40 mix-blend-color"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-char/90 via-char/25 to-transparent"
            />
            <span className="absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-bar shadow-sm backdrop-blur-sm">
              Lo más pedido
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                Empanadas de maíz 🫓
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/85">
                Horneadas, crujientes por fuera y rellenas de puro sabor por dentro. La estrella de
                la casa.
              </p>
            </div>
          </StaggerItem>

          {/* Palos de queso */}
          <StaggerItem
            y={26}
            scale={0.97}
            duration={0.55}
            className="group relative min-h-[220px] overflow-hidden rounded-3xl sm:min-h-[260px]"
          >
            {/* TEMP stock photo — swap for real product photography */}
            <Parallax range={14}>
              <Image
                src="/products/temp/temp-dedos-queso-pexels.jpg"
                alt="Palitos de queso empanizados y fritos, dorados y crocantes, servidos en un plato blanco"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition duration-300 motion-safe:group-hover:scale-105"
              />
            </Parallax>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-char/85 via-char/15 to-transparent"
            />
            <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-bar shadow-sm backdrop-blur-sm">
              Imperdible
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Palos de queso 🧀
              </h3>
              <p className="mt-1 max-w-xs text-sm text-white/85">
                Queso fundido envuelto en una mezcla dorada e irresistible. Para compartir… o no.
              </p>
            </div>
          </StaggerItem>

          {/* Congelados prefritos — no suitable photo found yet, carried by
              type and color instead of a mediocre stock image. */}
          <StaggerItem
            y={26}
            scale={0.97}
            duration={0.55}
            className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-char p-6 sm:min-h-[260px] sm:p-7"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-masa/20 via-transparent to-transparent"
            />
            <span className="relative w-fit rounded-full bg-masa/15 px-3 py-1 font-baloo text-[11px] font-semibold uppercase tracking-[0.15em] text-masa">
              Supermercados &amp; mayorista
            </span>
            <div className="relative">
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                Congelados prefritos ❄️
              </h3>
              <p className="mt-1 max-w-xs text-sm text-white/75">
                Listos para calentar en minutos. Misma calidad MixMekatos en tu casa o negocio.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <div className="mt-10 text-center">
          <Link
            href="/productos"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-bar px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
