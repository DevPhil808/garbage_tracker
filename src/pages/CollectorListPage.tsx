import React, { useState, useEffect } from "react";
import "./CollectorListPage.css";

interface Collector {
  username: string;
  phone_number: string;
  company_name: string;
  is_private_collector: boolean;
  vehicle_number: string;
  vehicle_type: string;
  assigned_area_zone: string;
  daily_wage_or_incentive_rate: string;
  average_rating?: string;
  total_collections?: number;
  is_active: boolean;
}

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

const CollectorListPage: React.FC = () => {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const companyId = getCompanyId();
  const accessToken = localStorage.getItem("access_token");

  const COLLECTORS_URL = companyId
    ? `https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/collector/company/${companyId}/`
    : "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/collector/";

  useEffect(() => {
    const fetchCollectors = async () => {
      setLoading(true);
      setError(null);

      if (!accessToken) {
        setError(
          "Authentication Error: Access token is missing. Please log in."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(COLLECTORS_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          setError(
            `Failed to fetch collectors: ${response.status} ${response.statusText}`
          );
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCollectors(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown network error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCollectors();
  }, [COLLECTORS_URL, accessToken]);

  return (
    <div className="collector-list-container">
      <div className="list-header">
        <h1>Collectors</h1>
      </div>
      {loading && (
        <div className="status-message loading">Loading collectors...</div>
      )}
      {error && <div className="status-message error">{error}</div>}
      {!loading && !error && collectors.length === 0 && (
        <div className="status-message info">No collectors found.</div>
      )}
      {!loading && !error && collectors.length > 0 && (
        <table className="ad-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Location</th>
              <th>Zone</th>
              <th>Status</th>
              <th>Completed Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {collectors.map((c, idx) => {
              const [location, zone] = c.assigned_area_zone
                ? c.assigned_area_zone.split(" ")
                : ["", ""];
              return (
                <tr key={c.username + idx}>
                  <td>{c.username}</td>
                  <td>{c.phone_number}</td>
                  <td>{c.company_name}</td>
                  <td>{location}</td>
                  <td>{zone}</td>
                  <td>{c.is_active ? "Available" : "Offline"}</td>
                  <td>{c.total_collections ?? "-"}</td>
                  <td>
                    <button className="ad-action-link">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CollectorListPage;
