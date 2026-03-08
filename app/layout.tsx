import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
      <body className="antialiased min-h-screen flex flex-col">
        <ToasterProvider />
        <OfferToastTrigger />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
