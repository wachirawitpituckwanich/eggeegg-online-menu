"use client";
import React, { createContext, useState, ReactNode } from "react";
import Menu from "@/interfaces/menu";

type CartItem = Menu & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (Menu: Menu | CartItem) => void;
  removeFromCart: (itemId: number, clearAll: boolean) => void;
  findItemQuantity: (itemId: number) => number;
  setItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType>({});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = parseFloat(
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );

  // Add item to cart
  const addToCart = (Menu: Menu | CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === Menu.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // Item doesn't exist, add new item with quantity 1
        return [...prevCart, { ...Menu, quantity: 1 }];
      }
    });
  };
  const findItemQuantity = (itemId: number) => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);
    return existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
  };

  const setItemQuantity = (itemId: number, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === itemId
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: quantity,
        } 
        return updatedCart;
      } else {
        addToCart({ ...prevCart[existingItemIndex], quantity: quantity });
      }
      return prevCart;
    });
  }
  // Remove item from cart
  const removeFromCart = (itemId: number, clearAll: boolean) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];

        if (updatedCart[existingItemIndex].quantity > 1 && clearAll) {
          updatedCart.splice(existingItemIndex, 1);
          // If more than 1, decrement quantity
        } else if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity - 1,
          };
        } else {
          // If only 1, remove the item
          updatedCart.splice(existingItemIndex, 1);
        }

        return updatedCart;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        findItemQuantity,
        setItemQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
