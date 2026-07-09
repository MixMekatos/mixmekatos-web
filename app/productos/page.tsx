import { getProductRepository } from "@/app/lib/productRepository";
import FeaturedCarousel from "@/app/components/products/FeaturedCarousel";
import ProductosPageClient from "./ProductosPageClient";

export default async function ProductosPage() {
  const repo = getProductRepository();
  const allProducts = await repo.findAll();
  const featured = allProducts.filter((p) => p.tags?.includes("destacado"));

  return (
    <main className="min-h-screen bg-ink">
      <FeaturedCarousel products={featured} />
      <ProductosPageClient initialProducts={allProducts} />
    </main>
  );
}
