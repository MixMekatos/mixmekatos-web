"use client";

import { useRandomOfferToast } from "@/app/hooks/useRandomOfferToast";

/**
 * Al montarse, programa una notificación de oferta aleatoria
 * (una por sesión, tras unos segundos).
 */
export default function OfferToastTrigger() {
  useRandomOfferToast();
  return null;
}
