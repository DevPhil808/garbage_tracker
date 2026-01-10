import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyRegistration.css";

const COMPANY_API_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/company/register/";

import logoSrc from "../assets/logo1.png";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CompanyRegistration: React.FC = () => {
  const navigate = useNavigate();

  const [workingPattern, setWorkingPattern] = useState<"all" | "custom">("all");
  const [selectedDays, setSelectedDays] = useState<string[]>([...DAYS_OF_WEEK]);
  const [workingTimeStart, setWorkingTimeStart] = useState("");
  const [workingTimeEnd, setWorkingTimeEnd] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New state for required fields
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [complaintResolutionSla, setComplaintResolutionSla] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [operationalCities, setOperationalCities] = useState<string>("");

  const handleWorkingPatternChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as "all" | "custom";
    setWorkingPattern(value);
    setSelectedDays(value === "all" ? [...DAYS_OF_WEEK] : []);
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (
      !companyName ||
      !logoUrl ||
      !companyPhone ||
      !password ||
      !gstNumber ||
      !complaintResolutionSla ||
      !workingTimeStart ||
      !workingTimeEnd
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const workingDaysObject = DAYS_OF_WEEK.reduce<Record<string, boolean>>(
      (acc, day) => {
        const key = day.toLowerCase();
        acc[key] = workingPattern === "all" ? true : selectedDays.includes(day);
        return acc;
      },
      {}
    );

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        company_name: companyName,
        profile_photo: logoUrl,
        phone_number: companyPhone,
        password: password,
        gst_number: gstNumber,
        complaint_resolution_sla: parseInt(complaintResolutionSla, 10),
        working_days: workingDaysObject,
        opening_time: workingTimeStart,
        closing_time: workingTimeEnd,
        // Optional fields
        email: companyEmail,
        address: companyAddress,
        operational_cities: operationalCities
          ? operationalCities.split(",").map((city) => city.trim())
          : [],
        price_min: priceMin,
        price_max: priceMax,
      };

      const response = await fetch(COMPANY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        let message = "Failed to create company";
        if (data?.detail) message = data.detail;
        if (data?.message) message = data.message;
        // Show first field error if available
        if (typeof data === "object" && !message) {
          const firstKey = Object.keys(data)[0];
          if (firstKey) message = `${firstKey}: ${data[firstKey]}`;
        }
        setError(message);
        return;
      }

      // Store tokens if returned by backend
      if (data.tokens && data.tokens.access && data.tokens.refresh) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("refresh_token", data.tokens.refresh);
      }
      // Optionally store company/user info if returned
      if (data.company) {
        localStorage.setItem("company", JSON.stringify(data.company));
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirect to dashboard
      navigate("/supervisor/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToHome = () => navigate("/");

  return (
    <div className="company-registration-page">
      <div className="company-registration-card">
        <div className="cr-top">
          <div className="cr-line" />
          <div
            className="cr-logo-wrapper"
            onClick={goToHome}
            style={{ cursor: "pointer" }}
          >
            <img src={logoSrc} alt="Borla Tracker logo" className="cr-logo" />
          </div>
          <div className="cr-line" />
        </div>

        <h1 className="cr-title">Company Registration</h1>

        <form className="cr-form" onSubmit={handleSubmit}>
          <h2 className="cr-section-title">Company Information Section</h2>

          <div className="cr-grid">
            <div className="cr-column">
              <div className="cr-field">
                <label htmlFor="companyName">Company Name:</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="logoUrl">Logo URL:</label>
                <input
                  id="logoUrl"
                  name="logoUrl"
                  type="text"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="companyPhone">Company Phone:</label>
                <input
                  id="companyPhone"
                  name="companyPhone"
                  type="tel"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="gstNumber">GST Number:</label>
                <input
                  id="gstNumber"
                  name="gstNumber"
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="complaintResolutionSla">
                  Complaint Resolution SLA (hours):
                </label>
                <input
                  id="complaintResolutionSla"
                  name="complaintResolutionSla"
                  type="number"
                  min="1"
                  value={complaintResolutionSla}
                  onChange={(e) => setComplaintResolutionSla(e.target.value)}
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="companyEmail">Company Email:</label>
                <input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
              </div>

              <div className="cr-field cr-field-full">
                <label htmlFor="companyAddress">Company Address:</label>
                <input
                  id="companyAddress"
                  name="companyAddress"
                  type="text"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>

              <div className="cr-field cr-field-full">
                <label htmlFor="operationalCities">
                  Operational Cities (comma separated):
                </label>
                <input
                  id="operationalCities"
                  name="operationalCities"
                  type="text"
                  placeholder="Accra, Kumasi"
                  value={operationalCities}
                  onChange={(e) => setOperationalCities(e.target.value)}
                />
              </div>

              <div className="cr-field cr-field-full">
                <label htmlFor="workingPattern">Company Working Days:</label>
                <select
                  id="workingPattern"
                  name="workingPattern"
                  value={workingPattern}
                  onChange={handleWorkingPatternChange}
                  className="cr-select"
                  required
                >
                  <option value="all">All days (Monday – Sunday)</option>
                  <option value="custom">Select specific days</option>
                </select>

                {workingPattern === "custom" && (
                  <div className="cr-days-checkboxes">
                    {DAYS_OF_WEEK.map((day) => (
                      <label key={day} className="cr-day-option">
                        <input
                          type="checkbox"
                          checked={selectedDays.includes(day)}
                          onChange={() => handleDayToggle(day)}
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="cr-column">
              <div className="cr-field">
                <label>Working Time:</label>
                <div className="cr-time-range">
                  <input
                    id="workingTimeStart"
                    name="workingTimeStart"
                    type="time"
                    value={workingTimeStart}
                    onChange={(e) => setWorkingTimeStart(e.target.value)}
                    required
                  />
                  <span className="cr-time-separator">to</span>
                  <input
                    id="workingTimeEnd"
                    name="workingTimeEnd"
                    type="time"
                    value={workingTimeEnd}
                    onChange={(e) => setWorkingTimeEnd(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="cr-field">
                <label htmlFor="priceMin">Price Min (GHS):</label>
                <input
                  id="priceMin"
                  name="priceMin"
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
              </div>

              <div className="cr-field">
                <label htmlFor="priceMax">Price Max (GHS):</label>
                <input
                  id="priceMax"
                  name="priceMax"
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <p
              style={{
                marginTop: "12px",
                color: "#dc2626",
                fontSize: "0.85rem",
              }}
            >
              {error}
            </p>
          )}

          <div className="cr-actions">
            <button
              type="submit"
              className="cr-continue-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;
