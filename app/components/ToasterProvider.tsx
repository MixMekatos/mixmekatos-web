"use client";

import "sileo/styles.css";
import { Toaster } from "sileo";

const TOAST_OFFSET = 16;

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      offset={TOAST_OFFSET}
      options={{
        duration: 6000,
      }}
    />
  );
}
