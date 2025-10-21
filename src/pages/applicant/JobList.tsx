import ApplicantLayout from "../../components/applicant/ApplicantLayout";
import Card from "../../components/ui/Card";
import { Link } from "react-router-dom";
import { mockJobs } from "../../utils/mockData";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

export default function JobList() {
  const activeJobs = mockJobs.filter((j) => j.status === "active");

  return (
    <ApplicantLayout>
      <div className="px-6 md:px-10">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Available Jobs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeJobs.map((job) => (
            <Card
              key={job.id}
              className="p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              {/* Job Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-500">{job.department}</p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <IoLocationOutline className="text-gray-500" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CiCalendarDate className="text-gray-500" />
                    {job.job_type}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mt-3 line-clamp-3 text-justify">
                  {job.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-green-700 text-sm font-semibold">
                    {job.salary_range.display_text}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Job started: {job.job_started}
                  </p>
                </div>

                <Link
                  to={`/job/${job.slug}`}
                  className="bg-green-800 text-white py-1.5 px-3 rounded-md text-xs font-medium hover:bg-green-700 transition"
                >
                  View Details →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ApplicantLayout>
  );
}
