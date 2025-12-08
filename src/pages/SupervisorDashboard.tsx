import React from "react";
import { useNavigate } from "react-router-dom";
import "./SupervisorDashboard.css";

const logoSrc = "/public/images/logo1.png";
const bellIconSrc = "/public/images/bell.svg";

const SupervisorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  return (
    <div className="supervisor-dashboard-page">
      <div className="sd-shell">
        <header className="sd-header">
          <div className="sd-header-left">
            <div
              className="sd-logo"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <img
                src={logoSrc}
                alt="Borla Tracker logo"
                className="sd-logo-img"
              />
              <span className="sd-logo-text"></span>
            </div>

            <div className="sd-org-info">
              <span className="sd-org-label">Organization</span>
              <span className="sd-org-name">City Waste</span>
            </div>
          </div>

          <div className="sd-header-right">
            <button className="sd-icon-button" type="button">
              <img
                src={bellIconSrc}
                alt="Notifications"
                className="sd-bell-icon"
              />
            </button>
            <span className="sd-header-text">ID: 12444</span>
            <span className="sd-header-text">Supervisor: John Smith</span>
            <button
              type="button"
              className="sd-logout-button"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="sd-main">
          <aside className="sd-sidebar">
            <button
              type="button"
              className="sd-nav-item sd-nav-item--active"
              onClick={() => navigate("/supervisor/dashboard")}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="sd-nav-item"
              onClick={() => navigate("/supervisor/tasks")}
            >
              Task
            </button>
            <button
              type="button"
              className="sd-nav-item"
              onClick={() => navigate("/supervisor/collectors")}
            >
              Collectors
            </button>
            <button type="button" className="sd-nav-item">
              Settings
            </button>
          </aside>

          <section className="sd-content">
            <div className="sd-stat-row">
              <div className="sd-stat-card">
                <div className="sd-stat-value">220</div>
                <div className="sd-stat-label">Users</div>
                <div className="sd-stat-trend">
                  <span className="sd-trend-arrow">↑</span>
                  <span className="sd-trend-value">3.46%</span>
                  <span className="sd-trend-text">Since last month</span>
                </div>
              </div>

              <div className="sd-stat-card">
                <div className="sd-stat-value">8</div>
                <div className="sd-stat-label">Pending Task</div>
                <div className="sd-stat-trend">
                  <span className="sd-trend-arrow">↑</span>
                  <span className="sd-trend-value">3.46%</span>
                  <span className="sd-trend-text">Since last month</span>
                </div>
              </div>

              <div className="sd-stat-card">
                <div className="sd-stat-value">8</div>
                <div className="sd-stat-label">Collector</div>
                <div className="sd-stat-trend">
                  <span className="sd-trend-arrow">↑</span>
                  <span className="sd-trend-value">3.46%</span>
                  <span className="sd-trend-text">Since last month</span>
                </div>
              </div>
            </div>

            <h2 className="sd-section-heading">Tasks Overview</h2>
            <div className="sd-stat-row sd-stat-row--tasks">
              <div className="sd-stat-card">
                <div className="sd-stat-value">14</div>
                <div className="sd-stat-label">Tasks Today</div>
                <div className="sd-stat-trend">
                  <span className="sd-trend-arrow">↑</span>
                  <span className="sd-trend-value">3.46%</span>
                  <span className="sd-trend-text">Since last month</span>
                </div>
              </div>

              <div className="sd-stat-card">
                <div className="sd-stat-value">10</div>
                <div className="sd-stat-label">Assigned</div>
                <div className="sd-stat-trend">
                  <span className="sd-trend-arrow">↑</span>
                  <span className="sd-trend-value">3.46%</span>
                  <span className="sd-trend-text">Since last month</span>
                </div>
              </div>

              <div className="sd-stat-card">
                <div className="sd-stat-value">6</div>
                <div className="sd-stat-label">Completed</div>
                <div className="sd-stat-trend">
                  <span className="sd-trend-arrow">↑</span>
                  <span className="sd-trend-value">3.46%</span>
                  <span className="sd-trend-text">Since last month</span>
                </div>
              </div>
            </div>

            <section className="sd-activity">
              <h2 className="sd-section-heading">Activity Feed</h2>
              <ul className="sd-activity-list">
                <li>Collector: Isaac Smith Task #343 as completed</li>
                <li>Collector: Isaac Smith Task #343 as completed</li>
                <li>Collector: Isaac Smith Task #343 as completed</li>
                <li>Collector: Isaac Smith Task #343 as completed</li>
                <li>Collector: Isaac Smith Task #343 as completed</li>
              </ul>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
