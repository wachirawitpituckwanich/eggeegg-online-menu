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
export default function DashboardMainpage() {
  return (
    <div className="bg-secondary w-screen h-screen text-center align-middle flex flex-col justify-center">
      <h1 className="text-6xl">สวัสดี! {}</h1>
      <div className="w-full flex justify-center py-8 space-x-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{TODAY_SALE}</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="text-lg">
            <p>0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{TODAY_ORDER_NUM}</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="text-lg">
            <p>0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
