import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SupervisorsList.css";
import { apiFetch } from "../services/apiClient"; // centralized fetch

const SUPERVISOR_LIST_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/supervisor/list/";

type Supervisor = {
  username: string;
  phone_number: string;
  company: number;
  company_username: string;
  assigned_areas: string[];
  team_size: number;
  is_active: boolean;
};

const SupervisorsList: React.FC = () => {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchSupervisors = async () => {
    setLoading(true);
    setError(null);

    // ✅ Get logged-in company ID from localStorage
    const companyData = localStorage.getItem("company");
    const companyId = companyData ? JSON.parse(companyData).id : null;

    try {
      const response = await apiFetch(SUPERVISOR_LIST_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        let errText = "";
        try {
          const errData = await response.json();
          errText = errData.detail || "";
        } catch {}
        setError(
          `Failed to fetch supervisors (status ${response.status}) ${
            errText ? "- " + errText : ""
          }`
        );
        return;
      }

      const data: Supervisor[] = await response.json();

      if (!Array.isArray(data)) {
        setError("Unexpected response format from server.");
        return;
      }

      // ✅ Filter supervisors by logged-in company
      const filtered = companyId
        ? data.filter((sup) => sup.company === companyId)
        : data;

      if (filtered.length === 0) {
        setError("No supervisors found for your company.");
        return;
      }

      setSupervisors(filtered);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        "Unable to load supervisors. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisors();

    // ✅ show banner if we came from registration
    if (location.state?.successMessage) {
      setBanner(location.state.successMessage);

      // auto-dismiss after 4 seconds
      const timer = setTimeout(() => setBanner(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (loading) return <div className="loading-spinner"></div>;

  if (error)
    return (
      <div className="error-message">
        {error}
        <button onClick={fetchSupervisors} className="retry-button">
          Retry
        </button>
      </div>
    );

  return (
    <div className="list-card">
      <h1 className="list-title">Supervisors</h1>

      {banner && <div className="success-banner">{banner}</div>}

      <table className="supervisors-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Assigned Areas</th>
            <th>Team Size</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {supervisors.map((sup) => (
            <tr key={sup.username}>
              <td>{sup.username}</td>
              <td>{sup.phone_number}</td>
              <td>{sup.company_username}</td>
              <td>{sup.assigned_areas.join(", ")}</td>
              <td>{sup.team_size}</td>
              <td>{sup.is_active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Return button */}
      <button
        className="dashboard-button"
        onClick={() => navigate("/supervisor/dashboard")}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default SupervisorsList;
