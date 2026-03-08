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
        fill: "#8b3d2e",
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
