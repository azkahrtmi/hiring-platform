import { Link, useLocation } from "react-router-dom";
import { FaBriefcase, FaUserFriends } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function AdminNavbar() {
  const { pathname } = useLocation();

  const links = [
    {
      to: "/admin/jobs",
      label: "Job Posts",
      icon: <FaBriefcase className="mr-2" />,
    },
    {
      to: "/admin/candidates/1",
      label: "Applicants",
      icon: <FaUserFriends className="mr-2" />,
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-10 py-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-sm">
            <FaBriefcase className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">
              Rakamin
            </h1>
            <p className="text-sm text-gray-500 leading-none">Admin Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition cursor-pointer">
            <FiLogOut className="mr-1" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex gap-8 px-10 border-t border-gray-100 bg-white">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center py-3 text-sm font-medium border-b-2 ${
                isActive
                  ? "text-blue-700 border-blue-700"
                  : "text-gray-600 border-transparent hover:text-blue-600"
              } transition`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
