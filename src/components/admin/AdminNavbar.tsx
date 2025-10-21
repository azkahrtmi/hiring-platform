import { Link, useLocation } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { mockJobs } from "../../utils/mockData";

export default function AdminNavbar() {
  const { pathname } = useLocation();

  const match = pathname.match(/\/admin\/manage\/(job_\d+)/);
  const currentJobId = match ? match[1] : null;
  const currentJob = mockJobs.find((job) => job.id === currentJobId);

  const links = [
    {
      to: "/admin/jobs",
      label: "Job Posts",
      icon: <FaBriefcase className="mr-2" />,
    },
    ...(currentJob
      ? [
          {
            to: `/admin/manage/${currentJob.id}`,
            label: currentJob.title,
          },
        ]
      : []),
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      {/* Top Section */}
      <div className="flex justify-between items-center px-10 py-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-sm">
            <FaBriefcase className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-gray-900 leading-none">
              Rakamin
            </h1>
            <p className="text-sm text-gray-500 leading-none">Admin Portal</p>
          </div>
        </div>

        <button className="flex items-center text-gray-600 hover:text-blue-600 transition cursor-pointer">
          <FiLogOut className="mr-1" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>

      {/* Bottom Nav (Breadcrumb Style) */}
      <div className="flex items-center gap-2 px-10 border-t border-gray-100 bg-white text-sm font-medium py-2">
        {links.map((link, index) => {
          const isActive = pathname.startsWith(link.to);
          const isLast = index === links.length - 1;

          return (
            <div key={link.to} className="flex items-center">
              <Link
                to={link.to}
                className={`flex items-center transition ${
                  isActive
                    ? "text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>

              {!isLast && <span className="mx-2 text-gray-400">{">"}</span>}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
