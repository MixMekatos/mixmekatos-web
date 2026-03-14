"use client";
import { Map, Store, Clock, LucideIcon, MessageSquareText, ArrowRight, Phone, MapPin, SquareArrowOutUpRight } from "lucide-react";
import MapLocation from "./Map";
import Image from "next/image";

export default function DondeEstamosPage() {

  interface Card {
    id: number
    icon: LucideIcon,
    title: string,
    info: string,
    closed: boolean
  }

  interface Contact {
    id: number,
    icon: LucideIcon,
    title: string,
    info: string,
    url: string,
    color: string,
    bg: string,
    colorButton: string
  }

  interface Marketplace {
    id: number,
    image: string | LucideIcon,
    name: string,
    address: string[]
  }

  interface Platform {
    id: number,
    title: string,
    description: string,
    url: string,
    image: string
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

  const INFO_MARKETPLACE: Marketplace[] = [
    {
      id: 1,
      image: "/branding/almacenes_paraiso.png",
      name: "Almacenes Paraiso",
      address: ["Tunja(Muiscas, Sur)", "Duitama(Clínica Boyacá)", "Sogamoso ( Carrera 11, Torres del Nogal)", "Yopal"]
    },
    {
      id: 2,
      image: "/branding/pasadena.png",
      name: "Pasadena",
      address: ["Sogamoso", "Duitama", "Paipa"]
    },
    {
      id: 3,
      image: "/branding/la_granja.png",
      name: "La Granja",
      address: ["Tunja (Norte)", "Tunja (Peñitas)", "Tunja (La 14 Sur)"]
    },
    {
      id: 4,
      image: "/branding/el_chispazo.png",
      name: "El Chispazo",
      address: ["Tunja (Maldonado)"]
    },
    {
      id: 5,
      image: Store,
      name: "Nuevo punto",
      address: ["Proximamente..."]
    }
  ]

  const INFO_PLATFORM: Platform[] = [
    {
      id: 1,
      title: "Rappi",
      description: "Sabor artesanal a domicilio",
      url: "https://rappi.com.co/",
      image: "https://static.vecteezy.com/system/resources/previews/067/941/720/non_2x/rappi-logo-rounded-hd-free-png.png"
    },
    {
      id: 2,
      title: "Didi",
      description: "Pide tus empanadas favoritas",
      url: "https://web.didiglobal.com/co/pasajero/",
      image: "/branding/didi.jpg"
    },
    {
      id: 3,
      title: "Uber",
      description: "Pide a domicilio",
      url: "https://www.uber.com/global/es/sign-in/",
      image: "https://scontent.fbog23-1.fna.fbcdn.net/v/t39.30808-6/352395053_1301403327449484_5481400940176293068_n.png?_nc_cat=101&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=2enlSzQ142kQ7kNvwFCHDtZ&_nc_oc=AdlJ9lCsCJKA-2YQ9L7ZMTRUHkp9YIEf5sGocOjmsjxq5ckSWWqDXUw4aV2x6slTUdM&_nc_zt=23&_nc_ht=scontent.fbog23-1.fna&_nc_gid=bXN5wsDqMNMgmtb_Sc4Eng&_nc_ss=8&oh=00_Afw8cJ48-J8cJTGQQ1g-kMDvCZIdeQTQqZ3CYsCWAgPVHQ&oe=69B7D8AD"
    }
  ]

  const TITLE_SECTIONS = ((title: string) => {
    return (
      <div className="flex justify-center mx-auto text-center pt-10">
        <p className="font-bold text-3xl px-4">{title}</p>
      </div>
    )
  })

  return (
    <main className="min-h-[60vh] py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-semibold text-(--color-text)">Dónde estamos</h1>
        <p className="mt-6 text-(--color-text-muted)">Estamos ubicados en el corazon de Medellin, listos para enviarte el mejor sabor artesanal de nuestras famosas empanadas y deditos de queso.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto pt-10 gap-5">
        <div className="h-[350px] w-full p-0 overflow-hidden rounded-2xl md:col-span-2 shadow-xl">
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
                    <p className="text-bar text-xs font-semibold">Lunes: Cerrado por descanso</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {TITLE_SECTIONS("Encuentranos en Supermercados")}
      <div className="grid md:grid-cols-3 grid-cols-2 mx-auto max-w-5xl gap-5 pt-5">
        {INFO_MARKETPLACE.map((market) => (
          <div key={market.id} className="flex flex-col border border-stone-200 rounded-xl bg-white shadow items-center justify-center p-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
            {typeof market.image === "string" ? (
              <Image src={market.image} alt="" width={100} height={100} />
            ) : (
              <market.image size={40} color="var(--color-bar)" />
            )}
            <div className="flex flex-col justify-center items-center p-2">
              <p className="text-bar font-semibold text-2xl pb-2">{market.name}</p>
              {market.address.map((address, i) => (
                <div key={i} className="flex flex-row items-center justify-center gap-1 text-center">
                  <MapPin className="text-bar" size={15} />
                  <span className="text-(--color-text-muted) text-sm">{address}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {TITLE_SECTIONS("Pide por Apps de Domicilio")}
      <div className="grid md:grid-cols-3 grid-cols-2 mx-auto max-w-5xl gap-5 pt-5">
        {INFO_PLATFORM.map((platform) => (
          <div key={platform.id} className="flex flex-col border border-stone-200 rounded-xl bg-white items-center justify-center shadow p-4 hover:scale-105 hover:shadow-xl transition-all duration-300">
            <Image className="rounded-xl" src={platform.image} alt="" width={100} height={100} />
            <div className="flex flex-col justify-center items-center p-2">
              <p className="font-semibold text-2xl text-bar">{platform.title}</p>
              <p className="text-sm text-(--color-text-muted) pt-2">{platform.description}</p>
              <a href={platform.url} className="flex text-bar font-bold justify-center items-center gap-1 pt-4"> Abrir App <SquareArrowOutUpRight size={15} /></a>
            </div>
          </div>
        ))}
      </div>
      {TITLE_SECTIONS("Contactanos")}
      <div className="grid md:grid-cols-2 grid-cols-1 mx-auto max-w-5xl gap-5 pt-6">
        {INFO_CONCTAC.map((contact) => (
          <div key={contact.id} className="flex flex-row border border-stone-200 rounded-xl bg-white shadow items-center justify-between p-6 hover:scale-105 transition-all duration-300">
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