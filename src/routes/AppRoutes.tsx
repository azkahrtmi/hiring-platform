import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminJobList from "../pages/admin/JobList";
import CreateJob from "../pages/admin/CreateJob";
import Candidates from "../pages/admin/Candidates";
// import ApplicantJobList from "../pages/applicant/JobList";
// import JobDetail from "../pages/applicant/JobDetail";
// import ApplyJob from "../pages/applicant/ApplyJob";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/jobs" element={<AdminJobList />} />
        <Route path="/admin/create" element={<CreateJob />} />
        <Route path="/admin/candidates/:jobId" element={<Candidates />} />

        {/* Applicant Routes */}
        {/* <Route path="/" element={<ApplicantJobList />} />
        <Route path="/job/:slug" element={<JobDetail />} />
        <Route path="/apply/:slug" element={<ApplyJob />} /> */}
      </Routes>
    </Router>
  );
}
