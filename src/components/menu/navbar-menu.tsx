'use client';
import Menu from "@/interfaces/menu";
import { Search, ShoppingCart } from "lucide-react";
import Cart from "./cart";
import DialogButton from "./dialog-button";
import ScrollMenu from "./scroll-menu";
import { Input } from "../ui/input";
import { useState } from "react";
import { ORDER_LIST, SEARCH_PLACEHOLDER } from "@/constants/constant";

export default function NavBar({filteredMenus}: {filteredMenus: Menu[]}) {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <nav className="fixed w-full flex flex-row justify-between p-4">
      <DialogButton
        icon={<Search size={20} />}
        header={
          <Input
            className="w-full"
            placeholder={SEARCH_PLACEHOLDER}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
        }
        body={<ScrollMenu filteredMenus={filteredMenus}/>}
      />
      <DialogButton
        icon={<ShoppingCart size={20} />}
        title={ORDER_LIST}
        body={<Cart />}
      />
    </nav>
  );
}