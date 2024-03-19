import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/components/ui/sheet";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function CartList() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ShoppingCartIcon className="w-4 h-4 mr-2" />
          <Badge>3</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
