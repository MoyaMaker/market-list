"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { Product } from "../../types/product";

type ProductsContextType = {
  products: Product[];
  add(product: Product): void;
  remove(id: string): void;
};

type ProductsProviderProps = {
  initialProducts: Product[];
  children: React.ReactNode;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  initialProducts,
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const add = (newProduct: Product) =>
    setProducts((items) => [newProduct, ...items]);

  const remove = (id: string) =>
    setProducts((items) => items.filter((product) => product.id !== id));

  const update = (updatedProduct: Product) =>
    setProducts((items) =>
      items.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        add,
        remove,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts has to be used within <ProductsProvider.Provider>"
    );
  }

  return context;
};
