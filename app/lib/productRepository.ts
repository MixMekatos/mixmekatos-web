import type {
  Product,
  FilterState,
  ProductCategory,
  ProductTag,
  SortOption,
} from "./products";
import { applyFilters, MAX_PRICE } from "./products";
import productsData from "@/app/data/products.json";

export interface ProductQuery {
  categories?: string[];
  tags?: string[];
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
}

export interface IProductRepository {
  findAll(query?: ProductQuery): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}

function toFilterState(query?: ProductQuery): FilterState {
  return {
    categories: (query?.categories ?? []) as ProductCategory[],
    tags:       (query?.tags       ?? []) as ProductTag[],
    priceMin:   query?.priceMin ?? 0,
    priceMax:   query?.priceMax ?? MAX_PRICE,
    sortBy:     (query?.sortBy ?? "relevance") as SortOption,
  };
}

class JsonProductRepository implements IProductRepository {
  private readonly all: Product[] = productsData as unknown as Product[];

  async findAll(query?: ProductQuery): Promise<Product[]> {
    return applyFilters(this.all, toFilterState(query));
  }

  async findById(id: string): Promise<Product | null> {
    return this.all.find((p) => p.id === id) ?? null;
  }
}

class SupabaseProductRepository implements IProductRepository {
  async findAll(query?: ProductQuery): Promise<Product[]> {
    const { createServerClient } = await import("./supabase");
    const supabase = createServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let q: any = supabase.from("products").select("*");

    if (query?.categories?.length) q = q.in("category", query.categories);
    if (query?.tags?.length)       q = q.overlaps("tags", query.tags);
    if (query?.priceMin)           q = q.gte("price", query.priceMin);
    if (query?.priceMax && query.priceMax < MAX_PRICE) q = q.lte("price", query.priceMax);

    switch (query?.sortBy) {
      case "price-asc":  q = q.order("price",  { ascending: true  }); break;
      case "price-desc": q = q.order("price",  { ascending: false }); break;
      case "rating":     q = q.order("rating", { ascending: false }); break;
      default:           q = q.order("rating", { ascending: false }); break;
    }

    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as unknown as Product[];
  }

  async findById(id: string): Promise<Product | null> {
    const { createServerClient } = await import("./supabase");
    const supabase = createServerClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return (data ?? null) as Product | null;
  }
}

export function getProductRepository(): IProductRepository {
  return process.env.PRODUCT_SOURCE === "supabase"
    ? new SupabaseProductRepository()
    : new JsonProductRepository();
}
