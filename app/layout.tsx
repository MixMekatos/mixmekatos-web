import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "MixMekatos",
  description: "Prueba el mejor sabor",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
