"use client";

import { useEffect, useRef } from "react";
import { sileo } from "sileo";
import { getOfertaAleatoria } from "@/app/lib/ofertas";

const STORAGE_KEY = "mixmekatos-offer-shown";
const DELAY_MS = 4000;

/**
 * Muestra una notificación de oferta aleatoria una vez por sesión,
 * tras un retraso para no interrumpir la llegada del usuario.
 */
export function useRandomOfferToast() {
  const shown = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || shown.current) return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const timer = setTimeout(() => {
      shown.current = true;
      sessionStorage.setItem(STORAGE_KEY, "1");

      const oferta = getOfertaAleatoria();
      sileo.action({
        title: oferta.title,
        description: oferta.description,
        position: "top-right",
        duration: 8000,
        // `fill` is forwarded by sileo straight onto an SVG <rect fill="...">
        // (see node_modules/sileo internals), which is a CSS-compatible
        // presentation attribute — the browser resolves var() there just
        // like on any other CSS color property. Referencing the token here
        // keeps this in sync with --color-bar in app/globals.css instead of
        // duplicating the hex. If sileo ever changes to animate/interpolate
        // this value frame-by-frame, a var() string may not tween — revisit
        // then and fall back to a hardcoded hex kept in sync manually.
        fill: "var(--color-bar)",
        button: {
          title: "Ver",
          onClick: () => {
            window.location.pathname = "/productos";
          },
        },
      });
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);
}
