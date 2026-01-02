import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { apiFetch } from "../services/apiClient"; // centralized API client

// ✅ API endpoint
const LOGIN_API_URL =
  "https://postumbonal-monatomic-cecelia.ngrok-free.dev/api/auth/login/";

// ✅ Import logo from src/assets
import logoSrc from "../assets/logo1.png";

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your phone number/email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiFetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        let message = "Login failed";
        if (data?.detail) message = data.detail;
        else if (data?.message) message = data.message;
        setError(message);
        return;
      }

      // ✅ Save tokens and user info
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.company) {
        localStorage.setItem("company", JSON.stringify(data.company));
      }

      // ✅ Navigate based on role
      if (data.user.role === "supervisor" || data.user.role === "company") {
        navigate("/supervisor/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo-wrapper">
          <img src={logoSrc} alt="Borla Tracker logo" className="login-logo" />
          <span className="login-logo-text"></span>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="identifier">Phone Number or Email</label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div style={{ color: "#dc2626", marginBottom: 8 }}>{error}</div>
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
