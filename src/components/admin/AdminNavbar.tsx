import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/admin/jobs", label: "Jobs" },
    { to: "/admin/create", label: "Create Job" },
    { to: "/admin/candidates/1", label: "Candidates" },
  ];

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold tracking-wide">Hiring Admin</h1>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:text-blue-400 transition ${
              pathname.startsWith(link.to) ? "text-blue-400" : "text-gray-300"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
