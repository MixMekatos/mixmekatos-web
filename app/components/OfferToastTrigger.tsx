"use client";

import { useRandomOfferToast } from "@/app/hooks/useRandomOfferToast";


export default function OfferToastTrigger() {
  useRandomOfferToast();
  return null;
}
