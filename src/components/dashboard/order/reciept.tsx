import React from "react";
import { ReceiptText, Calendar, Clock } from "lucide-react";
import Order from "@/interfaces/order";

interface ReceiptProps {
  restaurantName?: string;
  address?: string;
  phone?: string;
  orderNumber: number | string;
  table: number | string;
  order: Order[];
  createdAt: string | Date;
}

const ReceiptComponent: React.FC<ReceiptProps> = ({
  restaurantName = "EGG-E-EGG",
  address = "2920 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000",
  phone = "089-629-9798",
  order,
  orderNumber,
  table,
  createdAt,
}) => {
  const DottedLine = () => (
    <div className="text-center my-2 font-mono text-xs">{"- ".repeat(20)}</div>
  );
  // Assume the order has a createdAt field in the given format
  const dt = new Date(createdAt);
  // Format date as YYYY-MM-DD
  const date = dt.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // Format time as HH:mm
  const time = dt.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const totalPrice = (item : Order[]) => {
    return parseFloat(
    item.reduce((total, item) => {
        const addonsTotal = item.addons
          ? item.addons.reduce((addonSum, addon) => addonSum + (addon.price || 0), 0)
          : 0;
        return total + (item.price * item.quantity) + addonsTotal;
      }, 0)
      .toFixed(2)
  );
  }
  return (
    <div className="bg-white max-w-sm mx-auto shadow-lg border border-gray-200">
      {/* Receipt Paper Effect */}
      <div className="bg-white p-4 font-mono text-xs leading-tight text-black">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <ReceiptText className="w-6 h-6" />
          </div>
          <div className="font-bold text-sm mb-1">{restaurantName}</div>
          <div className="text-xs">{address}</div>
          <div className="text-xs">{phone}</div>
        </div>

        <DottedLine />

        {/* Order Info */}
        <div className="mb-3 space-y-1">
          <div className="flex justify-between">
            <span>ออเดอร์หมายเลข:</span>
            <span>{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>โต๊ะที่:</span>
            <span>{table}</span>
          </div>
          <div className="flex justify-between">
            <span>ชื่อพนักงาน:</span>
            <span>{"test"}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{time}</span>
            </div>
          </div>
        </div>

        <DottedLine />

        {/* Items */}
        <div className="mb-3">
          {order.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <span className="flex-1">{item.name}</span>
                {item.quantity} x {item.price}
              </div>
              <div className="text-xs text-gray-600 ml-2 flex flex-col">
                {item.addons?.map((aditem, index) => (
                  <div className="flex justify-between">
                    <span className="ml-2" key={`addon-${index}`}>{aditem.name}</span>
                    <span className="ml-2" key={`addon-price-${index}`}>{aditem.price}</span>
                  </div>
                ))}
                {item.extra_request == '' ? null : <span className="ml-2">{"โน๊ตถึงร้าน : " + item.extra_request}</span>}
              </div>
            </div>
          ))}
        </div>

        <DottedLine />

        {/* Totals */}
        <div className="mb-3 space-y-1">
          <div className="flex justify-between font-bold text-sm border-t border-dashed border-gray-400 pt-1">
            <span>รวมทั้งหมด:</span>
            <span>{totalPrice(order)}</span>
          </div>
        </div>

        <DottedLine />
        <div className="text-center text-xs mt-4 space-y-1">
          <div>ขอบคุณที่ใช้บริการ</div>
        </div>

        <div className="text-center mt-4">
          <div className="inline-block">{"▼ ".repeat(15)}</div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptComponent;
