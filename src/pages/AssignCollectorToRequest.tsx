import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AssignCollectorToRequest.css";
import { apiFetch } from "../services/apiClient"; // adjust path as needed

const getCompanyId = (): number | null => {
  const companyStorageString = localStorage.getItem("company");
  if (companyStorageString) {
    try {
      const companyData = JSON.parse(companyStorageString);
      return companyData.id || null;
    } catch (e) {
      console.error("Error parsing company data from localStorage:", e);
    }
  }
  return null;
};

const REQUESTS_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/scheduled-requests/list_pending/";
const ASSIGN_URL_BASE =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/scheduled-requests/";

interface ScheduledRequest {
  id: number;
  address_line1: string;
  city: string;
  waste_type: string;
  pickup_date: string;
  pickup_time_slot: string;
}

interface Collector {
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
  is_active: boolean;
}

const AssignCollectorToRequest: React.FC = () => {
  const [requests, setRequests] = useState<ScheduledRequest[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const companyId = getCompanyId();
  const COLLECTORS_URL = companyId
    ? `https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/collector/company/${companyId}/`
    : null;

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!COLLECTORS_URL || !companyId) {
      setError("Error: Could not find company ID for fetching collectors.");
      setLoading(false);
      return;
    }

    try {
      // Requests
      const reqRes = await apiFetch(REQUESTS_URL);
      if (!reqRes.ok) throw new Error("Failed to fetch requests");
      const reqData: ScheduledRequest[] = await reqRes.json();
      setRequests(reqData);

      // Collectors
      const colRes = await apiFetch(COLLECTORS_URL);
      if (!colRes.ok) throw new Error("Failed to fetch collectors");
      const colData: Collector[] = await colRes.json();
      setCollectors(colData);
    } catch (err) {
      console.error("Fetching error:", err);
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setLoading(false);
    }
  }, [COLLECTORS_URL, companyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAssign = async (collectorId: number) => {
    if (!selectedRequest) {
      setError("Please select a request first.");
      return;
    }

    setAssigning(true);
    try {
      const response = await apiFetch(
        `${ASSIGN_URL_BASE}${selectedRequest}/assign/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collector: collectorId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to assign collector.");
        return;
      }

      setSuccess(
        `Request #${selectedRequest} assigned successfully to Collector ID ${collectorId}!`
      );
      setSelectedRequest(null);

      setTimeout(() => setSuccess(null), 4000);
      await fetchData();
    } catch (err) {
      console.error("Assignment error:", err);
      setError(
        err instanceof Error ? err.message : "Network error during assignment."
      );
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="assign-layout">
      <h2 className="page-title">Assign Collector to Scheduled Request</h2>

      {error && <div className="banner error">{error}</div>}
      {success && <div className="banner success">{success}</div>}
      {loading && <div className="loading">Loading data...</div>}

      <div className="panels">
        {/* Requests Panel */}
        <div className="panel requests-panel">
          <h3>Pending Requests</h3>
          {requests.length === 0 ? (
            <p className="empty">No pending requests found.</p>
          ) : (
            requests.map((req) => (
              <div
                key={req.id}
                className={`request-card ${
                  selectedRequest === req.id ? "selected" : ""
                }`}
                onClick={() => setSelectedRequest(req.id)}
              >
                <h4>
                  #{req.id} – {req.city}
                </h4>
                <p>{req.address_line1}</p>
                <p>
                  {req.pickup_date} [{req.pickup_time_slot}]
                </p>
                <p>Waste: {req.waste_type}</p>
              </div>
            ))
          )}
        </div>

        {/* Collectors Panel */}
        <div className="panel collectors-panel">
          <h3>Available Collectors</h3>
          {collectors.length === 0 ? (
            <p className="empty">No collectors found.</p>
          ) : (
            collectors.map((col) => (
              <div key={col.id} className="collector-card">
                <h4>{col.username}</h4>
                <p>{col.phone_number}</p>
                <p>
                  Vehicle: {col.vehicle_number} ({col.vehicle_type})
                </p>
                <p>Zone: {col.assigned_area_zone}</p>
                <p>Rating: {col.average_rating}</p>
                <button
                  onClick={() => handleAssign(col.id)}
                  disabled={!selectedRequest || assigning}
                >
                  {assigning
                    ? "Assigning..."
                    : `Assign to Request #${selectedRequest ?? "?"}`}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        className="dashboard-button"
        onClick={() => navigate("/supervisor/dashboard")}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default AssignCollectorToRequest;
