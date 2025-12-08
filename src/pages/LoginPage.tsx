import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const logoSrc = "/public/images/logo1.png";

type Role = "supervisor" | "admin";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>("supervisor");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            password,
            role,
          }),
        }
      );

      if (!response.ok) {
        let message = "Login failed";
        try {
          const data = await response.json();
          if (data && typeof data.detail === "string") {
            message = data.detail;
          } else if (data && typeof data.message === "string") {
            message = data.message;
          }
        } catch {}
        throw new Error(message);
      }

      if (role === "supervisor") {
        navigate("/supervisor/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(msg);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToHome = () => navigate("/");

  return (
    <div className="login-page">
      <div className="login-card">
        <div
          className="login-logo-wrapper"
          onClick={goToHome}
          style={{ cursor: "pointer" }}
        >
          <img src={logoSrc} alt="Borla Tracker logo" className="login-logo" />
          <span className="login-logo-text"></span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="loginPhone">Phone Number</label>
            <input
              id="loginPhone"
              name="loginPhone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="loginPassword">Password:</label>
            <input
              id="loginPassword"
              name="loginPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-field login-role-field">
            <span className="login-role-label">Role</span>
            <div className="login-role-options">
              <label className="login-radio-option">
                <input
                  type="radio"
                  name="role"
                  value="supervisor"
                  checked={role === "supervisor"}
                  onChange={() => setRole("supervisor")}
                />
                <span>Supervisor</span>
              </label>

              <label className="login-radio-option">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          {error && (
            <p
              style={{
                marginTop: "8px",
                color: "#dc2626",
                fontSize: "0.85rem",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
