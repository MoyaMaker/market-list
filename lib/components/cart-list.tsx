"use client";
import { LoaderCircleIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/components/ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "./providers/cart-provider";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { CartItem } from "./cart-item";

export function CartList() {
  const {
    loading,
    cartItems,
    count,
    countChecked,
    selectAll,
    setSelectAll,
    removeSelected,
  } = useCart();

  if (loading) {
    return (
      <Button disabled>
        <ShoppingCartIcon className="w-4 h-4 mr-2" />
        <Badge>
          <LoaderCircleIcon className="h-4 w-4 animate-spin" />
        </Badge>
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ShoppingCartIcon className="w-4 h-4 mr-2" />
          <Badge>{count}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="inline-flex gap-2 items-center">
            Carrito <Badge>{count}</Badge>
          </SheetTitle>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="selectAll"
                checked={selectAll}
                onClick={() => setSelectAll(!selectAll)}
              />
              <label
                htmlFor="selectAll"
                className="text-sm font-medium leading-none select-none"
              >
                Seleccionar todos
              </label>
            </div>

            <Button variant="ghost" onClick={removeSelected}>
              <TrashIcon className="w-4 h-4 mr-2" />
              <Badge>{countChecked}</Badge>
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {(!cartItems || cartItems.length === 0) && (
              <span className="text-slate-500 text-base">
                Aún no hay elementos en carrito
              </span>
            )}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
          </div>
        </ScrollArea>

        <Separator />

        <SheetFooter className="flex-row justify-end gap-4">
          <SheetClose asChild>
            <Button variant="ghost">Cerrar</Button>
          </SheetClose>

          <Button>Continuar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
