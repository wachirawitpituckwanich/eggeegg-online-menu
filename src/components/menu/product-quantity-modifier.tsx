import { CartContext } from "@/app/context/cartcontext";
import Menu from "@/interfaces/menu";
import { Minus, Plus } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ADD_TO_CART, UPDATE_CART } from "@/constants/constant";

export default function ProdQuantityModifier({ keymap }: { keymap: Menu }) {
  const ccx = useContext(CartContext);
  const { addToCart, setItemQuantity, findItemQuantity, removeFromCart } = ccx;
  const initQuantity = findItemQuantity(keymap.id);
  const [quantity, setQuantity] = useState(initQuantity);
  const [isUpdated, setIsUpdated] = useState(false);
  function handleQuantityChange(quantity: number) {
    setIsUpdated(true);
    setQuantity(quantity);
    if (quantity == initQuantity) {
      setIsUpdated(false);
    }
  }

  useEffect(() => {}, [quantity]);
  return (
    <>
      <div className="flex flex-row items-center justify-center py-2">
        {quantity !== 0 ? (
          <button
            className="px-4 rounded-full bg-transparent"
            onClick={() => {
              handleQuantityChange(quantity - 1);
            }}
          >
            <Minus color="grey" size={20} />
          </button>
        ) : (
          <button disabled={true} className="px-4 rounded-full bg-transparent">
            <Minus color="white" size={20} />
          </button>
        )}
        <span>{quantity}</span>
        <button
          className="px-4 rounded-full bg-transparent"
          onClick={() => {
            handleQuantityChange(quantity + 1);
          }}
        >
          <Plus color="grey" size={20} />
        </button>
      </div>
      {initQuantity == 0 && !isUpdated ? (
        <Button disabled>{ADD_TO_CART}</Button>
      ) : initQuantity == 0 && isUpdated ? (
        <Button
          onClick={() => {
            if (initQuantity == 0) {
              addToCart({
                category: keymap.category,
                description: keymap.description,
                id: keymap.id,
                image: keymap.image,
                name: keymap.name,
                price: keymap.price,
              });
              setItemQuantity(keymap.id, quantity);
            } else {
              setItemQuantity(keymap.id, quantity);
            }
            setIsUpdated(false);
          }}
        >
          {ADD_TO_CART}
        </Button>
      ) : initQuantity !== 0 && !isUpdated ? (
        <Button disabled>{UPDATE_CART}</Button>
      ) : (
        <Button
          onClick={() => {
            if (initQuantity == 0) {
              addToCart({
                category: keymap.category,
                description: keymap.description,
                id: keymap.id,
                image: keymap.image,
                name: keymap.name,
                price: keymap.price,
              });
              setItemQuantity(keymap.id, quantity);
            } else if (quantity == 0) {
              removeFromCart(keymap.id, true);
            } else {
              setItemQuantity(keymap.id, quantity);
            }
            setIsUpdated(false);
          }}
        >
          {UPDATE_CART}
        </Button>
      )}
    </>
  );
}
