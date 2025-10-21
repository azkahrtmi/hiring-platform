import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import { defaultApplicantFields } from "../../utils/jobFormConfig";

interface ApplicantFormProps {
  jobTitle: string;
}

export default function ApplicantForm({ jobTitle }: ApplicantFormProps) {
  const config = defaultApplicantFields;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);

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
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Apply {jobTitle} at Rakamin
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            <span className="text-red-500">*</span> Required fields to fill
          </p>
        </div>
      </div>

      {/* Profile Photo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 relative overflow-hidden">
          <img
            src={formData.photo || "/avatar.jpg"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <button
          type="button"
          className="mt-3 flex items-center gap-2 text-sm text-blue-600 font-medium border border-blue-500 rounded-md px-3 py-1.5 hover:bg-blue-50"
        >
          <FiCamera /> Take a Picture
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {config
          .filter((f) => f.state !== "off")
          .map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.state === "mandatory" && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              {/* Gender */}
              {field.key === "gender" ? (
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    />
                    She/her (Female)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    />
                    He/him (Male)
                  </label>
                </div>
              ) : field.key === "birth_date" ? (
                <input
                  type="date"
                  value={formData.birth_date || ""}
                  onChange={(e) => handleChange("birth_date", e.target.value)}
                  className={`border rounded-md px-3 py-2 w-full text-sm ${
                    errorFields.includes(field.key)
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`border rounded-md px-3 py-2 w-full text-sm ${
                    errorFields.includes(field.key)
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={`Enter ${field.label}`}
                />
              )}
            </div>
          ))}

        <button
          type="submit"
          disabled={submitted}
          className={`w-full py-2 rounded-md font-medium transition ${
            submitted
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
        >
          {submitted ? "Submitted ✅" : "Submit"}
        </button>
      </form>

      {/* Alerts */}
      {submitted && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          ✅ Your application has been submitted successfully.
        </div>
      )}
      {errorFields.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          ❌ Please fill all required fields.
        </div>
      )}
    </div>
  );
}
