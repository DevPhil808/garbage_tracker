import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

import logoSrc from "../assets/logo1.png";
import heroSrc from "../assets/hero.jpg";

import ICON_COMPANY_MANAGEMENT from "../assets/corporate-building.png";
import ICON_SUPERVISOR_TOOLS from "../assets/supervisor.png";
import ICON_COLLECTOR_TRACKING from "../assets/tracking.png";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");
  const goToRegisterCompany = () => navigate("/register-company");
  const goToLogin = () => navigate("/login");

  return (
    <div className="landing-page">
      <div className="landing-page-shell">
        <header className="lp-header">
          <nav className="lp-nav">
            <div
              className="lp-logo"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <img
                src={logoSrc}
                alt="Borla Tracker logo"
                className="lp-logo-img"
              />
              <span className="lp-logo-text"></span>
            </div>

            <div className="lp-nav-right">
              <button type="button" className="lp-nav-cta" onClick={goToLogin}>
                Log In
              </button>

              <button
                type="button"
                className="lp-nav-cta"
                onClick={goToRegisterCompany}
              >
                Register Company
              </button>
            </div>
          </nav>

          <section className="lp-hero">
            <div className="lp-hero-text">
              <p className="lp-hero-eyebrow">Digitizing Waste Management</p>
              <h1 className="lp-hero-title">
                A modern platform that connects waste companies, supervisors and
                collectors with structured workflows and real-time tracking.
              </h1>

              <div className="lp-hero-buttons">
                <button
                  type="button"
                  className="lp-hero-cta"
                  onClick={goToRegisterCompany}
                >
                  Register Company
                </button>

                <button
                  type="button"
                  className="lp-hero-cta"
                  onClick={goToLogin}
                >
                  Log In
                </button>
              </div>
            </div>

            <div className="lp-hero-image-wrapper">
              <img
                src={heroSrc}
                alt="Garbage collection truck"
                className="lp-hero-image"
              />
              <div className="lp-hero-image-fade" />
            </div>
          </section>
        </header>

        <main>
          <section className="lp-feature-section">
            <div className="lp-feature-card">
              <div className="lp-feature">
                <div className="lp-feature-icon">
                  <img
                    src={ICON_COMPANY_MANAGEMENT}
                    alt="Company management"
                    className="lp-feature-icon-img"
                  />
                </div>
                <h3 className="lp-feature-title">Company Management</h3>
                <p className="lp-feature-desc">
                  Register companies, upload licenses, and define service zones
                  for structured operations.
                </p>
              </div>

              <div className="lp-feature">
                <div className="lp-feature-icon">
                  <img
                    src={ICON_SUPERVISOR_TOOLS}
                    alt="Supervisor tools"
                    className="lp-feature-icon-img"
                  />
                </div>
                <h3 className="lp-feature-title">Supervisor Tools</h3>
                <p className="lp-feature-desc">
                  Assign tasks, manage collectors, monitor completion, and
                  resolve complaints efficiently.
                </p>
              </div>

              <div className="lp-feature">
                <div className="lp-feature-icon">
                  <img
                    src={ICON_COLLECTOR_TRACKING}
                    alt="Collector tracking"
                    className="lp-feature-icon-img"
                  />
                </div>
                <h3 className="lp-feature-title">Collector Tracking</h3>
                <p className="lp-feature-desc">
                  Get real-time updates, automated reporting, and completion
                  insights for every collection.
                </p>
              </div>
            </div>
          </section>

          <section className="lp-platform-section">
            <h2 className="lp-platform-heading">What the Platform Can Do</h2>

            <div className="lp-capabilities-grid">
              <div className="lp-capability-card">
                <div className="lp-capability-icon">
                  {/* ❌ placeholder for missing company registration icon */}
                  <img
                    src=""
                    alt="Company registration and verification"
                    className="lp-capability-icon-img"
                  />
                </div>
                <h3 className="lp-capability-title">
                  Company Registration &amp; Verification
                </h3>
                <p className="lp-capability-desc">
                  Secure onboarding with document uploads, license checks, and
                  service zone setups.
                </p>
              </div>

              <div className="lp-capability-card">
                <div className="lp-capability-icon">
                  {/* ❌ placeholder for missing task assignment icon */}
                  <img
                    src=""
                    alt="Task assignment engine"
                    className="lp-capability-icon-img"
                  />
                </div>
                <h3 className="lp-capability-title">Task Assignment Engine</h3>
                <p className="lp-capability-desc">
                  Supervisors can assign tasks with priority levels, notes, and
                  performance metrics.
                </p>
              </div>

              <div className="lp-capability-card">
                <div className="lp-capability-icon">
                  {/* ❌ placeholder for missing complaint management icon */}
                  <img
                    src=""
                    alt="Complaint management"
                    className="lp-capability-icon-img"
                  />
                </div>
                <h3 className="lp-capability-title">Complaint Management</h3>
                <p className="lp-capability-desc">
                  Log, track, and resolve customer complaints with clear,
                  auditable workflows.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* ✅ Footer Section */}
        <footer className="lp-footer">
          <div className="lp-footer-content">
            <div className="lp-footer-left">
              <img
                src={logoSrc}
                alt="Borla Tracker logo"
                className="lp-footer-logo"
              />
              <span className="lp-footer-text">
                © {new Date().getFullYear()} Borla Tracker. All rights reserved.
              </span>
            </div>
            <div className="lp-footer-right">
              <a href="/about" className="lp-footer-link">
                About
              </a>
              <a href="/contact" className="lp-footer-link">
                Contact
              </a>
              <a href="/privacy" className="lp-footer-link">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
