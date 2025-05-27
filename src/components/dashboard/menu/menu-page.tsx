import { MouseEvent, useEffect, useState } from "react";
import { handleMenuColumns } from "./menu-columns";
import { DataTable } from "@/components/data-table";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LoaderCircle, Plus } from "lucide-react";
import Menu from "@/interfaces/menu";
import DashboardWrapper from "../dashboard-wrapper";
import { DeleteButton } from "@/components/datatable-button";
import { ItemCard } from "@/components/item-card";
import { createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
interface AdminMenuContextType {
  orderTableData: Menu[];
  setOrderTableData: React.Dispatch<React.SetStateAction<Menu[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectableCategories: string[];
  setSelectableCategories: React.Dispatch<React.SetStateAction<string[]>>;
  readOrder: () => void;
}

const AdminMenuContext = createContext<AdminMenuContextType | undefined>(
  undefined
);

export function useAdminMenuContext() {
  const context = useContext(AdminMenuContext);
  if (!context) {
    throw new Error(
      "useAdminMenuContext must be used within AdminMenuProvider"
    );
  }
  return context;
}

export function AdminMenuProvider({ children }: { children: React.ReactNode }) {
  const [orderTableData, setOrderTableData] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectableCategories, setSelectableCategories] = useState<string[]>(
    []
  );
  const supabase = createClient();

  const readOrder = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("menuitems").select("*");
    if (data) {
      data.sort((a, b) => a.id - b.id);
    }
    setOrderTableData(data ?? []);
    setLoading(false);
  };
  return (
    <AdminMenuContext.Provider
      value={{
        orderTableData,
        setOrderTableData,
        loading,
        setLoading,
        selectableCategories,
        setSelectableCategories,
        readOrder,
      }}
    >
      {children}
    </AdminMenuContext.Provider>
  );
}

export default function AdminMenuPage() {
  const adminCC = useAdminMenuContext();
  const {
    orderTableData,
    readOrder,
    loading,
    setLoading,
    setSelectableCategories,
  } = adminCC;
  const supabase = createClient();

  const onDeleteClick = async (id: number | string, table: string) => {
    const { error, data } = await supabase
      .from(table)
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      console.log(error.message);
    } else {
      setLoading(true);
      readOrder();
    }
  };
  const onDeleteAllClick = async (table: string) => {
    const supabase = createClient();
    const { error, data } = await supabase.from(table).delete();
    if (error) {
      console.log(error.message);
    } else {
      setLoading(true);
      readOrder();
    }
  };
  

  // Example usage
  useEffect(() => {
    readOrder();
  }, [loading]);

  return (
    <DashboardWrapper>
      <div className="w-[70vw] h-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>เมนู</CardTitle>
            <div className="w-full flex justify-end space-x-4 pt-4">
              <ItemCard
                type={"add"}
                dialogTrigger={
                  <Button className="bg-green-500 text-white">
                    <Plus color="#FFF" />
                    เพิ่มเมนู
                  </Button>
                }
              />
              <DeleteButton name={"เมนู"} onClick={() => {}} />
            </div>
          </CardHeader>
          <CardContent className="px-4 flex justify-center">
            {loading ? (
              <LoaderCircle
                className="animate-spin"
                size={48}
                color="#D3D3D3"
              />
            ) : (
              <DataTable
                columns={handleMenuColumns(onDeleteClick)}
                data={orderTableData}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
