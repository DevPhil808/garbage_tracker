// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CompanyRegistration from "./pages/CompanyRegistration";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import SupervisorTasks from "./pages/SupervisorTasks";
import SupervisorCollectors from "./pages/SupervisorCollectors";
import AdminDashboard from "./pages/AdminDashboard";
import SupervisorRegistration from "./pages/SupervisorRegistration";
import CollectorRegistration from "./pages/CollectorRegistration";
import CompanyProfile from "./pages/CompanyProfile";
import SupervisorsList from "./pages/SupervisorsList";
import AssignCollectorToRequest from "./pages/AssignCollectorToRequest";
import CollectorListPage from "./pages/CollectorListPage";

// ✅ Import the new approval component
import CollectorApprovalList from "./pages/CollectorApprovalList";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-company" element={<CompanyRegistration />} />
      <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
      <Route path="/supervisor/tasks" element={<SupervisorTasks />} />
      <Route path="/supervisor/collectors" element={<SupervisorCollectors />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route
        path="/supervisor/register/supervisor"
        element={<SupervisorRegistration />}
      />
      <Route
        path="/supervisor/register/collector"
        element={<CollectorRegistration />}
      />
      <Route path="/company/profile" element={<CompanyProfile />} />
      <Route path="/supervisors/list" element={<SupervisorsList />} />
      <Route path="/assign/collector" element={<AssignCollectorToRequest />} />
      <Route path="/collectors/list" element={<CollectorListPage />} />
      <Route path="/collectors/approval" element={<CollectorApprovalList />} />
    </Routes>
  );
};

export default App;
