import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardRouter from "@/components/dashboard/dashboard-router";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { AppSidebarData } from "@/interfaces/sidebar";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data,
    error,
    data: { user },
  } = await supabase.auth.getUser();
  const session = await auth();
  if (error || !data?.user) {
    redirect("/admin/login");
  }
  const { data: roleData, error: roleError } = await supabase
    .schema("next_auth")
    .from("users")
    .select("name, email, image, role")
    .eq("email", data.user.email)
    .single();
  const sidebarData: AppSidebarData = {
    user: {
      name: roleData?.name ?? "",
      email: roleData?.email ?? "",
      avatar: roleData?.image,
      role: roleData?.role ?? 'employee', 
    },
  };
  return (
    <SidebarProvider>
      <AppSidebar data={sidebarData} />
      <DashboardRouter data={sidebarData} />
      <Toaster position="top-right"/>
    </SidebarProvider>
  );
}
