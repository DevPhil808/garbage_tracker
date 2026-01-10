import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SupervisorRegistration.css";

const SUPERVISOR_CREATE_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/supervisor/create/";

import logoSrc from "../assets/logo1.png";

const SupervisorRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    company: "",
    email: "",
    assigned_areas: "",
    team_size: "",
    photo_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("You must be logged in as a company to register a supervisor.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(SUPERVISOR_CREATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          phone_number: formData.phone_number,
          password: formData.password,
          company: formData.company,
          email: formData.email || undefined,
          assigned_areas: formData.assigned_areas
            ? formData.assigned_areas.split(",").map((a) => a.trim())
            : [],
          team_size: formData.team_size
            ? parseInt(formData.team_size, 10)
            : undefined,
          photo_url: formData.photo_url || logoSrc,
        }),
      });

      if (!response.ok) {
        let errText = "";
        try {
          const errData = await response.json();
          errText = errData.detail || "";
        } catch {}
        setError(
          `Failed to register supervisor (status ${response.status}) ${
            errText ? "- " + errText : ""
          }`
        );
        return;
      }

      const data = await response.json();

      navigate("/supervisors/list", {
        state: {
          successMessage: `Supervisor ${data.username} registered successfully!`,
        },
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        "Unable to register supervisor. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-card">
      {/* ✅ Project Logo at the top */}
      <div className="registration-logo-wrapper">
        <img
          src={logoSrc}
          alt="Borla Tracker logo"
          className="registration-logo"
        />
      </div>

      <h1 className="registration-title">Register Supervisor</h1>

      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Username"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="assigned_areas"
          placeholder="Assigned Areas (comma separated)"
          value={formData.assigned_areas}
          onChange={handleChange}
        />
        <input
          type="number"
          name="team_size"
          placeholder="Team Size"
          value={formData.team_size}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo_url"
          placeholder="Photo URL (optional)"
          value={formData.photo_url}
          onChange={handleChange}
        />

        <div className="registration-photo-preview">
          <img
            src={formData.photo_url || logoSrc}
            alt="Supervisor preview"
            className="registration-photo-img"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="registration-button"
        >
          {loading ? "Registering..." : "Register Supervisor"}
        </button>
      </form>

      {error && <div className="registration-error">{error}</div>}
    </div>
  );
};

export default SupervisorRegistration;
