import { useParams } from "react-router-dom";
import { mockJobs } from "../../utils/mockData";
import ApplicantLayout from "../../components/applicant/ApplicantLayout";
import ApplicantForm from "../../components/applicant/ApplicantForm";

export default function ApplyJob() {
  const { slug } = useParams();
  const job = mockJobs.find((j) => j.slug === slug);

  if (!job)
    return (
      <div className="p-8 text-center text-gray-600">Job not found 😕</div>
    );

  return (
    <ApplicantLayout>
      <ApplicantForm jobTitle={job.title} />
    </ApplicantLayout>
  );
}
