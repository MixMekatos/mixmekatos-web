"use client";
import { Map, Store, Clock, LucideIcon, MessageSquareText, ArrowRight, Phone, MapPin } from "lucide-react";
import MapLocation from "./Map";

export default function DondeEstamosPage() {

  interface Card {
    id: number
    icon: LucideIcon,
    title: String,
    info: String,
    closed: boolean
  }

  interface Contact {
    id: number,
    icon: LucideIcon,
    title: String,
    info: String,
    url: String,
    color: String,
    bg: String,
    colorButton: String
  }

  interface marketplace {
    id: number,
    image: string,
    name: String,
    address: String
  }

  const INFO_CARD: Card[] = [
    {
      id: 1,
      icon: Map,
      title: "Dirección",
      info: "Barrio El Poblado, Calle 10 #43-E",
      closed: false
    },
    {
      id: 2,
      icon: Clock,
      title: "Horario de Atención",
      info: "Mar - Dom | 11:00 AM - 9:00 PM",
      closed: true
    }
  ]

  const INFO_CONCTAC: Contact[] = [
    {
      id: 1,
      icon: MessageSquareText,
      title: "Escríbenos",
      info: "WhatsApp para domicilios",
      url: "https://wa.me/",
      color: "text-green-600",
      bg: "bg-green-100",
      colorButton: "bg-green-400"
    },
    {
      id: 2,
      icon: Phone,
      title: "Llámanos",
      info: "Atención inmediata",
      url: "https://wa.me/",
      color: "text-(--color-bar)",
      bg: "bg-red-100",
      colorButton: "bg-(--color-bar)"
    }
  ]

  const INFO_MARKETPLACE: marketplace[] = [
    {
      id: 1,
      image: "https://plazadelriocc.com/wp-content/uploads/2022/12/logo-exito.jpg",
      name: "Grupo Exito",
      address: "varias sedes en medellin"
    },
    {
      id: 2,
      image: "https://co.tubono.com/wp-content/uploads/sites/17/2019/10/Jumbo_colombia.png",
      name: "Jumbo",
      address: "En la comuna 13"
    },
    {
      id: 3,
      image: "https://metrocentro.com.co/wp-content/uploads/2024/02/4-1.png",
      name: "Tiendas ara",
      address: "Toda Colombia"
    },

  ]

  return (
    <main className="min-h-[60vh] py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-semibold text-[var(--color-text)]">Dónde estamos</h1>
        <p className="mt-6 text-[var(--color-text-muted)]">Estamos ubicados en el corazon de Medellin, listos para enviarte el mejor sabor artesanal de nuestras famosas empanadas y deditos de queso.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto pt-10 gap-5">
        <div className="h-[350px] w-full p-0 overflow-hidden rounded-2xl md:col-span-2 shadow-sm">
          <MapLocation />
        </div>
        <section className="bg-white p-5 rounded-2xl border border-stone-200 md:col-span-1 shadow-sm">
          <Store className="bg-red-100 px-2 rounded-xl" size={45} color="var(--color-bar)" />
          <p className="text-xl font-bold text-(--color-text) pt-2">Nuestra Sede</p>
          <p className="pt-1 text-(--color-text-muted)">Visitanos y disfruta de la mejor experiencia gastronomica artesanal.</p>
          <div>
            {INFO_CARD.map((card) => (
              <div key={card.id} className="flex flex-row items-center gap-4 py-2">
                <card.icon size={25} color="var(--color-bar)" />
                <div className="flex flex-col">
                  <p className="font-semibold">{card.title}</p>
                  <p className="text-(--color-text-muted) text-sm">{card.info}</p>
                  {card.closed && (
                    <p className="text-(--color-bar) text-xs font-semibold">Lunes: Cerrado por descanso</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="flex justify-center mx-auto text-center pt-5">
        <p className="font-bold text-3xl px-4">Encuentranos en Supermercados</p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 mx-auto max-w-5xl gap-5 pt-5">
        {INFO_MARKETPLACE.map((market) => (
          <div key={market.id} className="flex flex-col border border-stone-200 rounded-xl bg-white shadow items-center justify-center p-4">
            <img className="rounded-xl object-cover" src={market.image} alt="" width={120} />
            <div className="flex flex-col justify-center items-center p-2">
              <p className="text-(--color-bar) font-semibold text-2xl">{market.name}</p>
              <div className="flex flex-row items-center justify-center gap-1">
                <MapPin className="text-(--color-bar)" size={15} />
                <span className="text-(--color-text-muted) text-sm">{market.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 mx-auto max-w-5xl gap-5 pt-5">
        {INFO_CONCTAC.map((contact) => (
          <div key={contact.id} className="flex flex-row border border-stone-200 rounded-xl bg-white shadow items-center justify-between p-6">
            <div className="flex flex-row">
              <contact.icon className={`p-2 ${contact.bg} rounded-lg ${contact.color}`} size={45} />
              <div className="ps-5">
                <p className="font-bold text-lg">{contact.title}</p>
                <p className="text-sm text-(--color-text-muted)">{contact.info}</p>
              </div>
            </div>
            <button className="">
              <ArrowRight className={`px-2 rounded-3xl text-white ${contact.colorButton}`} size={45} />
            </button>
          </div>
        ))}
      </div>
    </main >
  );
}