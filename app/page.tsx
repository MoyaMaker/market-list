import { ProductItem } from "@/lib/components/product-item";
import { Input } from "@/lib/components/ui/input";

import { getProducts } from "@/lib/services/products";
import { Product } from "@/lib/types/product";
import { FormProduct } from "@/lib/components/form-product";

const products = async (): Promise<{
  products: Product[];
}> => {
  const response = await getProducts({});

  if (response.ok) {
    return response.json();
  }

  throw new Error("Error getting products");
};

export default async function Home() {
  const data = await products();

  return (
    <main className="container mt-4">
      <section className="grid grid-cols-2 items-center gap-2">
        <h1 className="font-medium text-xl">Productos</h1>

        <FormProduct />

        <div className="col-span-2 md:max-w-xs">
          <Input placeholder="Buscar" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 my-8">
        {data.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
