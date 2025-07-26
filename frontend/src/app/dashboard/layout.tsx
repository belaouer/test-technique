"use client";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import useProtectedRoute from "@/hooks/useProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  useProtectedRoute();

  return (
    <div className="grid grid-cols-12 gap-x-4 h-screen p-4">
      <LeftSidebar />
      <main className="col-span-6 2xl:col-span-8">{children}</main>
      <RightSidebar />
    </div>
  );
}
