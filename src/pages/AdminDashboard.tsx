import React, { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const logoSrc = "/public/images/logo1.png";
const bellIconSrc = "/public/images/bell.svg";

type AdminTab =
  | "dashboard"
  | "companies"
  | "supervisors"
  | "complaints"
  | "settings";

type CompanyRow = {
  name: string;
  email: string;
  status: string;
  created: string;
};

type SupervisorRow = {
  name: string;
  company: string;
  email: string;
  status: string;
};

type ComplaintRow = {
  id: string;
  user: string;
  company: string;
  status: string;
  date: string;
};

const PENDING_COMPANIES: CompanyRow[] = [
  {
    name: "City Waste",
    email: "info@citywaste.com",
    status: "Pending",
    created: "10.01.2025",
  },
  {
    name: "Green Clean Ltd",
    email: "hello@greenclean.com",
    status: "Pending",
    created: "12.01.2025",
  },
];

const SUPERVISORS: SupervisorRow[] = [
  {
    name: "John Smith",
    company: "City Waste",
    email: "john.smith@citywaste.com",
    status: "Active",
  },
  {
    name: "Ama Owusu",
    company: "Green Clean Ltd",
    email: "ama.owusu@greenclean.com",
    status: "Active",
  },
  {
    name: "Kwame Mensah",
    company: "Urban Cleaners",
    email: "kwame.mensah@urbanclean.com",
    status: "Suspended",
  },
];

const COMPLAINTS: ComplaintRow[] = [
  {
    id: "#C-1023",
    user: "Sarah Boateng",
    company: "City Waste",
    status: "Open",
    date: "05.01.2025",
  },
  {
    id: "#C-1024",
    user: "Michael Doe",
    company: "Green Clean Ltd",
    status: "In Review",
    date: "06.01.2025",
  },
  {
    id: "#C-1025",
    user: "Kofi Asare",
    company: "Urban Cleaners",
    status: "Resolved",
    date: "04.01.2025",
  },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const goToHome = () => navigate("/");

  const renderDashboard = () => (
    <>
      <div className="ad-stat-row">
        <div className="ad-stat-card">
          <div className="ad-stat-value">12</div>
          <div className="ad-stat-label">Total Companies</div>
          <div className="ad-stat-sub">2 pending approval</div>
        </div>

        <div className="ad-stat-card">
          <div className="ad-stat-value">480</div>
          <div className="ad-stat-label">Total Users</div>
          <div className="ad-stat-sub">Active across all cities</div>
        </div>

        <div className="ad-stat-card">
          <div className="ad-stat-value">18</div>
          <div className="ad-stat-label">Supervisors</div>
          <div className="ad-stat-sub">Across 12 companies</div>
        </div>

        <div className="ad-stat-card">
          <div className="ad-stat-value">7</div>
          <div className="ad-stat-label">Open Complaints</div>
          <div className="ad-stat-sub">3 escalated</div>
        </div>
      </div>

      <section className="ad-section">
        <h2 className="ad-section-heading">Pending Companies</h2>
        <div className="ad-table-wrapper">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {PENDING_COMPANIES.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.status}</td>
                  <td>{c.created}</td>
                  <td className="ad-actions-cell">
                    <button type="button" className="ad-action-link">
                      Approve
                    </button>
                    <button
                      type="button"
                      className="ad-action-link ad-action-link--danger"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );

  const renderCompanies = () => (
    <section className="ad-section">
      <h2 className="ad-section-heading">All Companies</h2>
      <div className="ad-table-wrapper">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {PENDING_COMPANIES.map((c, idx) => (
              <tr key={idx}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.status}</td>
                <td>{c.created}</td>
                <td className="ad-actions-cell">
                  <button type="button" className="ad-action-link">
                    View
                  </button>
                  <button type="button" className="ad-action-link">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderSupervisors = () => (
    <section className="ad-section">
      <h2 className="ad-section-heading">Supervisors</h2>
      <div className="ad-table-wrapper">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {SUPERVISORS.map((s, idx) => (
              <tr key={idx}>
                <td>{s.name}</td>
                <td>{s.company}</td>
                <td>{s.email}</td>
                <td>{s.status}</td>
                <td className="ad-actions-cell">
                  <button type="button" className="ad-action-link">
                    View
                  </button>
                  <button
                    type="button"
                    className="ad-action-link ad-action-link--danger"
                  >
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderComplaints = () => (
    <section className="ad-section">
      <h2 className="ad-section-heading">Complaints</h2>
      <div className="ad-table-wrapper">
        <table className="ad-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Company</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {COMPLAINTS.map((c, idx) => (
              <tr key={idx}>
                <td>{c.id}</td>
                <td>{c.user}</td>
                <td>{c.company}</td>
                <td>{c.status}</td>
                <td>{c.date}</td>
                <td className="ad-actions-cell">
                  <button type="button" className="ad-action-link">
                    View
                  </button>
                  <button type="button" className="ad-action-link">
                    Escalate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="ad-section">
      <h2 className="ad-section-heading">Settings</h2>
      <p className="ad-settings-text">
        This area can be used to configure global platform settings such as
        roles, permissions, notification preferences and system-wide thresholds.
      </p>
    </section>
  );

  let content: ReactNode;
  if (activeTab === "dashboard") content = renderDashboard();
  else if (activeTab === "companies") content = renderCompanies();
  else if (activeTab === "supervisors") content = renderSupervisors();
  else if (activeTab === "complaints") content = renderComplaints();
  else content = renderSettings();

  return (
    <div className="admin-dashboard-page">
      <div className="ad-shell">
        <header className="ad-header">
          <div className="ad-header-left">
            <div
              className="ad-logo"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <img
                src={logoSrc}
                alt="Borla Tracker logo"
                className="ad-logo-img"
              />
              <span className="ad-logo-text"></span>
            </div>

            <div className="ad-org-info">
              <span className="ad-org-label">Role</span>
              <span className="ad-org-name">Platform Admin</span>
            </div>
          </div>

          <div className="ad-header-right">
            <button className="ad-icon-button" type="button">
              <img
                src={bellIconSrc}
                alt="Notifications"
                className="ad-bell-icon"
              />
            </button>
            <span className="ad-header-text">Admin: John Smith</span>
            <button
              type="button"
              className="ad-logout-button"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="ad-main">
          <aside className="ad-sidebar">
            <button
              type="button"
              className={
                activeTab === "dashboard"
                  ? "ad-nav-item ad-nav-item--active"
                  : "ad-nav-item"
              }
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              type="button"
              className={
                activeTab === "companies"
                  ? "ad-nav-item ad-nav-item--active"
                  : "ad-nav-item"
              }
              onClick={() => setActiveTab("companies")}
            >
              Companies
            </button>
            <button
              type="button"
              className={
                activeTab === "supervisors"
                  ? "ad-nav-item ad-nav-item--active"
                  : "ad-nav-item"
              }
              onClick={() => setActiveTab("supervisors")}
            >
              Supervisors
            </button>
            <button
              type="button"
              className={
                activeTab === "complaints"
                  ? "ad-nav-item ad-nav-item--active"
                  : "ad-nav-item"
              }
              onClick={() => setActiveTab("complaints")}
            >
              Complaints
            </button>
            <button
              type="button"
              className={
                activeTab === "settings"
                  ? "ad-nav-item ad-nav-item--active"
                  : "ad-nav-item"
              }
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </aside>

          <section className="ad-content">{content}</section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
