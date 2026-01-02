import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollectorRegistration.css";

const COLLECTOR_API_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/collector/register/";

const CollectorRegistration: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [isPrivateCollector, setIsPrivateCollector] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [assignedAreaZone, setAssignedAreaZone] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [dailyWage, setDailyWage] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all required fields
    if (
      !phoneNumber.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !vehicleNumber.trim() ||
      !vehicleType.trim() ||
      !dailyWage.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("You must log in to register a collector.");
      return;
    }

    const payload: any = {
      phone_number: phoneNumber.trim(),
      password: password,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      vehicle_number: vehicleNumber.trim(),
      vehicle_type: vehicleType.trim(),
      daily_wage_or_incentive_rate: dailyWage.trim(),
      assigned_area_zone: assignedAreaZone.trim(),
      employment_type: employmentType.trim(),
      is_private_collector: isPrivateCollector,
    };
    if (email.trim()) payload.email = email.trim();
    if (company.trim()) payload.company = parseInt(company, 10);
    if (supervisor.trim()) payload.supervisor = supervisor.trim();
    if (bankAccountDetails.trim())
      payload.bank_account_details = bankAccountDetails.trim();

    setIsSubmitting(true);

    try {
      const response = await fetch(COLLECTOR_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        let message = `Failed to register collector (status ${response.status})`;
        if (data) {
          if (data.detail) message = data.detail;
          else if (data.message) message = data.message;
          else if (Array.isArray(data)) message = data.join(", ");
          else if (typeof data === "object") {
            const firstKey = Object.keys(data)[0];
            if (firstKey) {
              const val = data[firstKey];
              message = `${firstKey}: ${
                Array.isArray(val) ? val.join(", ") : val
              }`;
            }
          }
        }
        setError(message);
        return;
      }

      setSuccess("Collector registered successfully!");
      setTimeout(() => setSuccess(null), 3500);

      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setCompany("");
      setSupervisor("");
      setIsPrivateCollector(false);
      setVehicleNumber("");
      setVehicleType("");
      setAssignedAreaZone("");
      setEmploymentType("");
      setDailyWage("");
      setBankAccountDetails("");

      setTimeout(() => {
        navigate("/collectors/list");
      }, 1500); // Give user a moment to see the toast
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="collector-registration-form">
      <h2>Register Collector</h2>
      {success && <div className="success-toast">{success}</div>}
      {error && (
        <div style={{ color: "#dc2626", marginBottom: 12 }}>{error}</div>
      )}

      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
        className="cr-input"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
        className="cr-input"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email (optional)"
        type="email"
        className="cr-input"
      />
      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        required
        className="cr-input"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
        className="cr-input"
      />
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company ID (optional)"
        type="number"
        className="cr-input"
      />
      <input
        value={supervisor}
        onChange={(e) => setSupervisor(e.target.value)}
        placeholder="Supervisor Username/ID (optional)"
        className="cr-input"
      />
      <label className="cr-checkbox-label">
        <input
          type="checkbox"
          checked={isPrivateCollector}
          onChange={(e) => setIsPrivateCollector(e.target.checked)}
        />
        Is Private Collector
      </label>
      <input
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        placeholder="Vehicle Number"
        required
        className="cr-input"
      />
      <input
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        placeholder="Vehicle Type"
        required
        className="cr-input"
      />
      <input
        value={assignedAreaZone}
        onChange={(e) => setAssignedAreaZone(e.target.value)}
        placeholder="Assigned Area Zone"
        className="cr-input"
      />
      <input
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
        placeholder="Employment Type"
        className="cr-input"
      />
      <input
        value={dailyWage}
        onChange={(e) => setDailyWage(e.target.value)}
        placeholder="Daily Wage or Incentive Rate"
        required
        className="cr-input"
      />
      <input
        value={bankAccountDetails}
        onChange={(e) => setBankAccountDetails(e.target.value)}
        placeholder="Bank Account Details (optional)"
        className="cr-input"
      />
      <button type="submit" className="cr-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register Collector"}
      </button>
    </form>
  );
};

export default CollectorRegistration;
