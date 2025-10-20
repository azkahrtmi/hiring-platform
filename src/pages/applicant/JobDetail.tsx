import { useParams, Link } from "react-router-dom";
import { mockJobs } from "../../utils/mockData";
import ApplicantLayout from "../../components/applicant/ApplicantLayout";

export default function JobDetail() {
  const { slug } = useParams();
  const job = mockJobs.find((j) => j.slug === slug);

  if (!job)
    return (
      <div className="p-8 text-center text-gray-600">
        Job not found 😕
      </div>
    );

  return (
        <ApplicantLayout>
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-3">{job.title}</h1>
      <p className="text-gray-500 mb-1">{job.department}</p>
      <p className="text-green-600 font-medium mb-4">{job.salary_range.display_text}</p>

      <p className="text-gray-700 mb-8 leading-relaxed">
        {job.description || "No description provided."}
      </p>

      <Link
        to={`/apply/${job.slug}`}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Apply Now
      </Link>
    </div>
    </ApplicantLayout>
  );
}
