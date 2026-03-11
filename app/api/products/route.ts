import { NextRequest, NextResponse } from "next/server";
import { getProductRepository } from "@/app/lib/productRepository";
import { MAX_PRICE } from "@/app/lib/products";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  try {
    const repo = getProductRepository();
    const products = await repo.findAll({
      categories: sp.getAll("category").filter(Boolean),
      tags:       sp.getAll("tag").filter(Boolean),
      priceMin:   sp.has("priceMin") ? Number(sp.get("priceMin")) : 0,
      priceMax:   sp.has("priceMax") ? Number(sp.get("priceMax")) : MAX_PRICE,
      sortBy:     sp.get("sort") ?? "relevance",
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json(
      { error: "Error al cargar productos" },
      { status: 500 }
    );
  }
}
