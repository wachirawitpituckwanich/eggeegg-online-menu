import { Bot, Settings2, House, UtensilsCrossed, User2, SquareMenu } from "lucide-react";


const baseBar = [
  {
    title: "หน้าหลัก",
    url: "#main",
    icon: House,
    isActive: true,
  },
  {
    title: "สั่งอาหาร",
    url: "#pos",
    icon: UtensilsCrossed,
    isActive: true,
  },
  {
    title: "ออเดอร์",
    url: "#order",
    icon: Bot,
    isActive: true,
  },
  {
    title: "เมนู",
    url: "#menu",
    icon: SquareMenu,
    isActive: true,
  },
  {
    title: "ตั้งค่า",
    url: "#settings",
    icon: Settings2,
  },
];

export const adminBar = [
  ...baseBar,
  {
    title: "ผู้ใช้งาน",
    url: "#user",
    icon: User2,
    isActive: true,
  }
];

export const employeeBar = [...baseBar];
