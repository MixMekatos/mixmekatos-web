"use client";

import { useState, useEffect, useRef } from "react";
import {
  DEFAULT_FILTERS,
  type FilterState,
  type Product,
} from "@/app/lib/products";
import ProductFilters from "@/app/components/products/ProductFilters";
import ProductsGrid from "@/app/components/products/ProductsGrid";

function buildUrl(f: FilterState): string {
  const p = new URLSearchParams();
  f.categories.forEach((c) => p.append("category", c));
  f.tags.forEach((t) => p.append("tag", t));
  p.set("priceMin", String(f.priceMin));
  p.set("priceMax", String(f.priceMax));
  p.set("sort", f.sortBy);
  return `/api/products?${p.toString()}`;
}

interface Props {
  initialProducts: Product[];
}

export default function ProductosPageClient({ initialProducts }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setLoading(true);
    fetch(buildUrl(filters))
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-7">
        <h1 className="text-2xl sm:text-3xl font-bold text-(--color-text)">
          Nuestros Productos
        </h1>
        <p className="mt-1 text-sm text-(--color-text-muted)">
          Empanadas artesanales, dedos de queso y más mekatos irresistibles
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          totalResults={products.length}
        />
        <div className="flex-1 min-w-0 w-full">
          <ProductsGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
