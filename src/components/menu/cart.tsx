import { Button } from "../ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useCartContext } from "@/hooks/useCartContext";
import { NO_ORDER, ORDER_FOOD } from "@/constants/constant";
export default function Cart() {
  const cc = useCartContext();
  const { addToCart, removeFromCart, clearCart, totalItems, totalPrice } = cc;
  return (
    <div className="h-[85vh] flex flex-col justify-between ">
      <ScrollArea className="w-full h-full flex flex-col justify-between ">
        {cc?.cart.length === 0 ? (
          <p className="text-center">{NO_ORDER}</p>
        ) : (
          <div>
            <ul>
              {cc?.cart.map((item) => (
                <li key={item.id} className="flex justify-between p-2">
                  <article className="flex flex-row justify-between items-center w-full h-24">
                  <section className="flex flex-col">
                    <h3>{item.name}</h3>
                    <p className="text-xs font-thin text-gray-500">{item.description}</p>
                  </section>
                  <div className="w-fit text-center flex items-center space-x-2">
                    <button
                    className="px-2 rounded-full bg-transparent"
                    onClick={() => {
                      removeFromCart(item.id, false);
                    }}
                    >
                    <Minus color="grey" size={20} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                    className="px-2 rounded-full bg-transparent"
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        category: ""
                      });
                    }}
                    >
                    <Plus color="grey" size={20} />
                    </button>
                    <button
                    className="px-2 rounded-full bg-transparent"
                    onClick={() => {
                      removeFromCart(item.id, true);
                    }}
                    >
                    <Trash2 color="red" size={20} />
                    </button>
                  </div>
                  </article>
                </li>
              ))}
              
            </ul>
            
          </div>
        )}
      </ScrollArea>
      {cc?.cart.length > 0 ? (
        <div className="h-fit w-full">
          <p className="py-2">รวม {totalPrice} ฿</p>
          <Button className="w-full"
            onClick={() => {
            }}
          >
            {ORDER_FOOD}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
