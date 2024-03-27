"use client";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";

import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CartItem } from "../types/cart-item";
import { useCart } from "./providers/cart-provider";
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
import { deleteCartItem, updateCartItem } from "../services/cart";

export function CartItem({ item }: { item: CartItem }) {
  const {
    product: { id, name, unit_price },
  } = item;

  const { update, remove } = useCart();

  const [selected, setSelected] = useState(item.selected);
  const [quantity, setQuantity] = useState(item.quantity.toString());

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

  const deleteItem = () => {
    deleteCartItem(id);

    remove(id);
  };

  useEffect(() => {
    const controller = new AbortController();

    const updatedItem: CartItem = {
      ...item,
      selected,
      quantity: parseFloat(quantity),
    };

    update(updatedItem);

    updateCartItem({
      id,
      quantity: parseFloat(quantity),
      signal: controller.signal,
    }).catch((error: any) => {
      if (error?.name === "AbortError") {
        return;
      }
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, selected]);

  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={selected} onClick={() => setSelected(!selected)} />

      <Card className="w-full">
        <CardHeader className="p-4">
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={deleteItem}>
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription>
            {unit_price.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-4 pt-0">
          <Button variant="outline" size="icon" onClick={removeQuantity}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Input
            type="text"
            value={quantity}
            className="max-w-24 text-center text-base"
            onChange={onChangeQuantity}
          />
          <Button variant="outline" size="icon" onClick={addQuantity}>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </CardContent>
        <CardFooter className="justify-end p-4 pt-0">
          {(unit_price * parseFloat(quantity)).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </CardFooter>
      </Card>
    </div>
  );
}
