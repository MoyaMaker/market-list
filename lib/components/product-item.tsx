"use client";
import { useEffect, useMemo, useState } from "react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Product } from "../types/product";
import { useCart } from "./providers/cart-provider";
import { CartItem } from "../types/cart-item";
import { formatDate } from "../helpers/format-date";
import { ConfirmDeleteContent } from "./confirm-delete";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/lib/components/ui/alert-dialog";
import { useProducts } from "./providers/products-provider";
import { addCartItem, updateCartItem } from "../services/cart";

export function ProductItem({ product }: { product: Product }) {
  // Providers
  const { add, update, cartItems } = useCart();
  const { openForm, setEditProduct } = useProducts();

  // States
  const { id, name, unit_price, created_at, updated_at } = product;
  const [quantity, setQuantity] = useState("1");

  const addQuantity = () => {
    setQuantity((q) => (parseFloat(q) + 1).toString());
  };
  const removeQuantity = () =>
    setQuantity((q) => {
      const value = parseFloat(q);

      return value > 1 ? (value - 1).toString() : q;
    });
  const onChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    if (itemCart && e.type === "change") return;

    const value = e.currentTarget.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const itemCart = useMemo(() => {
    const result = cartItems?.find((item) => item.product.id === id);

    if (result) {
      setQuantity(result.quantity.toString());

      return result;
    }
  }, [cartItems, id]);

  const onEditProduct = () => {
    setEditProduct(product);

    openForm();
  };

  const addProductToCart = () => {
    if (!itemCart) {
      add({
        selected: false,
        product,
        quantity: parseFloat(quantity),
      });

      addCartItem({
        product_id: id,
        quantity: parseFloat(quantity),
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    if (itemCart) {
      const updatedItem: CartItem = {
        ...itemCart,
        quantity: parseFloat(quantity),
      };

      update(updatedItem);

      updateCartItem({
        id,
        quantity: parseFloat(quantity),
        signal: controller.signal,
      }).catch((error) => {
        if (error?.name === "AbortError") {
          return;
        }
      });
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <AlertDialog>
      <Card>
        <CardHeader>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onEditProduct}>
                  Editar
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>Eliminar</DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="text-base">
            {unit_price.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <span className="line-clamp-2 text-xs text-gray-400">
            Fecha de creación: {formatDate(created_at)}
          </span>
          <span className="line-clamp-2 text-xs text-gray-400">
            Fecha de actualización: {formatDate(updated_at)}
          </span>
        </CardContent>
        <CardFooter className="justify-between">
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={removeQuantity}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Input
              key={itemCart?.quantity}
              type="text"
              defaultValue={quantity}
              className="max-w-16 text-center text-lg"
              onChange={onChangeQuantity}
              onBlur={onChangeQuantity}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addQuantity}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={addProductToCart}>
            {itemCart ? (
              <>
                <CheckIcon className="mr-2 w-4 h-4" />
                Añadido
              </>
            ) : (
              <>
                <ShoppingCartIcon className="mr-2 w-4 h-4" />
                Añadir
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <ConfirmDeleteContent id={id} />
    </AlertDialog>
  );
}
