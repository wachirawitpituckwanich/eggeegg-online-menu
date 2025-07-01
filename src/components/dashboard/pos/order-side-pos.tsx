import { useCartContext } from "@/hooks/useCartContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import {
  INPUT_TABLE_NUM,
  ITEM_IN_CART_NOT_FOUND,
  ORDER_FOOD,
  SUCCESS,
  TABLE_NUM,
  TABLE_NUM_NOT_FOUND,
} from "@/constants/constant";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Separator } from "../../ui/separator";
import { ErrorDialog, PendingDialog, SuccessDialog } from "../../dialog/dialog";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { createClient } from "@/utils/supabase/client";
import Order from "@/interfaces/order";
import axios from 'axios'

export function OrderItems({ item }: { item: Order }) {
  const cc = useCartContext();
  const { findItemQuantity, setItemQuantity, removeFromCart } = cc;
  const initQuantity = findItemQuantity(item.id);
  const [quantity, setQuantity] = useState(initQuantity);
  function handleQuantityChange(quantity: number) {
    if (quantity == 0) {
      removeFromCart(item.id, true);
    } else {
      setItemQuantity(item.id, quantity);
    }
  }
  useEffect(() => {}, [quantity]);
  return (
    <>
      <div className="flex justify-center rounded-b-xl bg-white">
        <div className="flex flex-row items-center justify-between py-2 w-full">
          <div className="">
            <p className="">{item.name}</p>
            {item.addons?.map((addon) => (
              <p className="text-sm text-gray-700" key={addon.name}>{addon.name}</p>
            ))}
            <p className="text-sm text-gray-700">{item.extra_request}</p>
          </div>
          <div className="flex items-center justify-evenly">
            {item.quantity !== 0 ? (
              <button
                className="px-4 rounded-full bg-transparent"
                onClick={() => {
                  handleQuantityChange((item.quantity ?? 0)  - 1);
                }}
              >
                <Minus color="grey" size={20} />
              </button>
            ) : (
              <button
                disabled={true}
                className="px-4 rounded-full bg-transparent"
              >
                <Minus color="white" size={20} />
              </button>
            )}
            <span>{item.quantity}</span>
            <button
              className="px-4 rounded-full bg-transparent"
              onClick={() => {
                handleQuantityChange((item.quantity ?? 0) + 1);
              }}
            >
              <Plus color="grey" size={20} />
            </button>
            <button
              className="px-4 rounded-full bg-transparent"
              onClick={() => {
                removeFromCart(item.id, true);
              }}
            >
              <Trash2 color="red" size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export function RenderDialog({formState} : {formState : string}) {
    switch (formState) {
      case "No TableNum":
        return <ErrorDialog description={TABLE_NUM_NOT_FOUND} />;
      case "Cart Empty":
        return <ErrorDialog description={ITEM_IN_CART_NOT_FOUND} />;
      case "Success":
        return <SuccessDialog description={SUCCESS}/>
      case "Submitting":
        return <PendingDialog />;
    }
  }

export function OrderListPOS() {
  const supabase = createClient();
  const cc = useCartContext();
  const [tableNum, setTableNum] = useState("");
  const [formState, setFormState] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { clearCart } = cc;
  function validateOrder() {
    if (tableNum == "") {
      setFormState("No TableNum");
    } else if (!cc.cart || cc.cart.length === 0) {
      setFormState("Cart Empty");
    } else {
      setFormState("Submitting");
      submitOrder();
    }
  }
  useEffect(() => {}, [formState, tableNum, submitError]);
  
  const submitOrder = async () => {
    const printerURL = 'http://localhost:3001/printer/print'
    const { data, error } = await supabase
      .from('order')
      .insert([{ employee_id: 1, table_no: tableNum, details: cc.cart, price: cc.totalPrice }])
      .select();
    // Ensure all price fields in cart items are numbers
    const cartWithNumberPrices = cc.cart.map(item => ({
      ...item,
      price: Number(item.price),
      addons: item.addons?.map(addon => ({
      ...addon,
      price: Number(addon.price)
      })) ?? []
    }));

    await axios.post(printerURL, {
    created_at: new Date().toISOString(),
    employee_id: 1,
    table_no: parseInt(tableNum),
    details: cartWithNumberPrices,
    price: cc.totalPrice
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
     console.log(error.response.data);
     console.log(error.response.status);
     console.log(error.response.headers);
  });
    if (error) {
      setFormState('Submit Error')
      setSubmitError(error.message)
    } else {
      setFormState('Success')
      clearCart()
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          {TABLE_NUM}
          <Input
            className="mt-2"
            type="number"
            placeholder={INPUT_TABLE_NUM}
            value={tableNum}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTableNum(e.target.value)
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="h-2/3 overflow-y-scroll">
        {cc?.cart.map((item) => (
          <OrderItems item={item} key={item.id} />
        ))}
      </CardContent>
      <CardFooter className="flex flex-col">
        <Separator />
        <div className="w-full flex justify-between p-4 align-middle">
          <p>รวม </p>
          <p className="font-bold text-3xl pr-6">{cc.totalPrice} ฿</p>
        </div>
        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <Button
              className="w-full"
              disabled={cc?.cart.length === 0}
              onClick={() => {
                validateOrder();
              }}
            >
              {ORDER_FOOD}
            </Button>
          </DialogTrigger>
          <RenderDialog formState={formState}/>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
