import { useEffect, useState } from "react";
import { handleColumnActions, Order } from "./order-columns";
import { DataTable } from "../../data-table";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LoaderCircle, Trash2 } from "lucide-react";
import DashboardWrapper from "../dashboard-wrapper";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/datatable-button";
import { ORDER } from "@/constants/constant";
export default function OrderPage() {
  const [orderTableData, setOrderTableData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const readOrder = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("order").select("*");

    setOrderTableData(data ?? []);
    setLoading(false);
  };
  const onDeleteClick = async (id: number | string, table :string) => {
    const supabase = createClient();
    const {error, data} = await supabase.from(table).delete().eq("id", id).select();
    if(error){
    }
    else {
      setLoading(true)
      readOrder()
    }
  };
  const onDeleteAllClick = async (table: string) => {
    const supabase = createClient();
    const {error, data} = await supabase.from(table).delete();
    if(error){
    }
    else {
      setLoading(true)
      readOrder()
    }
  }
  useEffect(() => {
    readOrder();
  }, [loading]);

  return (
    <DashboardWrapper>
      <div className="w-full h-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>{ORDER}</CardTitle>
            <DeleteButton name={ORDER} onClick={() => {onDeleteAllClick('order')}} />
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
                columns={handleColumnActions(onDeleteClick)}
                data={orderTableData}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
