import type { ReactNode } from "react";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="p-8">{children}</main>
    </div>
  );
}
