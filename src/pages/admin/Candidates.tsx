import { useState } from "react";
import { mockCandidates } from "../../utils/mockCandidates";
import TableToolbar from "../../components/TableToolbar";
import CandidateTable from "../../components/CandidateTable";
import AdminLayout from "../../components/admin/AdminLayout";

export default function Candidates() {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = mockCandidates.filter((c) =>
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
        <AdminLayout>
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Candidates</h1>
      </div>
      <TableToolbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CandidateTable data={filtered} />
    </div>
        </AdminLayout>
  );
}
