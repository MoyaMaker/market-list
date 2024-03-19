import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/lib/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { FormProduct } from "./form-product";

export function MenubarHeader() {
  return (
    <Dialog>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Productos</MenubarTrigger>
          <MenubarContent>
            <DialogTrigger asChild>
              <MenubarItem>Nuevo producto</MenubarItem>
            </DialogTrigger>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar nuevo producto</DialogTitle>

          <FormProduct />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
