import AdminLayout from "../../components/admin/AdminLayout";
import { mockJobs } from "../../utils/mockData";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import CreateJob from "./CreateJob";

export default function JobList() {
  const jobs = mockJobs || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="flex justify-between mb-6 items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">Job Posts</h1>
          <span className="text-gray-500">Create and manage job listings</span>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          + Create Job Post
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13h6m-3-3v6m-7 8h14a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium">No job posts available</p>
          <p className="text-sm text-gray-400">
            Create a new job post to start recruiting candidates
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="relative hover:shadow-md transition-shadow duration-200"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center text-center gap-2">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <IoLocationOutline />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CiCalendarDate />
                      {job.job_type}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    title="View"
                    className="p-2 hover:bg-gray-100 rounded-md transition"
                  >
                    <FiEye className="text-gray-600 w-4 h-4 hover:text-blue-600" />
                  </button>
                  <button
                    title="Edit"
                    className="p-2 hover:bg-gray-100 rounded-md transition"
                  >
                    <FiEdit2 className="text-gray-600 w-4 h-4 hover:text-blue-600" />
                  </button>
                  <button
                    title="Delete"
                    className="p-2 hover:bg-gray-100 rounded-md transition"
                  >
                    <FiTrash2 className="text-gray-600 w-4 h-4 hover:text-red-600" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-800 text-justify mb-3 line-clamp-4">
                {job.description}
              </p>

              {/* Salary */}
              <div className="flex justify-between">
                <p className="text-green-600 text-sm font-semibold">
                  {job.salary_range.display_text}
                </p>
                <button className="cursor-pointer bg-green-800 text-white py-1.5 rounded-md text-xs px-3 items-center text-center hover:bg-green-600">
                  Manage Job
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <CreateJob isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AdminLayout>
  );
}
