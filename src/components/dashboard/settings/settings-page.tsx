import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardWrapper from "../dashboard-wrapper";
import { DataTable } from "@/components/data-table";
import { LoaderCircle } from "lucide-react";
import { columns } from "../order/order-columns";
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function SettingsPage() {
  return (
    <DashboardWrapper>
      <div className="w-full h-full px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-left text-2xl">ตั้งค่า</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="px-6 flex flex-col text-left overflow-y-scroll overflow-x-hidden">
            <h1 className="font-bold">เครื่องพิมพ์</h1>
            <div className="flex justify-between align-middle items-center">
              <p>IP ของเครื่องพิมพ์</p>
              <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={6} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
