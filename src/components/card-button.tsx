import { Button } from "./ui/button";
import ProdQuantityModifier from "./menu/product-quantity-modifier";
import Menu from "@/interfaces/menu";
import { useCartContext } from "@/hooks/useCartContext";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { CLOSE, ERROR, ITEM_ALREADY_EXISTED } from "@/constants/constant";

export default function CardButton({ keymap }: { keymap: Menu }) {
  const cc = useCartContext();
  const { addToCart, setItemQuantity, findItemQuantity } = cc;
  const initQuantity = findItemQuantity(keymap.id);
  const [quantity, setQuantity] = useState(initQuantity);
  function handleQuantityChange(quantity: number) {
    setQuantity(quantity);
  }
  useEffect(() => {}, [quantity]);

  return (
    <div className="h-[20vh] w-full flex flex-col justify-evenly pb-2 shadow-2xl">
      <Button
        className="w-full h-full bg-white border"
        variant={"secondary"}
        onClick={() => {
          console.log("He");
          if (initQuantity > 0) {
            toast.error(ERROR, {
              classNames: {
                error: 'bg-red-400',
                toast: "bg-blue-400",
                title: "text-green-400 text-2xl",
                description: "text-red-400",
                actionButton: "bg-zinc-400",
                cancelButton: "bg-orange-400",
                closeButton: "bg-lime-400",
              },
              description: ITEM_ALREADY_EXISTED,
              action: {
                label: CLOSE,
                onClick: () => console.log("Undo"),
              },
            });
          } else if (initQuantity == 0) {
            addToCart({
              category: keymap.category,
              description: keymap.description,
              id: keymap.id,
              image: keymap.image,
              name: keymap.name,
              price: keymap.price,
              quantity: quantity,
            });
          } else {
            setItemQuantity(keymap.id, quantity);
          }
        }}
      >
        {keymap.name}
      </Button>
    </div>
  );
}
