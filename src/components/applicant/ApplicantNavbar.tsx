import { Link, useLocation } from "react-router-dom";

export default function ApplicantNavbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-700">Career Portal</h1>
      <div className="flex gap-6">
        <Link
          to="/"
          className={`font-medium ${
            pathname === "/" ? "text-blue-700" : "text-gray-600 hover:text-blue-700"
          }`}
        >
          Jobs
        </Link>
      </div>
    </nav>
  );
}
