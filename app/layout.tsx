import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OfferToastTrigger from "./components/OfferToastTrigger";
import { Bricolage_Grotesque, Poppins, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

// Display face for headings: a distinctive contemporary grotesk with real
// character (used across current premium/editorial/creative-agency work),
// replacing the previous playful/rounded Fredoka + Baloo 2 pairing, which
// read as a children's-app/gaming-UI typeface family and directly
// contradicted the brand's "elite, exclusive, premium" positioning. Used
// with restraint (headline scale only), never for body copy. Weight 600/700
// covers every current font-display call site (all font-semibold).
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

// Primary reading/UI face, replaces Geist site-wide. Nothing outside the
// home page referenced `--font-sans`/Geist directly (only globals.css and
// this file did), so the swap is safe to make globally in this pass.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

// Complementary face reserved for secondary/muted supporting text where
// Poppins would feel too heavy — used sparingly (small captions only, e.g.
// the hero's distribution caption and the "Nos encuentras en" label).
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
        bricolageGrotesque.variable,
        poppins.variable,
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
