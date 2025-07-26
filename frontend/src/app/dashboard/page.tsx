import ClientDashboardContent from "@/components/layout/ClientDashboardContent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <ClientDashboardContent />;
}
