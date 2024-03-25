"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Product } from "../../types/product";

type ProductsContextType = {
  products: Product[];
  add(product: Product): void;
  remove(id: string): void;
  update(product: Product): void;
  modalProductState: boolean;
  openForm(): void;
  closeForm(): void;
  editProduct: Product | undefined;
  setEditProduct: Dispatch<SetStateAction<Product | undefined>>;
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
  const [modalProductState, setModalProductState] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editProduct, setEditProduct] = useState<Product | undefined>();

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

  const openForm = () => setModalProductState(true);
  const closeForm = () => setModalProductState(false);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        add,
        remove,
        update,
        modalProductState,
        openForm,
        closeForm,
        editProduct,
        setEditProduct,
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
