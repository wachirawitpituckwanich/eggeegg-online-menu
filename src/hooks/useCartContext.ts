import { CartContext } from "@/app/context/cartcontext";
import { useContext } from "react";

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}