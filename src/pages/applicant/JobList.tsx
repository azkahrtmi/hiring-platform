import ApplicantLayout from "../../components/applicant/ApplicantLayout";
import Card from "../../components/ui/Card";
import { Link } from "react-router-dom";
import { mockJobs } from "../../utils/mockData";

export default function JobList() {
  const activeJobs = mockJobs.filter((j) => j.status === "active");

  return (
    <ApplicantLayout>
      <h1 className="text-2xl font-semibold mb-6 text-center">Available Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeJobs.map((job) => (
          <Card key={job.id}>
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-500">{job.department}</p>
            <p className="text-green-600 text-sm font-semibold mt-2">
              {job.salary_range.display_text}
            </p>
            <Link
              to={`/job/${job.slug}`}
              className="text-blue-600 hover:underline text-sm mt-3 block"
            >
              View Details →
            </Link>
          </Card>
        ))}
      </div>
    </ApplicantLayout>
  );
}
