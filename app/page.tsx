import { getProducts } from "@/lib/services/products";
import { Search } from "@/lib/components/search";
import { ProductType } from "@/lib/types/product-type";
import { ProductsProvider } from "@/lib/components/providers/products-provider";
import { ProductsList } from "./products-list";
import { ProductsCounter } from "@/lib/components/products-counter";
import { ButtonNewProduct } from "@/lib/components/button-new-product";
import { unstable_noStore } from "next/cache";

type HomeProps = {
  searchParams: {
    search?: string;
  };
};

async function getProductsList(search?: string): Promise<{
  products: ProductType[];
}> {
  try {
    unstable_noStore();
    const response = await getProducts({
      search,
    });

    if (response.ok) {
      return response.json();
    }

    throw new Error("Error fetch product", {
      cause: response.statusText,
    });
  } catch (error) {
    throw new Error("Error getting products", {
      cause: error,
    });
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const data = await getProductsList(searchParams.search);

  return (
    <ProductsProvider initialProducts={data.products}>
      <main className="container mt-4">
        <section className="grid grid-cols-2 items-center gap-2">
          <h1 className="flex items-center font-medium text-xl">
            <span className="mr-2">Productos</span>
            <ProductsCounter />
          </h1>

          <ButtonNewProduct />

          <div className="col-span-2 md:max-w-xs">
            <Search />
          </div>
        </section>

        <ProductsList />
      </main>
    </ProductsProvider>
  );
}
