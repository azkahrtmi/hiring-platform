import AdminLayout from "../../components/admin/AdminLayout";
import { mockJobs } from "../../utils/mockData";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function JobList() {
  return (
    <AdminLayout>
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-semibold">Job List</h1>
        <Button variant="primary">+ Create Job</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map((job) => (
          <Card key={job.id}>
            <h2 className="text-lg font-medium mb-1">{job.title}</h2>
            <p className="text-sm text-gray-500">{job.department}</p>
            <p className="text-green-600 text-sm font-semibold mt-2">
              {job.salary_range.display_text}
            </p>
            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                job.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {job.status}
            </span>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
