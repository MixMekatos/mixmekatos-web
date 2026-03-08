import { PackageOpen } from "lucide-react";
import type { Product } from "@/app/lib/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductsGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <PackageOpen className="h-14 w-14 text-stone-300" />
        <h3 className="font-semibold text-(--color-text) text-lg">Sin resultados</h3>
        <p className="text-sm text-(--color-text-muted) max-w-xs">
          No encontramos productos con esos filtros. Intenta ajustar los criterios de búsqueda.
        </p>
      </div>
    );
  }

  return (
    /*
      Columnas:
        xs  → 1 col
        sm  → 2 cols  (sin sidebar)
        xl  → 3 cols  (con sidebar de 224px en 1280px+ de pantalla)
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
