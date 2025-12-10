import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CompanyRegistration from "./pages/CompanyRegistration";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import SupervisorTasks from "./pages/SupervisorTasks";
import SupervisorCollectors from "./pages/SupervisorCollectors";
import AdminDashboard from "./pages/AdminDashboard";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-company" element={<CompanyRegistration />} />
        <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
        <Route path="/supervisor/tasks" element={<SupervisorTasks />} />
        <Route
          path="/supervisor/collectors"
          element={<SupervisorCollectors />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
