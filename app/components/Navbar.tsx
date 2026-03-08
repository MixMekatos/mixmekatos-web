"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/trucos-de-la-casa", label: "Trucos de la casa" },
  { href: "/eventos", label: "Eventos" },
  { href: "/donde-estamos", label: "Dónde estamos" },
  { href: "/contacto", label: "Contacto" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div
        className="text-white text-center py-2 px-4 text-sm"
        style={{ backgroundColor: "var(--color-bar)" }}
      >
        <p className="max-w-2xl mx-auto">
          En MixMekatos te cuidamos con el mejor sabor y la mejor atención.
        </p>
      </div>

      <nav className="bg-[var(--color-nav)] border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="MixMekatos"
              width={200}
              height={72}
              priority
              className="h-14 w-auto object-contain object-left"
            />
          </Link>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-medium text-[var(--color-text)]">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      isActive
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    }
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
