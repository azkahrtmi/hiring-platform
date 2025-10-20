import { useState } from "react";
import FieldConfigSelector from "../../components/FieldConfigSelector";
import { defaultApplicantFields, type ApplicantField } from "../../utils/jobFormConfig";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

export default function CreateJob() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
    status: "draft",
  });

  const [fields, setFields] = useState<ApplicantField[]>(defaultApplicantFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!jobData.title || !jobData.department || !jobData.salaryMin || !jobData.salaryMax) {
      alert("Please fill in all mandatory fields");
      return;
    }

    console.log("Job Data:", jobData);
    console.log("Applicant Config:", fields);

    alert("Job created successfully (mock mode)");
    navigate("/admin/jobs");
  };

  return (
    <AdminLayout>
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="border rounded-md w-full px-3 py-2"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={jobData.department}
              onChange={handleChange}
              className="border rounded-md w-full px-3 py-2"
              placeholder="e.g. Engineering"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Salary Min (IDR)</label>
            <input
              type="number"
              name="salaryMin"
              value={jobData.salaryMin}
              onChange={handleChange}
              className="border rounded-md w-full px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Salary Max (IDR)</label>
            <input
              type="number"
              name="salaryMax"
              value={jobData.salaryMax}
              onChange={handleChange}
              className="border rounded-md w-full px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="border rounded-md w-full px-3 py-2 h-24"
          />
        </div>

        {/* Field Configuration */}
        <FieldConfigSelector fields={fields} onChange={setFields} />

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Job
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
}
