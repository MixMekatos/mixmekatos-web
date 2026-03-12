"use client";

import "sileo/styles.css";
import { Toaster } from "sileo";

const TOAST_OFFSET = 24;

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      offset={TOAST_OFFSET}
      theme="dark"
      options={{
        duration: 6000,
      }}
    />
  );
}
