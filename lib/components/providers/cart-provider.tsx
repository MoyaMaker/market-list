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
import { CartItem } from "../../types/cart-item";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "@/lib/services/cart";

type CartContextType = {
  loading: boolean;
  cartItems: CartItem[] | undefined;
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
  count: number;
  countChecked: number;
  add: (item: CartItem) => void;
  update: (updatedItem: CartItem) => void;
  remove: (id: string) => void;
  removeSelected: () => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>();
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

  const add = (newItem: CartItem) => {
    setCartItems((items) => [...(items || []), newItem]);

    addToCart({
      product_id: newItem.product.id,
      quantity: newItem.quantity,
    });
  };

  const remove = (id: string) => {
    setCartItems((items) => items?.filter((it) => it.product.id !== id));

    deleteItem(id);
  };

  const update = (updatedItem: CartItem) => {
    setCartItems((items) =>
      items?.map((itm) =>
        itm.product.id === updatedItem.product.id ? updatedItem : itm
      )
    );

    updateItem(updatedItem.product.id, updatedItem.quantity);
  };

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

  const addToCart = async ({
    product_id,
    quantity,
  }: {
    product_id: string;
    quantity: number;
  }) => {
    const response = await addCartItem({
      product_id,
      quantity,
    });
  };

  const updateItem = async (id: string, quantity: number) => {
    const response = await updateCartItem(id, { quantity });
  };

  const deleteItem = async (id: string) => {
    const response = await deleteCartItem(id);
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
