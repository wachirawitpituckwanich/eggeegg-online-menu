"use server";
import Menu from "@/interfaces/menu";
import { CartProvider } from "../../context/cartcontext";


import { createClient } from "@/utils/supabase/server";
import MenuComponents from "@/components/menu/menu-component";



export default async function Menupage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: tableId } = await params;
  const supabase = await createClient();
  const { data: menuItems } = await supabase.from("menuitems").select();
  const menujson: Menu[] = menuItems ?? [];
  return (
    <CartProvider>
      <MenuComponents tableId={tableId} menujson={menujson}/>
    </CartProvider>
  );
}
