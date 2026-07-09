import HomeHero from "./components/home/HomeHero";
import HomeCanales from "./components/home/HomeCanales";
import HomeProductos from "./components/home/HomeProductos";
import HomeCTA from "./components/home/HomeCTA";
import HomeValores from "./components/home/HomeValores";
import HomeMayorista from "./components/home/HomeMayorista";
import ToasterProvider from "./components/ToasterProvider";


export default function InicioPage() {
  return (
    <main className="min-h-screen bg-(--color-bg)">
      <ToasterProvider />
      <HomeHero />
      <HomeCanales />
      <HomeProductos />
      <HomeCTA
        titulo="Hay problemas que se resuelven con una empanada."
        subtitulo="¿Hambre? Empanada. ¿Antojo? Empanada. ¿Reunión en la oficina? Empanadas para todos. La solución lleva maíz y queso."
        ctaLabel="Quiero mis empanadas ahora"
        ctaHref="/productos"
      />
      <HomeValores />
      <HomeMayorista />
    </main>
  );
}
