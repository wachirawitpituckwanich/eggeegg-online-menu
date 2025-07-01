import { Button } from "./ui/button";
import ProdQuantityModifier from "./menu/product-quantity-modifier";
import Menu from "@/interfaces/menu";
import { useCartContext } from "@/hooks/useCartContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CLOSE,
  ERROR,
  ITEM_ALREADY_EXISTED,
  NOTE_TO_RESTAURANT,
  ORDER_FOOD,
} from "@/constants/constant";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import Addons from "@/interfaces/addons";

export default function CardButton({ keymap }: { keymap: Menu }) {
  const cc = useCartContext();
  const { addToCart, setItemQuantity, findItemQuantity } = cc;
  const initQuantity = findItemQuantity(keymap.id);
  const [quantity, setQuantity] = useState<number>(initQuantity);
  const [addons, setAddons] = useState<Addons[]>([])
  const [extraRequest, setExtraRequest] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false)
  useEffect(() => {}, [quantity]);

  return (
    <div className="h-[20vh] w-full flex flex-col justify-evenly pb-2 shadow-2xl">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            className="w-full h-full bg-white border"
            variant={"secondary"}
          >
            {keymap.name}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{keymap.name}</DialogTitle>
          </DialogHeader>
          {keymap.addons
            ? keymap.addons.map((item) => (
                <div className="flex align-middle space-x-4" key={item.id}>
                  <Checkbox
                  className="text-primary"
                  key={item.id}
                  id={`addon-checkbox-${item.id}`}
                  checked={addons.some((addon) => Number(addon.id) === Number(item.id))}
                  onCheckedChange={(checked) => {
                    setAddons((prevAddons) => {
                    if (checked) {
                      if (!prevAddons.some((addon) => Number(addon.id) === Number(item.id))) {
                      return [...prevAddons, { ...item, id: Number(item.id) }];
                      }
                      return prevAddons;
                    } else {
                      return prevAddons.filter((addon) => Number(addon.id) !== Number(item.id));
                    }
                    });
                  }}
                  />
                  <label
                  htmlFor={`addon-checkbox-${item.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                  {item.name}
                  </label>
                </div>
              ))
            : null}
          <label>{NOTE_TO_RESTAURANT}</label>
          <Textarea
            placeholder={NOTE_TO_RESTAURANT}
            className="resize-none mt-2"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setExtraRequest(e.target.value);
            }}
          />
          <DialogFooter>
            <Button
              className="w-full h-full border"
              onClick={() => {
                if (initQuantity > 0) {
                  toast.error(ERROR, {
                    classNames: {
                      error: "bg-red-400",
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
                      onClick: () => {},
                    },
                  });
                } else if (initQuantity == 0) {
                    
                    addToCart({
                    quantity: quantity,
                    id: keymap.id,
                    name: keymap.name,
                    price: keymap.price,
                    extra_request: extraRequest,
                    addons: addons,
                    });
                    setOpenDialog(false)
                } else {
                  setItemQuantity(keymap.id, quantity);
                  setOpenDialog(false)
                }
              }}
            >
              {ORDER_FOOD}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
