"use client";
import Menu from "@/interfaces/menu";
import { Input } from "../../ui/input";
import { useState, useEffect } from "react";
import {
  MENU_NOT_FOUND,
  ORDER_FOOD,
  SEARCH_PLACEHOLDER,
  TABLE_NUM,
} from "@/constants/constant";

import { CartProvider } from "@/app/context/cartcontext";
import CardButton from "../../card-button";

import { OrderListPOS} from "./order-side-pos";
import { Card, CardContent } from "../../ui/card";
import { createClient } from "@/utils/supabase/client";
import { LoaderCircle } from "lucide-react";
import LoadingScreen from "@/components/loading-screen";
export default function POSPage() {
  
  const [inputValue, setInputValue] = useState<string>("");
  const [menuitems, setMenuitems] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const filteredMenus = menuitems.filter((item) =>
    item.name.toLowerCase().includes(inputValue)
  );
  useEffect(() => {
    const loadMenuitems = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("menuitems").select("*");
      setMenuitems(data ?? []);
      setLoading(false);
    }
    loadMenuitems();
    }, [loading, menuitems]);
  
  return (
    <CartProvider>
      {loading ? <LoadingScreen/>:<div className="p-4 w-screen h-screen flex bg-secondary">
        <div className="flex flex-col h-full w-2/3 p-2">
          <div className="flex flex-col h-fit w-full pb-4">
            <Input
              className="w-full bg-white"
              placeholder={SEARCH_PLACEHOLDER}
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
            />
          </div>
          <Card className="h-[90vh] overflow-y-scroll">
            <CardContent>
              <div className="flex flex-wrap h-full w-full pt-4 overflow-y-auto">
            {filteredMenus.length !== 0 ? (
              filteredMenus.map((item) => (
                <CardButton
                  key={item.id}
                  keymap={{ ...item, quantity: 1 }}
                />
              ))
            ) : (
              <p>{MENU_NOT_FOUND}</p>
            )}
          </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col h-full w-full p-2">
          <OrderListPOS/>
        </div>
      </div>}
      </CartProvider>
  );
}
