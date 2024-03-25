"use client";
import { EllipsisIcon, PlusIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FormProduct } from "./form-product";
import { useProducts } from "./providers/products-provider";

export function ButtonNewProduct() {
  const { openForm } = useProducts();

  return (
    <>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="lg:hidden">
            <EllipsisIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openForm}>
              <PlusIcon className="mr-2 w-4 h-4" />
              Nuevo producto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="hidden lg:inline-flex" onClick={openForm}>
          <PlusIcon className="mr-2 w-4 h-4" />
          Nuevo producto
        </Button>
      </div>

      <FormProduct />
    </>
  );
}
