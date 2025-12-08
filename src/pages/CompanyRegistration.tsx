import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyRegistration.css";

const logoSrc = "/public/images/logo1.png";

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

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const companyName = (formData.get("companyName") || "").toString().trim();
    const logoUrl = (formData.get("logoUrl") || "").toString().trim();

    if (
      !companyName ||
      !logoUrl ||
      !workingTimeStart ||
      !workingTimeEnd ||
      !priceMin ||
      !priceMax
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
        logo_url: logoUrl,
        working_days: workingDaysObject,
        opening_time: workingTimeStart,
        closing_time: workingTimeEnd,
        price_min: priceMin,
        price_max: priceMax,
      };

      const response = await fetch(
        "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/company/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let message = "Failed to create company";
        try {
          const data = await response.json();
          if (data?.detail) message = data.detail;
          if (data?.message) message = data.message;
        } catch {}
        throw new Error(message);
      }

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
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="licenseNumber">License Number:</label>
                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="companyEmail">Company Email:</label>
                <input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="businessCert">
                  Business Registration Certificate:
                </label>
                <input
                  id="businessCert"
                  name="businessCert"
                  type="file"
                  className="cr-file-input"
                />
              </div>

              <div className="cr-field cr-field-full">
                <label htmlFor="companyAddress">Company Address:</label>
                <input
                  id="companyAddress"
                  name="companyAddress"
                  type="text"
                  required
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
                <label htmlFor="registrationNumber">Registration Number:</label>
                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="licenseExpiry">License Expiry Date:</label>
                <input
                  id="licenseExpiry"
                  name="licenseExpiry"
                  type="date"
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="companyPhone">Company Phone:</label>
                <input
                  id="companyPhone"
                  name="companyPhone"
                  type="tel"
                  required
                />
              </div>

              <div className="cr-field">
                <label htmlFor="wasteLicense">Waste Management License:</label>
                <input
                  id="wasteLicense"
                  name="wasteLicense"
                  type="file"
                  className="cr-file-input"
                />
              </div>

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
                  required
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
                  required
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
