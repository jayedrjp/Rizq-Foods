"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { ADMIN_AUTH_KEY, isAdminAuthenticated } from "@/lib/adminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsCheckingAuth(false);
      return;
    }

    if (!isAdminAuthenticated()) {
      router.replace("/admin/login");
      return;
    }

    setIsCheckingAuth(false);
  }, [pathname, router]);

  const handleSignOut = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login") return children;
  if (isCheckingAuth) return null;

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          onMenuClick={() => setMobileOpen(true)}
          onSignOut={handleSignOut}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
