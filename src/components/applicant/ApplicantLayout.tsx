import type { ReactNode } from "react";
import ApplicantNavbar from "./ApplicantNavbar";

export default function ApplicantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ApplicantNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
