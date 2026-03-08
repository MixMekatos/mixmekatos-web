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

/** Priority order for the single visible chip on a card */
export const TAG_CHIP_PRIORITY: ProductTag[] = [
  "nuevo",
  "imperdible",
  "recomendado",
  "mayorista",
];

export const PRODUCTS: Product[] = [
  {
    id: "emp-maiz-x1",
    name: "Empanada de maíz",
    description:
      "Empanada horneada de masa de maíz rellena de carne molida y papa criolla. Crujiente por fuera, jugosa por dentro. Preparada artesanalmente en nuestra cocina oculta.",
    price: 3500,
    weight: "120g",
    unit: "Unidad",
    category: "empanadas",
    images: [],
    rating: 4.8,
    ratingCount: 142,
    ingredients: ["Masa de maíz", "Carne molida", "Papa criolla", "Cebolla", "Especias"],
    tags: ["destacado", "imperdible"],
    stock: 50,
  },
  {
    id: "emp-maiz-x6",
    name: "Empanadas de maíz x6",
    description:
      "Pack de 6 empanadas horneadas de masa de maíz. Ideales para compartir o tener en casa durante la semana.",
    price: 18000,
    originalPrice: 21000,
    discount: 14,
    weight: "720g",
    unit: "Paquete x6",
    category: "empanadas",
    images: [],
    rating: 4.9,
    ratingCount: 89,
    ingredients: ["Masa de maíz", "Carne molida", "Papa criolla", "Cebolla", "Especias"],
    tags: ["destacado", "recomendado"],
    stock: 30,
  },
  {
    id: "dedos-queso-x1",
    name: "Dedo de queso",
    description:
      "Bastón de queso fundido cubierto en una mezcla crujiente y dorada. Imposible comer solo uno.",
    price: 2800,
    weight: "80g",
    unit: "Unidad",
    category: "dedos",
    images: [],
    rating: 4.7,
    ratingCount: 98,
    ingredients: ["Queso mozzarella", "Harina de trigo", "Huevo", "Pan rallado", "Especias"],
    tags: ["imperdible", "nuevo"],
    stock: 40,
  },
  {
    id: "dedos-queso-x6",
    name: "Dedos de queso x6",
    description:
      "Pack de 6 dedos de queso para compartir. Perfectos como entrada o snack en cualquier reunión.",
    price: 15000,
    originalPrice: 16800,
    discount: 11,
    weight: "480g",
    unit: "Paquete x6",
    category: "dedos",
    images: [],
    rating: 4.6,
    ratingCount: 54,
    ingredients: ["Queso mozzarella", "Harina de trigo", "Huevo", "Pan rallado", "Especias"],
    tags: ["recomendado"],
    stock: 25,
  },
  {
    id: "congelado-emp-x12",
    name: "Empanadas congeladas x12",
    description:
      "Paquete de 12 empanadas prefritas congeladas. Listas para freír en minutos. Ideal para el hogar y eventos.",
    price: 32000,
    weight: "1.4 kg",
    unit: "Paquete x12",
    category: "congelados",
    images: [],
    rating: 4.5,
    ratingCount: 67,
    ingredients: ["Masa de maíz", "Carne molida", "Papa criolla", "Cebolla", "Especias", "Aceite vegetal"],
    tags: ["mayorista"],
    stock: 20,
  },
  {
    id: "congelado-dedos-x12",
    name: "Dedos de queso congelados x12",
    description:
      "Paquete de 12 dedos de queso prefritos congelados. Listos en minutos al horno o freidora.",
    price: 28000,
    weight: "960g",
    unit: "Paquete x12",
    category: "congelados",
    images: [],
    rating: 4.4,
    ratingCount: 43,
    ingredients: ["Queso mozzarella", "Harina de trigo", "Huevo", "Pan rallado"],
    tags: ["mayorista"],
    stock: 15,
  },
  {
    id: "combo-familiar",
    name: "Combo familiar",
    description:
      "El combo perfecto para reuniones. 6 empanadas de maíz + 6 dedos de queso recién hechos.",
    price: 30000,
    originalPrice: 36800,
    discount: 18,
    weight: "1.2 kg",
    unit: "Combo",
    category: "combos",
    images: [],
    rating: 4.9,
    ratingCount: 112,
    ingredients: ["Empanadas de maíz x6", "Dedos de queso x6"],
    tags: ["destacado", "recomendado", "nuevo"],
    stock: 20,
  },
  {
    id: "combo-evento",
    name: "Combo eventos x50",
    description:
      "Paquete mayorista de 50 unidades mixtas prefritas congeladas. Ideal para eventos y celebraciones.",
    price: 120000,
    originalPrice: 145000,
    discount: 17,
    weight: "6 kg",
    unit: "Paquete x50",
    category: "combos",
    images: [],
    rating: 4.7,
    ratingCount: 28,
    ingredients: ["Empanadas de maíz x25", "Dedos de queso x25"],
    tags: ["mayorista", "destacado"],
    stock: 10,
  },
];

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
