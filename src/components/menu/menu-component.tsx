"use client";
import Menu from "@/interfaces/menu";
import NavBar from "./navbar-menu";
import ScrollMenu from "./scroll-menu";
import TableInfo from "./table-info";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading-screen";


export default function MenuComponents({
  tableId,
  menujson,
}: {
  tableId: string;
  menujson: Menu[];
}) {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState<Menu[]>(menujson);
  async function getMenuItems() {
    try {
      setMenus(menujson);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getMenuItems();
  }, [menus]);
  if (loading) return <LoadingScreen/>;
  return (
    <div className="w-screen h-screen flex flex-col bg-background">
      <NavBar filteredMenus={menujson} />
      <TableInfo tableId={tableId} />
      <div className="w-full p-2 h-3/4">
        <Card className="h-full px-2 border">
          <CardContent className="w-full h-full flex flex-col mb-2 py-4">
            <ScrollMenu filteredMenus={menujson} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
