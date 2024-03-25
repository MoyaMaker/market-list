"use client";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { createProduct, updateProduct } from "../services/products";
import { useProducts } from "./providers/products-provider";

export function FormProduct() {
  const { modalProductState, closeForm } = useProducts();
  const { add, update, editProduct, setEditProduct } = useProducts();

  const form = useForm<FormProduct>({
    resolver: zodResolver(FormProductSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormProduct> = async (data) => {
    if (editProduct) {
      const id = editProduct.id;
      const response = await updateProduct({ id, product: data });

      if (response.ok) {
        const json = await response.json();

        reset();
        closeForm();
        update(json.product);
      }

      return;
    }

    // Create product
    const response = await createProduct({
      product: data,
    });

    if (response.ok) {
      const json = await response.json();

      reset();
      closeForm();
      add(json.product);
    }
  };

  const reset = useCallback(
    () =>
      form.reset({
        name: "",
        unit_price: 0,
      }),
    [form]
  );

  useEffect(() => {
    if (!modalProductState) {
      reset();
      setEditProduct(undefined);
    } else if (modalProductState && editProduct) {
      form.reset({
        name: editProduct.name,
        unit_price: editProduct.unit_price,
      });
    }
  }, [editProduct, form, modalProductState, reset, setEditProduct]);

  return (
    <Form {...form}>
      <Dialog open={modalProductState} onOpenChange={closeForm}>
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
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
