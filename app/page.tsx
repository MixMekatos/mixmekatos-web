import HeroCarousel from "./components/HeroCarousel";

export default function InicioPage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <section className="flex flex-col items-center justify-center px-4 py-16 bg-[var(--color-bg)]">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text)] text-center">
          MixMekatos
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-muted)] text-center max-w-md">
          Prueba el mejor sabor
        </p>
      </section>
    </main>
  );
}
