import { PackageOpen } from "lucide-react";
import type { Product } from "@/app/lib/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  loading?: boolean;
}

function ProductSkeleton() {
  return <div className="rounded-2xl bg-stone-100 animate-pulse h-64" />;
}

export default function ProductsGrid({ products, loading = false }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

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
   
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
