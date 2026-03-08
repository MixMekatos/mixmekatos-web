import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import ToasterProvider from "./components/ToasterProvider";
import OfferToastTrigger from "./components/OfferToastTrigger";

export const metadata: Metadata = {
  title: "MixMekatos®",
  description: "Prueba el mejor sabor",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen">
        <ToasterProvider />
        <OfferToastTrigger />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
