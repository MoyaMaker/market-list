"use client";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisIcon, PlusIcon } from "lucide-react";

import { FormProductSchema } from "../schemas/product";
import { FormProduct } from "../types/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createProduct } from "../services/products";
import { useProducts } from "./providers/products-provider";

export function FormProduct() {
  const [open, setOpen] = useState(false);
  const { add } = useProducts();

  const form = useForm<FormProduct>({
    resolver: zodResolver(FormProductSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormProduct> = async (data) => {
    const response = await createProduct({
      product: data,
    });

    if (response.ok) {
      const json = await response.json();

      reset();
      closeModal();
      add(json.product);
    }
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const reset = useCallback(
    () =>
      form.reset({
        name: undefined,
        unit_price: undefined,
      }),
    [form]
  );

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

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
            <DropdownMenuItem onClick={openModal}>
              <PlusIcon className="mr-2 w-4 h-4" />
              Nuevo producto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="hidden lg:inline-flex" onClick={openModal}>
          <PlusIcon className="mr-2 w-4 h-4" />
          Nuevo producto
        </Button>
      </div>

      <Form {...form}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 pt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio unitario</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </>
  );
}
