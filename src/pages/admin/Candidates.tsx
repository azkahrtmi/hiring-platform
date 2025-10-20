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
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-500">Manage and review job applications</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <TableToolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <CandidateTable data={filtered} />
        </div>
      </div>
    </AdminLayout>
  );
}
