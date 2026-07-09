"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useViewport } from "@/app/hooks/useViewport";

// The 3-4 links that matter most for a B2B2C exclusive-food-brand: where to
// buy it, and how to reach the business. Everything else collapses into the
// secondary "Menú" panel below, so the desktop bar renders on a single line
// instead of the old 8-link crush (stage 9 structural rebuild).
const PRIMARY_LINKS = [
  { href: "/productos", label: "Productos" },
  { href: "/donde-estamos", label: "Dónde estamos" },
  { href: "/contacto", label: "Contacto" },
] as const;

// Stage 10: "Club MixMekatos" removed from here — the loyalty program is
// suspended for now ("ya no va a existir por ahora"), so it's no longer
// linked/promoted from the nav. The /fidelizacion route and its components
// are left in place, just unlinked.
const SECONDARY_LINKS = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/trucos-de-la-casa", label: "Trucos de la casa" },
  { href: "/eventos", label: "Eventos" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { isDesktop } = useViewport();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const moreRef = useRef<HTMLDivElement>(null);

  const showHamburger = !isDesktop;

  // Close any open panel whenever the route changes. Adjusted during render
  // (not inside a useEffect) per React's "adjusting state when a prop
  // changes" pattern, so it never triggers the cascading-render a
  // setState-in-effect would.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setMoreOpen(false);
  }

  // Close the secondary dropdown on outside click or Escape.
  useEffect(() => {
    if (!moreOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [moreOpen]);

  // Stage 10: rebuilt as a floating pill, detached from the top edge
  // (sticky top-4 + mx-4, rather than flush top-0 full-width), with a
  // single solid background at all times. The previous scroll-based
  // opacity swap (bg-ink/70 -> bg-ink/90 via an IntersectionObserver on
  // #scroll-sentinel) is removed entirely per direct feedback ("no se
  // porque el navbar cambia de color") — the sentinel div in app/layout.tsx
  // was removed alongside this, since nothing else referenced it.
  //
  // Stage 11: the 16px gap above the pill was previously produced by a
  // `top-4` sticky offset with no padding, which meant that 16px strip sat
  // OUTSIDE this header's own box (sticky pushes the box down to respect
  // the offset, it doesn't grow the box to fill it). That strip had no
  // background of its own, so `body`'s cream default showed through above
  // the pill on every route ("hay un margen blanco arriba reservando el
  // espacio del navbar"). Fixed locally, without touching `body`'s global
  // rule (other routes like /contacto still rely on it): switched to
  // `sticky top-0` + `pt-4` so that same 16px gap is now the header's own
  // top padding, and gave the header itself an explicit `bg-ink` so that
  // padding area — and the full-width bar behind the pill while scrolling —
  // reads as dark instead of transparent. Navbar is already a shared,
  // globally-dark-themed component, so this is consistent site-wide.
  return (
    <header className="sticky top-0 z-50 bg-ink px-4 pt-4">
      <div className="mx-auto max-w-6xl">
        <nav className="flex h-12 items-center justify-between gap-4 rounded-full border border-white/10 bg-ink-surface px-4 shadow-lg shadow-black/30 sm:h-14 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="MixMekatos"
              width={160}
              height={56}
              priority
              className="h-7 w-auto object-contain sm:h-8"
            />
          </Link>

          {showHamburger ? (
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-md text-ink-text-muted transition-colors hover:bg-ink hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          ) : (
            <div className="flex items-center gap-x-7 text-[15px] font-medium">
              <ul className="flex items-center gap-x-7">
                {PRIMARY_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={
                          isActive
                            ? "text-glow"
                            : "text-ink-text-muted transition-colors hover:text-glow"
                        }
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div ref={moreRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                  className="flex min-h-11 items-center gap-1 rounded-md px-2 text-ink-text-muted transition-colors hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  Menú
                  <ChevronDown
                    className={"h-4 w-4 transition-transform " + (moreOpen ? "rotate-180" : "")}
                    aria-hidden="true"
                  />
                </button>

                {moreOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-ink-surface p-2 shadow-lg shadow-black/30"
                  >
                    {SECONDARY_LINKS.map(({ href, label }) => {
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          role="menuitem"
                          onClick={() => setMoreOpen(false)}
                          className={
                            "block min-h-11 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors flex items-center " +
                            (isActive
                              ? "bg-glow/10 text-glow"
                              : "text-ink-text-muted hover:bg-ink/60 hover:text-glow")
                          }
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>

        {showHamburger && menuOpen && (
          <div
            id="mobile-menu"
            className="mt-3 rounded-3xl border border-white/10 bg-ink-surface shadow-lg shadow-black/30"
          >
            <div className="px-4 py-4">
              <ul className="flex flex-col gap-1">
                {PRIMARY_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={
                          "flex min-h-11 items-center rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors " +
                          (isActive
                            ? "bg-glow/10 text-glow"
                            : "text-ink-text-muted hover:bg-ink hover:text-glow")
                        }
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="my-2 border-t border-white/10" role="none" />

              <ul className="flex flex-col gap-1">
                {SECONDARY_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={
                          "flex min-h-11 items-center rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors " +
                          (isActive
                            ? "bg-glow/10 text-glow"
                            : "text-ink-text-muted hover:bg-ink hover:text-glow")
                        }
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
