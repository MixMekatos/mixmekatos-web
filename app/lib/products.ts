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

export const CATEGORY_EMOJI: Record<ProductCategory, string> = {
  empanadas: "🫓",
  dedos: "🧀",
  congelados: "❄️",
  combos: "🎁",
};

export const CATEGORY_BG: Record<ProductCategory, string> = {
  empanadas: "bg-orange-100",
  dedos: "bg-amber-100",
  congelados: "bg-sky-100",
  combos: "bg-rose-100",
};

export const TAG_CHIP_STYLE: Partial<Record<ProductTag, string>> = {
  imperdible: "bg-rose-500 text-white",
  recomendado: "bg-green-500 text-white",
  nuevo: "bg-teal-500 text-white",
  mayorista: "bg-purple-500 text-white",
};

export const TAG_BADGE_STYLE: Partial<Record<ProductTag, string>> = {
  imperdible: "bg-rose-100 text-rose-700",
  recomendado: "bg-green-100 text-green-700",
  nuevo: "bg-teal-100 text-teal-700",
  mayorista: "bg-purple-100 text-purple-700",
  destacado: "bg-amber-100 text-amber-700",
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