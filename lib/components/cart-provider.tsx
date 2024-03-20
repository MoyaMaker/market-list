"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem } from "../types/cart-item";

type CartContextType = {
  cartItems: CartItem[];
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
  count: number;
  countChecked: number;
  add: (item: CartItem) => void;
  update: (updatedItem: CartItem) => void;
  remove: (id: number) => void;
  removeSelected: () => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const count = useMemo(() => cartItems.length, [cartItems]);

  const countChecked = useMemo(() => {
    let c = 0;

    cartItems.forEach((item) => {
      if (item.selected) {
        c++;
      }
    });

    return c;
  }, [cartItems]);

  const add = (newItem: CartItem) =>
    setCartItems((items) => [...items, newItem]);

  const remove = (id: number) =>
    setCartItems((items) => items.filter((it) => it.product.id !== id));

  const update = (updatedItem: CartItem) =>
    setCartItems((items) =>
      items.map((itm) =>
        itm.product.id === updatedItem.product.id ? updatedItem : itm
      )
    );

  const removeSelected = () => {
    cartItems.forEach((item) => {
      if (item.selected) {
        remove(item.product.id);
      }
    });
  };

  useEffect(() => {
    setCartItems((items) =>
      items.map((item) => {
        const updatedItem = {
          ...item,
          selected: selectAll,
        };

        return updatedItem;
      })
    );
  }, [selectAll]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectAll,
        setSelectAll,
        count,
        countChecked,
        add,
        update,
        remove,
        removeSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error(
      "useCart has to be used within <CurrentUserContext.Provider>"
    );
  }

  return cartContext;
};
