import { getProducts } from "@/lib/services/products";
import { FormProduct } from "@/lib/components/form-product";
import { Search } from "@/lib/components/search";
import { Product } from "@/lib/types/product";
import { Badge } from "@/lib/components/ui/badge";
import { ProductsProvider } from "@/lib/components/providers/products-provider";
import ProductsList from "./products-list";

type HomeProps = {
  searchParams: {
    search?: string;
  };
};

const products = async (
  search?: string
): Promise<{
  products: Product[];
}> => {
  try {
    const response = await getProducts({
      search,
      next: {
        tags: ["products"],
        revalidate: 30,
      },
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
};

export default async function Home({ searchParams }: HomeProps) {
  const data = await products(searchParams.search);

  return (
    <ProductsProvider initialProducts={data.products}>
      <main className="container mt-4">
        <section className="grid grid-cols-2 items-center gap-2">
          <h1 className="flex items-center font-medium text-xl">
            <span className="mr-2">Productos</span>
            <Badge>{data.products.length}</Badge>
          </h1>

          <FormProduct />

          <div className="col-span-2 md:max-w-xs">
            <Search />
          </div>
        </section>

        <ProductsList />
      </main>
    </ProductsProvider>
  );
}
