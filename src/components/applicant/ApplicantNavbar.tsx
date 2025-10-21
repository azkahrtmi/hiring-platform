import { Link, useLocation } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import { mockJobs } from "../../utils/mockData";
import { FiLogOut } from "react-icons/fi";

export default function ApplicantNavbar() {
  const { pathname } = useLocation();

  // Cek apakah sedang di halaman job detail atau apply
  const jobMatch = pathname.match(/(?:job|apply)\/([\w-]+)/);
  const jobSlug = jobMatch ? jobMatch[1] : null;
  const currentJob = mockJobs.find((job) => job.slug === jobSlug);

  // Tentukan breadcrumb
  const crumbs = [
    { label: "Job Lists", to: "/" },
    ...(currentJob
      ? [{ label: currentJob.title, to: `/job/${currentJob.slug}` }]
      : []),
    ...(pathname.startsWith("/apply/") ? [{ label: "Apply Form" }] : []),
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      {/* Header atas */}
      <div className="flex justify-between items-center px-10 py-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-sm">
            <FaBriefcase className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-gray-900 leading-none">
              Rakamin
            </h1>
            <p className="text-sm text-gray-500 leading-none">
              Applicant Portal
            </p>
          </div>
        </div>
        <button className="flex items-center text-gray-600 hover:text-blue-600 transition cursor-pointer">
          <FiLogOut className="mr-1" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-10 border-t border-gray-100 bg-white text-sm font-medium py-2">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <div key={crumb.label} className="flex items-center">
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className={`${
                    isLast
                      ? "text-blue-700"
                      : "text-gray-600 hover:text-blue-600"
                  } transition`}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-blue-700">{crumb.label}</span>
              )}
              {!isLast && <span className="mx-2 text-gray-400">{">"}</span>}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
