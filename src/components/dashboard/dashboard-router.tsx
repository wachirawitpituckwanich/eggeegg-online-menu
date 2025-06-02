"use client";

import { useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import POSPage from "./pos/pos-page";
import DashboardMainpage from "./mainpage/dashboard-main";
import OrderPage, { AdminOrderProvider } from "./order/order-page";
import AdminMenuPage, { AdminMenuProvider } from "./menu/menu-page";
import SettingsPage from "./settings/settings-page";
import UserPage, { AdminUserProvider } from "./user/user-page";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { AppSidebarData } from "@/interfaces/sidebar";

export default function DashboardRouter({ data } : {data : AppSidebarData}) {
  const ccSidebar = useSidebar()
  const {activePage} = ccSidebar
  useEffect(() => {
  }, [activePage]);
  switch(activePage){
    case '#pos':
      return <POSPage/>
    case '#order':
      return <AdminOrderProvider><OrderPage/></AdminOrderProvider>
    case '#user':
      return <AdminUserProvider><UserPage/></AdminUserProvider>
    case "#menu":
      return <AdminMenuProvider><AdminMenuPage/></AdminMenuProvider>
    case '#settings':
      return <SettingsPage/>
    case '#main':
      return <DashboardMainpage name={data.user.name ?? ''}/>
    default:
      return <DashboardMainpage name={data.user.name ?? ''}/>
  }
}
