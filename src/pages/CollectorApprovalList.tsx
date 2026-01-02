import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollectorApprovalList.css";
import { apiFetch } from "../services/apiClient"; // centralized fetch

const COLLECTORS_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/collector/list/";

type Collector = {
  id: number;
  username: string;
  phone_number: string;
  company_name: string;
  is_private_collector: boolean;
  vehicle_number: string;
  vehicle_type: string;
  assigned_area_zone: string;
  daily_wage_or_incentive_rate: string;
  average_rating: string;
  total_collections: number;
  is_active: boolean; // ✅ use this instead of status
};

const CollectorApprovalList: React.FC = () => {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchCollectors = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(COLLECTORS_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.detail || "Failed to fetch collectors");
        return;
      }

      const data: Collector[] = await response.json().catch(() => []);

      console.log("Raw collector data:", data); // ✅ debug log

      if (!Array.isArray(data)) {
        setError("Unexpected response format from server.");
        return;
      }

      // ✅ Filter only inactive collectors (pending approval)
      const pending = data.filter((col) => col.is_active === false);

      if (pending.length === 0) {
        setError("No collectors pending approval.");
        return;
      }

      setCollectors(pending);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load collectors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (
    collectorId: number,
    action: "approve" | "reject"
  ) => {
    try {
      const response = await apiFetch(
        `https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/collector/${collectorId}/approval/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Approval failed");
        return;
      }

      setBanner(`Collector ${collectorId} ${action}d successfully!`);
      setTimeout(() => setBanner(null), 4000);

      // Refresh list
      fetchCollectors();
    } catch (err) {
      console.error("Approval error:", err);
      setError("Unable to update collector status.");
    }
  };

  useEffect(() => {
    fetchCollectors();
  }, []);

  if (loading) return <div className="loading-spinner"></div>;

  if (error)
    return (
      <div className="error-message">
        {error}
        <button onClick={fetchCollectors} className="retry-button">
          Retry
        </button>
      </div>
    );

  return (
    <div className="list-card">
      <h1 className="list-title">Pending Collector Approvals</h1>

      {banner && <div className="success-banner">{banner}</div>}

      <table className="collectors-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Vehicle</th>
            <th>Zone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collectors.map((col) => (
            <tr key={col.id}>
              <td>{col.username}</td>
              <td>{col.phone_number}</td>
              <td>{col.company_name}</td>
              <td>
                {col.vehicle_number} ({col.vehicle_type})
              </td>
              <td>{col.assigned_area_zone}</td>
              <td>
                <button
                  className="approve-button"
                  onClick={() => handleApproval(col.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleApproval(col.id, "reject")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="dashboard-button"
        onClick={() => navigate("/supervisor/dashboard")}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default CollectorApprovalList;
