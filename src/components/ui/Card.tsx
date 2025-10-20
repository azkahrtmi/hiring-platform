import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="bg-white border rounded-xl shadow-sm p-5">{children}</div>;
}
