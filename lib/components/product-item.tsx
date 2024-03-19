import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ProductItem() {
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
        <CardTitle>Producto 1</CardTitle>
        <CardDescription>$243.00</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Input defaultValue={1} className="max-w-16 text-center" />
          <Button variant="outline" size="icon">
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <Button>
          <ShoppingCartIcon className="mr-2 w-4 h-4" />
          Añadir
        </Button>
      </CardFooter>
    </Card>
  );
}
