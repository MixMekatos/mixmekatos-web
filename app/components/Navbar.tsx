"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useViewport } from "@/app/hooks/useViewport";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/trucos-de-la-casa", label: "Trucos de la casa" },
  { href: "/eventos", label: "Eventos" },
  { href: "/fidelizacion", label: "Club MixMekatos 🎁" },
  { href: "/donde-estamos", label: "Dónde estamos" },
  { href: "/contacto", label: "Contacto" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { isDesktop, isShortViewport } = useViewport();
  const [menuOpen, setMenuOpen] = useState(false);

  const showHamburger = !isDesktop;
  const isCompact = isShortViewport;

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div
        className="text-white text-center px-4 text-sm transition-[padding] duration-200"
        style={{
          backgroundColor: "var(--color-bar)",
          paddingTop: isCompact ? "0.375rem" : "0.5rem",
          paddingBottom: isCompact ? "0.375rem" : "0.5rem",
        }}
      >
        <p className="max-w-2xl mx-auto line-clamp-1">
          En MixMekatos te cuidamos con el mejor sabor y la mejor atención.
        </p>
      </div>

      <nav className="relative bg-(--color-nav) border-b border-stone-200/80">
        <div
          className="max-w-6xl mx-auto px-4 flex flex-row items-center justify-between gap-3 transition-[padding] duration-200"
          style={{
            paddingTop: isCompact ? "0.5rem" : "0.625rem",
            paddingBottom: isCompact ? "0.5rem" : "0.625rem",
          }}
        >
          <Link
            href="/"
            className="flex items-center w-2/5 min-w-22.5 shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="MixMekatos"
              width={200}
              height={72}
              priority
              className="w-full h-auto object-contain object-left transition-all duration-200"
              style={{
                maxHeight: isCompact ? "3rem" : showHamburger ? "3.75rem" : "4.5rem",
              }}
            />
          </Link>

          {showHamburger ? (
            <>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="p-2 rounded-md text-(--color-text-muted) hover:text-accent hover:bg-stone-100 transition-colors"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {menuOpen && (
                <div
                  className="absolute top-full left-0 right-0 bg-white border-b border-stone-200/80 shadow-lg"
                  style={{ marginTop: 0 }}
                >
                  <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
                    {links.map(({ href, label }) => {
                      const isActive = pathname === href;
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className={
                              "block py-2.5 px-3 rounded-md text-[15px] font-medium transition-colors " +
                              (isActive
                                ? "text-accent bg-accent/10"
                                : "text-(--color-text-muted) hover:text-accent hover:bg-stone-50")
                            }
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <ul className="flex flex-nowrap items-center justify-end gap-x-4 text-[15px] font-medium shrink-0">
              {links.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} className="whitespace-nowrap">
                    <Link
                      href={href}
                      className={
                        isActive
                          ? "text-accent"
                          : "text-(--color-text-muted) hover:text-accent transition-colors"
                      }
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
