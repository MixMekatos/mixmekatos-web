"use client";

import { useState, useMemo } from "react";
import {
  PRODUCTS,
  DEFAULT_FILTERS,
  applyFilters,
  type FilterState,
} from "@/app/lib/products";
import FeaturedCarousel from "@/app/components/products/FeaturedCarousel";
import ProductFilters from "@/app/components/products/ProductFilters";
import ProductsGrid from "@/app/components/products/ProductsGrid";

const FEATURED = PRODUCTS.filter((p) => p.tags?.includes("destacado"));

export default function ProductosPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const filtered = useMemo(() => applyFilters(PRODUCTS, filters), [filters]);

  return (
    <main className="min-h-screen bg-(--color-bg)">
      {/* Carrusel de destacados */}
      <FeaturedCarousel products={FEATURED} />

      {/* Sección principal */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold text-(--color-text)">
            Nuestros Productos
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">
            Empanadas artesanales, dedos de queso y más mekatos irresistibles
          </p>
        </div>

        {/*
          Layout:
          - Mobile/Tablet: columna → filtros colapsables arriba, grid abajo
          - Desktop (lg+): fila → sidebar fijo izquierda, grid a la derecha
        */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            totalResults={filtered.length}
          />
          <div className="flex-1 min-w-0 w-full">
            <ProductsGrid products={filtered} />
          </div>
        </div>
      </div>
    </main>
  );
}
