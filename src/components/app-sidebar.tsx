"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppSidebarData } from "@/interfaces/sidebar";
import { adminBar, employeeBar } from "@/constants/bar";

export function AppSidebar({
  data,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  data: AppSidebarData;
}) {
  let barData = null;
  switch (data.user.role) {
    case "admin":
      barData = adminBar;
      break;
    case "employee":
      barData = employeeBar;
      break;
    default:
      barData = employeeBar;
      break;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={barData} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
