import Image from "next/image";
import Timeline from "./timeline";
import { LucideIcon, Sparkles, Heart, HouseHeart } from "lucide-react";

export default function SobreNosotrosPage() {

  interface Valore {
    id: number,
    icon: LucideIcon,
    title: string,
    description: string,
    color: string,
    bgColor: string
  }

  const VALORES: Valore[] = [
    {
      id: 1,
      icon: Sparkles,
      title: "Calidad Artesanal",
      description: "Seleccionamos cada ingrediente con rigor. No usamos procesos industriales masivos; cada pieza es terminada a mano.",
      color: "text-bar",
      bgColor: "bg-red-100"
    },
    {
      id: 2,
      icon: HouseHeart,
      title: "Tradición",
      description: "Honramos las recetas que han pasado de generación en generación, preservando el legado culinario de nuestra tierra.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      id: 3,
      icon: Heart,
      title: "Pasión",
      description: "Amamos lo que hacemos. Esa pasión es el condimento secreto que hace que cada bocado de MixMekatos sea inolvidable.",
      color: "text-bar",
      bgColor: "bg-red-100"
    }
  ]
  return (
    <main className="min-h-[60vh] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="flex flex-col col-span-1 justify-center items-start p-6">
            <h1 className="text-[10px] font-semibold tracking-widest text-bar">NUESTRA ESENCIA</h1>
            <h2 className="text-semibold md:text-5xl text-4xl pb-6">Nuestra Historia</h2>
            <p className="text-(--color-text-muted) text-start max-w-[450px]">Desde el primer amasado en una cocina familiar hasta convertirnos en el referente del sabor artesanal en Medellín, cada paso ha sido guiado por el amor a la tradición.</p>
          </div>
          <div className="col-span-1 relative flex justify-center items-center md:pt-0 pt-5">
            <div className="relative w-fit">
              <Image
                className="rounded-xl rotate-3 shadow-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIUzVrdJBh0TFSWysJe-VXIJ64YXRJHLp3kvf5hZqXjh25d_7y7zXgJxzgL9OOVMMlErp03z2-SVspwRbYSfC9DAcfpYSYIgQRBuuB5SCyE6c7pS6X3tgjURj3s5I5RpB24LtOfRWFkZb0vYyU6Yb518Y9qZy3heQ1aVkz7_2O3bBeAgSmP2_h7RmDVqmF3BfFz3YChOflVshYM5raUXmZToTQS59ULC0bTNL4-9Q3Oi6RrvY5A7YqYZM5DGcpU4A63xOfEg1POR5p"
                alt=""
                width={680}
                height={500}
              />
              <div className="absolute bottom-[-25px] bg-white rounded-lg md:w-[240px] w-[200px] shadow-2xl p-5 -rotate-3">
                <p className="text-bar md:text-lg text-sm">
                  &quot;El secreto no está en la receta, sino en las manos que la preparan.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Timeline />
      <div className="max-w-4xl mx-auto text-center pt-5">
        <h1 className="text-[10px] text-bar tracking-widest">COMO TRABAJAMOS</h1>
        <h1 className="text-3xl">Nuestros Valores</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 pt-10 gap-5">
          {VALORES.map((valore) => (
            <div key={valore.id} className="flex flex-col justify-center items-center border boder-slate-200 bg-white rounded-xl p-5 gap-2">
              <valore.icon className={`${valore.color} ${valore.bgColor} p-2 rounded-xl`} size={45} />
              <h2 className="text-lg font-semibold">{valore.title}</h2>
              <p className="text-sm text-slate-500">{valore.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main >
  );
}
