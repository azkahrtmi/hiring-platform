import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockJobs } from "../../utils/mockData";
import { defaultApplicantFields } from "../../utils/jobFormConfig";
import ApplicantLayout from "../../components/applicant/ApplicantLayout";

export default function ApplyJob() {
  const { slug } = useParams();
  const job = mockJobs.find((j) => j.slug === slug);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  // Simulasikan konfigurasi dari backend (sementara gunakan defaultApplicantFields)
  const config = defaultApplicantFields;

  if (!job)
    return (
      <div className="p-8 text-center text-gray-600">
        Job not found 😕
      </div>
    );

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const missing = config
      .filter((f) => f.state === "mandatory")
      .filter((f) => !formData[f.key]?.trim())
      .map((f) => f.key);

    if (missing.length > 0) {
      setErrorFields(missing);
      setSubmitted(false);
      return;
    }

    setErrorFields([]);
    setSubmitted(true);
    console.log("Submitted Application:", formData);
  };

  return (
    <ApplicantLayout>
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Apply for {job.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {config
          .filter((f) => f.state !== "off")
          .map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
                {field.state === "mandatory" && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <input
                type="text"
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={`border rounded-md px-3 py-2 w-full ${
                  errorFields.includes(field.key)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          ✅ Your application has been submitted successfully.
        </div>
      )}

      {errorFields.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          ❌ Please fill all required fields.
        </div>
      )}
    </div>
    </ApplicantLayout>
  );
}
