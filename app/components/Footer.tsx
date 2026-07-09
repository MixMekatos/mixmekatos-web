import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  MapPin,
  Phone,
} from "lucide-react";

const WHATSAPP_NUMBER = "573016046264";
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
    <footer className="bg-ink text-ink-text">
      <div className="border-y border-glow/20 bg-glow/5 py-4 px-4">
        <p className="max-w-6xl mx-auto text-center text-sm font-medium tracking-wide text-ink-text-muted">
          Tu paladar ya sabe lo que quiere.{" "}
          <span className="font-semibold text-glow">
            Un MEKATICO de MixMekatos.
          </span>{" "}
          Hazle caso.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Stage 10: was a 4-column grid (Síguenos / Pídelo por app / Contacto /
            Ubicación). "Pídelo por app" (Rappi + DiDi Food) is removed entirely
            per business decision — MixMekatos isn't operating as a ghost
            kitchen yet — and "Club MixMekatos" is dropped from the Contacto
            column since the loyalty program is suspended for now. With 3
            columns left, the grid is a plain 1-up on mobile / 3-up from sm
            up, no asymmetric col-span needed anymore. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-text-muted">
              Síguenos
            </h3>
            <ul className="flex gap-3">
              {REDES.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-surface text-ink-text-muted transition hover:bg-glow/15 hover:text-glow hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-text-muted">
              Contacto
            </h3>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-(--color-whatsapp) px-4 py-2 text-sm font-semibold text-white transition hover:brightness-90 hover:scale-[1.02] w-fit"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <p className="flex items-center gap-2 text-sm text-ink-text-muted">
              <Phone className="h-4 w-4 shrink-0" />
              {PHONE_FAKE}
            </p>
            <p className="text-xs text-ink-text-muted/70 -mt-1 pl-6">
              Pedidos y eventos
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-text-muted">
              Ubicación
            </h3>
            <p className="flex items-start gap-2 text-sm text-ink-text-muted">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                Medellín, Colombia
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-ink-text-muted/70">
              © {year} MixMekatos. Todos los derechos reservados.
            </p>
            <p className="mt-1 text-xs text-ink-text-muted/60">
              Hecho con cariño por{" "}
              <a
                href="https://nexcodex.co"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink-text-muted underline underline-offset-2 hover:text-ink-text"
              >
                NexCodex
              </a>
            </p>
          </div>

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
