import HomeHero from "./components/home/HomeHero";
import HomeProductos from "./components/home/HomeProductos";
import HomeCTA from "./components/home/HomeCTA";
import HomeTrade from "./components/home/HomeTrade";
import ToasterProvider from "./components/ToasterProvider";


export default function InicioPage() {
  return (
    <main className="min-h-screen bg-ink">
      <ToasterProvider />
      <HomeHero />
      <HomeProductos />
      <HomeCTA
        titulo={
          <>
            El sabor no <span className="text-glow">miente</span>.
          </>
        }
        subtitulo="Cada lote, la misma receta, el mismo cuidado."
        ctaLabel="Ver catálogo"
        ctaHref="/productos"
      />
      <HomeTrade />
    </main>
  );
}
