import Cart from '@/interfaces/cart';
import Menu from '@/interfaces/menu';

export type CartItem = Cart

export type CartContextType = {
  cart: CartItem[];
  addToCart: (Menu: Cart) => void;
  removeFromCart: (itemId: number, clearAll: boolean) => void;
  findItemQuantity: (itemId: number) => number;
  setItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};