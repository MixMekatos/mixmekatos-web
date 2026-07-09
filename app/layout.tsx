import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OfferToastTrigger from "./components/OfferToastTrigger";
import { Fredoka, Poppins, Baloo_2, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

// Display face for headings — friendly, rounded, bold-but-not-shouty. Used
// with restraint (headline scale only), never for body copy.
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fredoka",
});

// Primary reading/UI face, replaces Geist site-wide. Nothing outside the
// home page referenced `--font-sans`/Geist directly (only globals.css and
// this file did), so the swap is safe to make globally in this pass.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

// Complementary face reserved for small, punchy labels (eyebrows/badges/tags)
// where Fredoka's roundness reads even more playful — used sparingly.
const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-baloo",
});

// Complementary face reserved for secondary/muted supporting text where
// Poppins would feel too heavy — used sparingly.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "MixMekatos®",
  description: "Prueba el mejor sabor",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={cn(
        "font-sans",
        fredoka.variable,
        poppins.variable,
        baloo2.variable,
        nunito.variable
      )}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <OfferToastTrigger />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
