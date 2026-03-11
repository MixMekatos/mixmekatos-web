"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import type { FilterState, ProductCategory, ProductTag } from "@/app/lib/products";
import { CATEGORIES, TAG_LABELS, MAX_PRICE, formatPrice } from "@/app/lib/products";

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
}

const FILTERABLE_TAGS: ProductTag[] = ["imperdible", "recomendado", "nuevo", "mayorista"];

export default function ProductFilters({ filters, onChange, totalResults }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActive =
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < MAX_PRICE;

  const activeCount =
    filters.categories.length +
    filters.tags.length +
    (filters.priceMin > 0 || filters.priceMax < MAX_PRICE ? 1 : 0);

  const toggleCategory = (cat: ProductCategory) =>
    onChange({
      ...filters,
      categories: filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });

  const toggleTag = (tag: ProductTag) =>
    onChange({
      ...filters,
      tags: filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag],
    });

  const clearAll = () =>
    onChange({ ...filters, categories: [], tags: [], priceMin: 0, priceMax: MAX_PRICE });

  const body = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-(--color-text) mb-3">
          Categoría
        </p>
        <ul className="flex flex-col gap-2">
          {(Object.keys(CATEGORIES) as ProductCategory[]).map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="h-4 w-4 rounded border-stone-300 cursor-pointer"
                  style={{ accentColor: "var(--color-accent)" }}
                />
                <span className="text-sm text-(--color-text) group-hover:text-accent transition">
                  {CATEGORIES[cat]}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-(--color-text) mb-3">
          Precio
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between text-xs text-(--color-text-muted) mb-1.5">
              <span>Mínimo</span>
              <span className="font-medium text-(--color-text)">{formatPrice(filters.priceMin)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={1000}
              value={filters.priceMin}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v < filters.priceMax) onChange({ ...filters, priceMin: v });
              }}
              className="w-full cursor-pointer"
              style={{ accentColor: "var(--color-accent)" }}
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-(--color-text-muted) mb-1.5">
              <span>Máximo</span>
              <span className="font-medium text-(--color-text)">{formatPrice(filters.priceMax)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={1000}
              value={filters.priceMax}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v > filters.priceMin) onChange({ ...filters, priceMax: v });
              }}
              className="w-full cursor-pointer"
              style={{ accentColor: "var(--color-accent)" }}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-(--color-text) mb-3">
          Etiquetas
        </p>
        <div className="flex flex-wrap gap-2">
          {FILTERABLE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                filters.tags.includes(tag)
                  ? "border-accent bg-accent text-white"
                  : "border-stone-200 bg-white text-(--color-text-muted) hover:border-accent hover:text-accent"
              }`}
            >
              {TAG_LABELS[tag]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-(--color-text) mb-2 block">
          Ordenar por
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onChange({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
          }
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-(--color-text) focus:border-accent focus:outline-none"
        >
          <option value="relevance">Relevancia</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
          <option value="rating">Mejor calificados</option>
        </select>
      </div>

      {hasActive && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-sm font-medium text-rose-500 hover:text-rose-600 transition"
        >
          <X className="h-4 w-4" />
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-(--color-text) shadow-sm hover:border-accent transition w-full"
        >
          <SlidersHorizontal className="h-4 w-4 text-accent" />
          <span>
            Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
          </span>
          <span className="ml-auto text-xs text-(--color-text-muted)">
            {totalResults} resultado{totalResults !== 1 ? "s" : ""}
          </span>
          {mobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {mobileOpen && (
          <div className="mt-2 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            {body}
          </div>
        )}
      </div>

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-accent" />
              <h3 className="font-bold text-sm text-(--color-text)">Filtros</h3>
            </div>
            <span className="text-xs text-(--color-text-muted)">
              {totalResults} resultado{totalResults !== 1 ? "s" : ""}
            </span>
          </div>
          {body}
        </div>
      </aside>
    </>
  );
}
