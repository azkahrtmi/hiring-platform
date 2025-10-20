import { useState } from "react";
import { mockJobs } from "../../utils/mockData";

export default function JobList() {
  const [jobs] = useState(mockJobs);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Job List</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Create Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium">{job.title}</h2>
            <p className="text-sm text-gray-500">{job.department}</p>
            <p className="text-sm text-green-600 font-medium mt-2">
              {job.salary_range.display_text}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                job.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {job.status}
            </span>
            <div className="mt-4">
              <button className="text-blue-600 text-sm hover:underline">
                Manage Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
