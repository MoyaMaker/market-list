"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/components/ui/alert-dialog";
import { useProducts } from "./providers/products-provider";
import { deleteProduct } from "../services/products";

export function ConfirmDeleteContent({ id }: { id: string }) {
  const { remove } = useProducts();

  const deleteAction = async () => {
    const response = await deleteProduct({ id });

    if (response.status === 204) {
      remove(id);
      return;
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmar Eliminación</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Seguro que quieres eliminar este artículo? Si lo haces, no podrás
          recuperarlo después. Por favor, confirma tu elección.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={deleteAction}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
