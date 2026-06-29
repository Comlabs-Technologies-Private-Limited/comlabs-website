import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminProvider } from "@/components/admin/admin-store";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <AdminProvider>
        <AdminLayout>{children}</AdminLayout>
      </AdminProvider>
    </SessionProvider>
  );
}
