import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardWrapper from "../dashboard-wrapper";
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function SettingsPage() {
  return (
    <DashboardWrapper>
      <div className="w-full h-full px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-left text-2xl">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                ตั้งค่า
              </h3>
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="px-6 flex flex-col text-left overflow-y-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h4 className="scroll-m-20 text-lg tracking-tight">
                    เครื่องพิมพ์
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="flex justify-between items-center align-middle">
                  <h1>IP ของเครื่องพิมพ์</h1>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
