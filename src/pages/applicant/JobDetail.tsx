import { useParams, Link } from "react-router-dom";
import { mockJobs } from "../../utils/mockData";
import ApplicantLayout from "../../components/applicant/ApplicantLayout";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

export default function JobDetail() {
  const { slug } = useParams();
  const job = mockJobs.find((j) => j.slug === slug);

  if (!job)
    return (
      <ApplicantLayout>
        <div className="p-8 text-center text-gray-600">Job not found 😕</div>
      </ApplicantLayout>
    );

  return (
    <ApplicantLayout>
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-sm rounded-xl border border-gray-100">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h1>
          <p className="text-gray-500">{job.department}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <IoLocationOutline /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CiCalendarDate /> {job.job_type}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            <strong>Job Description:</strong> <br />
            {job.description}
          </p>

          <p>
            <strong>Requirements:</strong> <br />
            {job.requirement}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <p>
              <strong>Experience Level:</strong> {job.experience_level}
            </p>
            <p>
              <strong>Education:</strong> {job.education}
            </p>
            <p>
              <strong>Start Date:</strong> {job.job_started}
            </p>
            <p>
              <strong>Posted On:</strong> {job.posted_date}
            </p>
            <p>
              <strong>Closing Date:</strong> {job.closing_date}
            </p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-green-700 text-lg">
              {job.salary_range.display_text}
            </p>
          </div>

          {job.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8">
          <Link
            to={`/apply/${job.slug}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </ApplicantLayout>
  );
}
