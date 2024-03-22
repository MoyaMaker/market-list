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

export function ProductItem({ product }: { product: Product }) {
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
  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const { add, update, cartItems } = useCart();

  const itemCart = useMemo(() => {
    const result = cartItems.find((item) => item.product.id === id);

    if (result) {
      setQuantity(result.quantity.toString());

      return result;
    }
  }, [cartItems, id]);

  useEffect(() => {
    if (itemCart) {
      const updatedItem: CartItem = {
        ...itemCart,
        quantity: parseFloat(quantity),
      };

      update(updatedItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
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
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
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
            type="text"
            value={quantity}
            className="max-w-16 text-center text-lg"
            onChange={onChangeQuantity}
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

        <Button
          onClick={() => {
            if (!itemCart) {
              add({
                selected: false,
                product,
                quantity: parseFloat(quantity),
              });
            }
          }}
        >
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
  );
}
