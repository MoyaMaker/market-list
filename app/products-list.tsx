"use client";

import { ProductItem } from "@/lib/components/product-item";
import { useProducts } from "@/lib/components/providers/products-provider";

export default function ProductsList() {
  const { products, editProduct } = useProducts();

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 my-8">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}

      {products.length === 0 && (
        <div className="text-slate-500 text-base">
          No se encontraron productos
        </div>
      )}
    </section>
  );
}
