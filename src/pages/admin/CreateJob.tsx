import { useState } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateJob({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    requirement: "",
    candidates: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [profileConfig, setProfileConfig] = useState([
    { label: "Full name", value: "mandatory" },
    { label: "Photo Profile", value: "mandatory" },
    { label: "Gender", value: "mandatory" },
    { label: "Domicile", value: "mandatory" },
    { label: "Email", value: "mandatory" },
    { label: "Phone number", value: "mandatory" },
    { label: "LinkedIn link", value: "mandatory" },
    { label: "Date of birth", value: "mandatory" },
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const allFilled = Object.values(form).every((val) => val.trim() !== "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Create Job</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-4 space-y-4 border-b border-gray-200">
          {/* Job Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Ex. Front End Engineer"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Select job type</option>
              <option value="fulltime">Full-time</option>
              <option value="contract">Contract</option>
              <option value="parttime">Part-time</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Ex."
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Requirement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirement <span className="text-red-500">*</span>
            </label>
            <textarea
              name="requirement"
              placeholder="Ex."
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.requirement}
              onChange={handleChange}
            />
          </div>

          {/* Number of candidates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Candidates Needed{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              name="candidates"
              type="number"
              placeholder="Ex. 2"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.candidates}
              onChange={handleChange}
            />
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Salary <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="salaryMin"
                type="number"
                placeholder="Minimum Estimated Salary"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.salaryMin}
                onChange={handleChange}
              />
              <input
                name="salaryMax"
                type="number"
                placeholder="Maximum Estimated Salary"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.salaryMax}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Minimum Profile Info */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Profile Information Required
            </label>
            <div className="space-y-2">
              {profileConfig.map((field, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border border-gray-200 rounded-md px-4 py-2"
                >
                  <span>{field.label}</span>
                  <div className="flex gap-2">
                    {["Mandatory", "Optional", "Off"].map((option) => {
                      const isActive = field.value === option.toLowerCase();
                      const isAlwaysMandatory = [
                        "Full name",
                        "Photo Profile",
                        "Email",
                      ].includes(field.label);
                      const isDisabled =
                        isAlwaysMandatory && option !== "Mandatory";

                      return (
                        <button
                          key={option}
                          disabled={isDisabled}
                          className={`px-3 py-1 text-sm rounded-full border transition ${
                            isActive
                              ? "border-blue-500 text-blue-600"
                              : "border-gray-200 text-gray-400"
                          } ${
                            isDisabled ? "opacity-40 cursor-not-allowed" : ""
                          }`}
                          onClick={() => {
                            if (isDisabled) return;
                            const updated = [...profileConfig];
                            updated[idx].value = option.toLowerCase();
                            setProfileConfig(updated);
                          }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4">
          <button
            disabled={!allFilled}
            className={`px-5 py-2 rounded-md text-white font-medium transition ${
              allFilled
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );
}
