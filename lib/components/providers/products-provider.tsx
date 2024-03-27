"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ProductType } from "../../types/product-type";

type ProductsContextType = {
  products: ProductType[];
  add(product: ProductType): void;
  remove(id: string): void;
  update(product: ProductType): void;
  modalProductState: boolean;
  openForm(): void;
  closeForm(): void;
  editProduct: ProductType | undefined;
  setEditProduct: Dispatch<SetStateAction<ProductType | undefined>>;
};

type ProductsProviderProps = {
  initialProducts: ProductType[];
  children: React.ReactNode;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  initialProducts,
  children,
}) => {
  const [modalProductState, setModalProductState] = useState(false);
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [editProduct, setEditProduct] = useState<ProductType | undefined>();

  const add = (newProduct: ProductType) =>
    setProducts((items) => [newProduct, ...items]);

  const remove = (id: string) =>
    setProducts((items) => items.filter((product) => product.id !== id));

  const update = (updatedProduct: ProductType) =>
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
