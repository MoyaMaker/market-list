"use client";
import { Badge } from "@/lib/components/ui/badge";

import { useProducts } from "./providers/products-provider";

export function ProductsCounter() {
  const { products } = useProducts();

  return <Badge>{products.length}</Badge>;
}
