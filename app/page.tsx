import { ProductItem } from "@/lib/components/product-item";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { EllipsisIcon, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";

export default function Home() {
  const items = Array.from({
    length: 50,
  });

  const generatePrice = () => Math.random() * (100 - 1) + 1;

  return (
    <main className="container mt-4">
      <section className="grid grid-cols-2 items-center gap-2">
        <h1 className="font-medium text-xl">Productos</h1>

        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="lg:hidden">
              <EllipsisIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 w-4 h-4" />
                Nuevo producto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="hidden lg:inline-flex">
            <PlusIcon className="mr-2 w-4 h-4" />
            Nuevo producto
          </Button>
        </div>

        <div className="col-span-2 md:max-w-xs">
          <Input placeholder="Buscar" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 my-8">
        {items.map((_, index) => (
          <ProductItem
            key={index}
            product={{
              id: index,
              name: `Producto ${index}`,
              description: "",
              unit_price: generatePrice(),
              created_at: new Date(),
              updated_at: new Date(),
            }}
          />
        ))}
      </section>
    </main>
  );
}
