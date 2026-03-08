/**
 * Ofertas para notificaciones aleatorias.
 * Se muestra una al azar por sesión (configurable en useRandomOfferToast).
 */
export const OFERTAS = [
  {
    title: "¡Oferta del día!",
    description: "2x1 en combos seleccionados. Válido hoy.",
  },
  {
    title: "10% de descuento",
    description: "En tu primera compra. Código: MEKATOS10",
  },
  {
    title: "Prueba el mejor sabor",
    description: "Degustación gratis en tu próxima visita.",
  },
  {
    title: "Combo familiar",
    description: "Ahorra llevando el combo para 4 personas.",
  },
  {
    title: "Novedades de temporada",
    description: "Productos nuevos que no te puedes perder.",
  },
  {
    title: "¡Te extrañamos!",
    description: "Vuelve y llévate un detalle de la casa.",
  },
] as const;

export type Oferta = (typeof OFERTAS)[number];

export function getOfertaAleatoria(): Oferta {
  return OFERTAS[Math.floor(Math.random() * OFERTAS.length)];
}
