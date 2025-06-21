import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TODAY_SALE, TODAY_ORDER_NUM } from "@/constants/constant";
import { Separator } from "../../ui/separator";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function DashboardMainpage({name} : {name : string}) {
  const [todaySales, setTodaySales] = useState(0)
  const [todayOrderNum, setTodayOrderNum] = useState(0)
  
  const fetchOrderDetails = async () => {
      const supabase = createClient();
      const today = new Date().toISOString().slice(0, 10)
      const { data: salesData, error : salesError } = await supabase
          .from("order")
          .select("price", { count: 'exact' })
          .gte('created_at', `${today}T00:00:00.000Z`) 
          .lt('created_at', `${today}T23:59:59.999Z`); 
      if (salesError) {
          toast.error(`Error fetching data: ${salesError.message}`);
      } else {
         setTodayOrderNum(salesData.length)
         setTodaySales(salesData.reduce((sum, product) => sum + product.price, 0))
      }
  }
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className="bg-secondary w-screen h-screen text-center align-middle flex flex-col justify-center">
      <h1 className="text-6xl">สวัสดี {name ?? ''}!</h1>
      <div className="w-full flex justify-center py-8 space-x-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{TODAY_SALE}</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="text-lg">
            <p>{todaySales} ฿</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{TODAY_ORDER_NUM}</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="text-lg">
            <p>{todayOrderNum}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
