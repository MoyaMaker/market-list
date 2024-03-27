"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartItemType } from "../../types/cart-item-type";
import { getCartItems } from "@/lib/services/cart";

type CartContextType = {
  loading: boolean;
  cartItems: CartItemType[] | undefined;
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
  count: number;
  countChecked: number;
  add: (item: CartItemType) => void;
  update: (updatedItem: CartItemType) => void;
  remove: (id: string) => void;
  removeSelected: () => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[] | undefined>();
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const count = useMemo(() => cartItems?.length || 0, [cartItems]);

  const countChecked = useMemo(() => {
    if (!cartItems) return 0;

    let c = 0;

    cartItems.forEach((item) => {
      if (item.selected) {
        c++;
      }
    });

    return c;
  }, [cartItems]);

  const add = (newItem: CartItemType) =>
    setCartItems((items) => [...(items || []), newItem]);

  const remove = (id: string) =>
    setCartItems((items) => items?.filter((it) => it.product.id !== id));

  const update = useCallback(
    (updatedItem: CartItemType) =>
      setCartItems((items) =>
        items?.map((itm) =>
          itm.product.id === updatedItem.product.id ? updatedItem : itm
        )
      ),
    []
  );

  const removeSelected = () => {
    if (!cartItems) return;

    cartItems?.forEach((item) => {
      if (item.selected) {
        remove(item.product.id);
      }
    });
  };

  const getItems = async (controller: AbortController) => {
    try {
      const response = await getCartItems(controller);

      if (response.ok) {
        const json = await response.json();

        setCartItems(json.items);

        setLoading(false);
      }
    } catch (error: any) {
      if (error?.name === "AbortError") {
        return;
      }

      console.error("Error getting cart items", error);
    }
  };

  useEffect(() => {
    setCartItems((items) =>
      items?.map((item) => {
        const updatedItem = {
          ...item,
          selected: selectAll,
        };

        return updatedItem;
      })
    );
  }, [selectAll]);

  useEffect(() => {
    const controller = new AbortController();

    getItems(controller);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        loading,
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
