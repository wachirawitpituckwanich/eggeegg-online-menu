"use client";

import { useEffect } from "react";
import { useSidebar } from "../ui/sidebar";
import POSPage from "./pos/pos-page";
import DashboardMainpage from "./mainpage/dashboard-main";
import OrderPage from "./order/order-page";
import AdminMenuPage, { AdminMenuProvider } from "./menu/menu-page";
import SettingsPage from "./settings/settings-page";

export default function DashboardRouter() {
  const ccSidebar = useSidebar()
  const {activePage} = ccSidebar
  useEffect(() => {
    
  }, [activePage]);
  switch(activePage){
    case '#pos':
      return <POSPage/>
    case '#order':
      return <OrderPage/>
    case '#user':
      return <div>user</div>
    case "#menu":
      return <AdminMenuProvider><AdminMenuPage/></AdminMenuProvider>
    case '#settings':
      return <SettingsPage/>
    case '#main':
      return <DashboardMainpage/>
    default:
      return <DashboardMainpage/>
  }
}
