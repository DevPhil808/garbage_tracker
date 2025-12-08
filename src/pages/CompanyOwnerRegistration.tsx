import React, { type FormEvent, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyOwnerRegistration.css";

const logoSrc = "/public/images/logo1.png";

type FormState = {
  firstName: string;
  lastName: string;
  ownerId: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  ownerId: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const CompanyOwnerRegistration: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/company/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            id: form.ownerId,
            phoneNumber: form.phoneNumber,
            password: form.password,
          }),
        }
      );

      if (!response.ok) {
        let message = "Failed to register user";
        try {
          const data = await response.json();
          if (data && typeof data.message === "string") {
            message = data.message;
          }
        } catch {}
        throw new Error(message);
      }

      // on success, go to dashboard
      navigate("/supervisor/dashboard");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="co-page">
      <div className="co-card">
        <div className="co-logo-area">
          <img src={logoSrc} alt="Borla Tracker logo" className="co-logo" />
          <span className="co-logo-text"></span>
        </div>

        <h1 className="co-title">Company Registration</h1>

        <form className="co-form" onSubmit={handleSubmit}>
          <h2 className="co-section-title">Account Owner Section</h2>

          <div className="co-grid">
            {/* left column */}
            <div className="co-column">
              <div className="co-field">
                <label htmlFor="firstName">First Name:</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="co-field">
                <label htmlFor="ownerId">ID:</label>
                <input
                  id="ownerId"
                  name="ownerId"
                  type="text"
                  value={form.ownerId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="co-field">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* right column */}
            <div className="co-column">
              <div className="co-field">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="co-field">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="co-field">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* error message */}
          {error && <p className="co-error">{error}</p>}

          <div className="co-actions">
            <button type="submit" className="co-finish-btn" disabled={loading}>
              {loading ? "Submitting..." : "Finish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyOwnerRegistration;
