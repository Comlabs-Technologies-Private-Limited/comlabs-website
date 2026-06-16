import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminProvider } from "@/components/admin/admin-store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminProvider>
  );
}
