import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardRouter from "@/components/dashboard/dashboard-router";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/app/api/auth/[...nextauth]/route"

export default async function Dashboard() {
  const supabase = await createClient();
  const { data, error, data: {user} } = await supabase.auth.getUser();
  const session = await auth()
  if (error || !data?.user) {
    redirect("/admin/login");
  }

  const sidebarData = {
  user: {
    name: session?.user?.name ?? '',
    email: data?.user?.email ?? '',
    avatar: "https://github.com/shadcn.png",
  },
}
  return (
    <SidebarProvider>
      <AppSidebar data={sidebarData}/>
      <DashboardRouter/>
      <Toaster />
    </SidebarProvider>
  );
}
