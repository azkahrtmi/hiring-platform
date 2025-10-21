import { FaBriefcase } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function ApplicantNavbar() {
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
            <p className="text-sm text-gray-500 leading-none">Job Portal</p>
          </div>
        </div>

        <button className="flex items-center text-gray-600 hover:text-blue-600 transition cursor-pointer">
          <FiLogOut className="mr-1" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>

      {/* Bottom Nav (Breadcrumb Style) */}
      <div className="flex items-center gap-2 px-10 border-t border-gray-100 bg-white text-sm font-medium py-2"></div>
    </nav>
  );
}
