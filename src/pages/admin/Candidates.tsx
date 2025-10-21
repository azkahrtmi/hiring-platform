import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { mockCandidates } from "../../utils/mockCandidates";

export default function Candidates() {
  const { jobId } = useParams();

  const jobTitle =
    jobId === "job_001"
      ? "Front End Developer"
      : jobId === "job_002"
        ? "UI/UX Designer"
        : "Unknown Job";

  const filtered = mockCandidates.filter((c) => c.job_id === jobId);

  return (
    <AdminLayout>
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">{jobTitle}</h1>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 w-10">
                  <input type="checkbox" />
                </th>
                <th className="p-3 text-left">NAME</th>
                <th className="p-3 text-left">EMAIL ADDRESS</th>
                <th className="p-3 text-left">PHONE NUMBERS</th>
                <th className="p-3 text-left">DATE OF BIRTH</th>
                <th className="p-3 text-left">DOMICILE</th>
                <th className="p-3 text-left">GENDER</th>
                <th className="p-3 text-left">LINK LINKEDIN</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((cand) => (
                  <tr
                    key={cand.id}
                    className="hover:bg-gray-50 border-gray-200 border-b-1 text-gray-700"
                  >
                    <td className="p-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">{cand.full_name}</td>
                    <td className="p-3">{cand.email}</td>
                    <td className="p-3">{cand.phone}</td>
                    <td className="p-3">{cand.birth_date}</td>
                    <td className="p-3">{cand.domicile}</td>
                    <td className="p-3">{cand.gender}</td>
                    <td className="p-3">
                      <a
                        href={cand.linkedin}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {cand.linkedin}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
