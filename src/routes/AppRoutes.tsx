import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminJobList from "../pages/admin/JobList";
import CreateJob from "../pages/admin/CreateJob";
import Candidates from "../pages/admin/Candidates";


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/jobs" element={<AdminJobList />} />
        <Route path="/admin/create" element={<CreateJob />} />
        <Route path="/admin/candidates/:jobId" element={<Candidates />} />

      </Routes>
    </Router>
  );
}
