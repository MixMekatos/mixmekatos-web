import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  MapPin,
  Phone,
  Gift,
} from "lucide-react";

const WHATSAPP_NUMBER = "573016.46264";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE_FAKE = "+57 (602) 321 0000";

const REDES = [
  {
    href: "https://www.facebook.com/mixmekatos",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.instagram.com/mixmekatos",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/company/mixmekatos",
    label: "LinkedIn",
    icon: Linkedin,
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bar text-white">
      {/* CTA empanadas */}
      <div className="bg-accent py-4 px-4">
        <p className="max-w-6xl mx-auto text-center text-sm font-semibold tracking-wide text-white/95">
          🫓 Tu paladar está leyendo esto y ya sabe lo que quiere.{" "}
          <span className="underline decoration-white/50 underline-offset-2">
            Un MEKATICO de MixMekatos.
          </span>{" "}
          Hazle caso. 🌶️
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Grid principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Col 1 — Marca + redes */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Síguenos
            </h3>
            <ul className="flex gap-3">
              {REDES.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Pídelo por app */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Pídelo por app
            </h3>
            <a
              href="https://www.rappi.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-black/25 h-10 w-32 transition hover:bg-black/40"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/06/Rappi_logo.svg"
                alt="Rappi"
                className="h-5 w-auto"
                width={60}
                height={22}
              />
            </a>
            <a
              href="https://didi-food.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg h-10 w-32 overflow-hidden transition hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "#FFBB00" }}
            >
              <img
                src="/branding/didi.jpg"
                alt="DiDi Food"
                className="w-[160%] h-auto scale-100"
                style={{ transform: "scale(0.6)", objectFit: "cover" }}
                width={128}
                height={128}
              />
            </a>
          </div>

          {/* Col 3 — Contacto */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Contacto
            </h3>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#20bd5a] hover:scale-[1.02] w-fit"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <p className="flex items-center gap-2 text-sm text-white/75">
              <Phone className="h-4 w-4 shrink-0" />
              {PHONE_FAKE}
            </p>
            <p className="text-xs text-white/55 -mt-1 pl-6">
              Pedidos y eventos
            </p>
            <Link
              href="/fidelizacion"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-amber-300 hover:scale-[1.02] w-fit mt-1"
            >
              <Gift className="h-4 w-4" />
              Club MixMekatos
            </Link>
          </div>

          {/* Col 4 — Ubicación */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Ubicación
            </h3>
            <p className="flex items-start gap-2 text-sm text-white/75">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                Medellín, Colombia
              </span>
            </p>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Izquierda: copyright + crédito */}
          <div className="text-center sm:text-left">
            <p className="text-xs text-white/60">
              © {year} MixMekatos. Todos los derechos reservados.
            </p>
            <p className="mt-1 text-xs text-white/45">
              Hecho con{" "}
              <span aria-hidden>❤️</span>{" "}
              por{" "}
              <a
                href="https://nexcodex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/70 underline underline-offset-2 hover:text-white"
              >
                NexCodex
              </a>
            </p>
          </div>

          {/* Derecha: logo */}
          <Link href="/" className="inline-block shrink-0">
            <Image
              src="/logo.png"
              alt="MixMekatos"
              width={140}
              height={50}
              className="h-9 w-auto object-contain opacity-80 hover:opacity-100 transition"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
