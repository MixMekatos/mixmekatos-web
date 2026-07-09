import { Sandwich, Milk, Snowflake, Gift, type LucideIcon } from "lucide-react";

export type ProductTag = "destacado" | "imperdible" | "recomendado" | "nuevo" | "mayorista";
export type ProductCategory = "empanadas" | "dedos" | "congelados" | "combos";
export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  weight: string;
  unit: string;
  category: ProductCategory;
  images: string[];
  rating: number;
  ratingCount: number;
  ingredients?: string[];
  tags?: ProductTag[];
  stock: number;
}

export interface FilterState {
  categories: ProductCategory[];
  tags: ProductTag[];
  priceMin: number;
  priceMax: number;
  sortBy: SortOption;
}

export const MAX_PRICE = 150000;

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  tags: [],
  priceMin: 0,
  priceMax: MAX_PRICE,
  sortBy: "relevance",
};

export const CATEGORIES: Record<ProductCategory, string> = {
  empanadas: "Empanadas",
  dedos: "Dedos de queso",
  congelados: "Congelados",
  combos: "Combos",
};

export const TAG_LABELS: Record<ProductTag, string> = {
  destacado: "Destacado",
  imperdible: "Imperdible",
  recomendado: "Recomendado",
  nuevo: "Nuevo",
  mayorista: "Mayorista",
};

// Fallback glyph shown in place of a product photo. A line icon per
// category, not an emoji (stage 8: zero emoji site-wide).
export const CATEGORY_ICON: Record<ProductCategory, LucideIcon> = {
  empanadas: Sandwich,
  dedos: Milk,
  congelados: Snowflake,
  combos: Gift,
};

// Stage 12: flattened to a single dark-system treatment (was four pastel
// per-category hues, a light-mode-only pattern). This is purely a "no
// photo yet" placeholder background, not information-bearing like the tag
// badges below, so it consolidates cleanly under the Color Consistency
// Lock rather than needing per-category adaptation.
export const CATEGORY_BG: Record<ProductCategory, string> = {
  empanadas: "bg-ink-surface",
  dedos: "bg-ink-surface",
  congelados: "bg-ink-surface",
  combos: "bg-ink-surface",
};

// Solid, self-contained chips (own background + white text) that float on
// top of product photography regardless of page theme, so they don't need
// dark-mode adaptation. Kept as distinct semantic hues (discount urgency,
// recommended, new, wholesale-only) rather than collapsed into the single
// --color-glow accent: unlike a button or price, these carry real catalog
// information a shopper would otherwise lose.
export const TAG_CHIP_STYLE: Partial<Record<ProductTag, string>> = {
  imperdible: "bg-rose-500 text-white",
  recomendado: "bg-green-500 text-white",
  nuevo: "bg-teal-500 text-white",
  mayorista: "bg-purple-500 text-white",
};

// Modal detail badges. Stage 12: re-tuned from light pastel (bg-*-100/
// text-*-700) to translucent dark-friendly tints so they sit correctly on
// --color-ink-surface instead of reading as light-mode chips dropped into
// a dark dialog. "destacado" (featured) maps to the dominant --color-glow
// accent instead of amber, since it signals prominence/highlight the same
// way the home page's eyebrow pills do, rather than catalog-specific
// status like the other four tags.
export const TAG_BADGE_STYLE: Partial<Record<ProductTag, string>> = {
  imperdible: "bg-rose-500/15 text-rose-300",
  recomendado: "bg-green-500/15 text-green-300",
  nuevo: "bg-teal-500/15 text-teal-300",
  mayorista: "bg-purple-500/15 text-purple-300",
  destacado: "bg-glow/15 text-glow",
};

export const TAG_CHIP_PRIORITY: ProductTag[] = [
  "nuevo",
  "imperdible",
  "recomendado",
  "mayorista",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PRODUCTS: any[] = [];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  let result = products.filter((p) => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    if (filters.tags.length > 0 && !p.tags?.some((t) => filters.tags.includes(t))) return false;
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    return true;
  });

  switch (filters.sortBy) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    default:
      result = [...result].sort((a, b) => {
        const af = a.tags?.includes("destacado") ? 1 : 0;
        const bf = b.tags?.includes("destacado") ? 1 : 0;
        return bf - af || b.rating - a.rating;
      });
  }

  return result;
}