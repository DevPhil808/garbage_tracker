import React, { useEffect, useState } from "react";
import "./CompanyProfile.css";

const COMPANY_PROFILE_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/company/profile/";

type CompanyProfileType = {
  id: number;
  username: string;
  phone_number: string;
  email: string;
  profile_photo: string;
  address: string;
  is_verified: boolean;
  company_name: string;
  gst_number: string;
  weighing_system: string;
  working_days: Record<string, boolean>;
  opening_time: string;
  closing_time: string;
  price_min: string | null;
  price_max: string | null;
  incentive_per_100_percent_route: string | null;
  complaint_resolution_sla: number;
  total_producers: number;
  total_collectors: number;
  operational_cities: string[] | Record<string, any>;
};

const CompanyProfile: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<CompanyProfileType>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setError("You must be logged in as a company to view the profile.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(COMPANY_PROFILE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 404) {
            setError("Company profile not found.");
          } else {
            setError("Failed to fetch company profile.");
          }
          setLoading(false);
          return;
        }
        const data = await response.json();
        setProfile(data);
        setEditData(data); // Pre-fill edit form
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditWorkingDay = (day: string) => {
    setEditData((prev) => ({
      ...prev,
      working_days: {
        ...(prev.working_days || profile?.working_days || {}),
        [day]: !(prev.working_days
          ? prev.working_days[day]
          : profile?.working_days[day]),
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("You must be logged in as a company to edit the profile.");
      setSaving(false);
      return;
    }
    try {
      const response = await fetch(COMPANY_PROFILE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editData),
      });
      const data = await response.json();
      if (!response.ok) {
        let message = "Failed to update profile.";
        if (data?.detail) message = data.detail;
        if (data?.message) message = data.message;
        setError(message);
        setSaving(false);
        return;
      }
      setProfile(data);
      setEditMode(false);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="company-profile-loading">Loading...</div>;
  if (error) return <div className="company-profile-error">{error}</div>;
  if (!profile) return null;

  return (
    <div className="company-profile-container">
      <h1>Company Profile</h1>
      <img
        src={profile.profile_photo}
        alt="Company Logo"
        className="company-profile-logo"
        style={{ maxWidth: 120, borderRadius: 8 }}
      />
      {!editMode ? (
        <>
          <h2>{profile.company_name}</h2>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone_number}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <p>
            <strong>GST Number:</strong> {profile.gst_number}
          </p>
          <p>
            <strong>Weighing System:</strong> {profile.weighing_system}
          </p>
          <p>
            <strong>Opening Time:</strong> {profile.opening_time}
          </p>
          <p>
            <strong>Closing Time:</strong> {profile.closing_time}
          </p>
          <p>
            <strong>Complaint Resolution SLA (hours):</strong>{" "}
            {profile.complaint_resolution_sla}
          </p>
          <p>
            <strong>Price Min:</strong> {profile.price_min || "N/A"}
          </p>
          <p>
            <strong>Price Max:</strong> {profile.price_max || "N/A"}
          </p>
          <p>
            <strong>Incentive per 100% Route:</strong>{" "}
            {profile.incentive_per_100_percent_route || "N/A"}
          </p>
          <p>
            <strong>Total Producers:</strong> {profile.total_producers}
          </p>
          <p>
            <strong>Total Collectors:</strong> {profile.total_collectors}
          </p>
          <p>
            <strong>Operational Cities:</strong>{" "}
            {Array.isArray(profile.operational_cities)
              ? profile.operational_cities.join(", ")
              : JSON.stringify(profile.operational_cities)}
          </p>
          <div>
            <strong>Working Days:</strong>
            <ul>
              {profile.working_days &&
                Object.entries(profile.working_days).map(([day, active]) => (
                  <li key={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                    {active ? "Yes" : "No"}
                  </li>
                ))}
            </ul>
          </div>
          <p>
            <strong>Verified:</strong> {profile.is_verified ? "Yes" : "No"}
          </p>
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit Profile
          </button>
        </>
      ) : (
        <div className="company-profile-edit-form">
          <label>
            Company Name:
            <input
              name="company_name"
              value={editData.company_name || ""}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            GST Number:
            <input
              name="gst_number"
              value={editData.gst_number || ""}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Weighing System:
            <input
              name="weighing_system"
              value={editData.weighing_system || ""}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Opening Time:
            <input
              name="opening_time"
              type="time"
              value={editData.opening_time || ""}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Closing Time:
            <input
              name="closing_time"
              type="time"
              value={editData.closing_time || ""}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Complaint Resolution SLA (hours):
            <input
              name="complaint_resolution_sla"
              type="number"
              value={editData.complaint_resolution_sla || ""}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Price Min:
            <input
              name="price_min"
              type="number"
              value={editData.price_min || ""}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Price Max:
            <input
              name="price_max"
              type="number"
              value={editData.price_max || ""}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Incentive per 100% Route:
            <input
              name="incentive_per_100_percent_route"
              type="number"
              value={editData.incentive_per_100_percent_route || ""}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Total Producers:
            <input
              name="total_producers"
              type="number"
              value={editData.total_producers || ""}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Total Collectors:
            <input
              name="total_collectors"
              type="number"
              value={editData.total_collectors || ""}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Operational Cities (comma separated):
            <input
              name="operational_cities"
              value={
                Array.isArray(editData.operational_cities)
                  ? editData.operational_cities.join(", ")
                  : ""
              }
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  operational_cities: e.target.value
                    .split(",")
                    .map((city) => city.trim()),
                }))
              }
            />
          </label>
          <div>
            <strong>Working Days:</strong>
            <ul>
              {Object.keys(profile.working_days).map((day) => (
                <li key={day}>
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        editData.working_days
                          ? editData.working_days[day]
                          : profile.working_days[day]
                      }
                      onChange={() => handleEditWorkingDay(day)}
                    />
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={handleSave}
              className="save-btn"
              disabled={saving}
              type="button"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="cancel-btn"
              type="button"
              style={{ marginLeft: "1rem" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
