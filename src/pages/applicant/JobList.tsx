import ApplicantLayout from "../../components/applicant/ApplicantLayout";
import Card from "../../components/ui/Card";
import { Link } from "react-router-dom";
import { mockJobs } from "../../utils/mockData";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

export default function JobList() {
  const activeJobs = mockJobs.filter((j) => j.status === "active");

  return (
    <ApplicantLayout>
      <h1 className="text-2xl font-semibold mb-8 text-center text-gray-900">
        Available Job Positions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeJobs.map((job) => (
          <Card
            key={job.id}
            className="flex flex-col justify-between hover:shadow-md transition-all duration-200"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{job.department}</p>

              <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                <span className="flex items-center gap-1.5">
                  <IoLocationOutline /> {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <CiCalendarDate /> {job.job_type}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {job.description}
              </p>
            </div>

            <div className="mt-auto flex justify-between items-center">
              <p className="text-green-600 text-sm font-semibold">
                {job.salary_range.display_text}
              </p>
              <Link
                to={`/job/${job.slug}`}
                className="cursor-pointer bg-green-800 text-white py-1.5 rounded-md text-xs px-3 items-center text-center hover:bg-green-600"
              >
                View Details →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </ApplicantLayout>
  );
}
