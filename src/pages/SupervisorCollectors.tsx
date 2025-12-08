import React from "react";
import { useNavigate } from "react-router-dom";
import "./SupervisorCollectors.css";

const logoSrc = "/public/images/logo1.png";
const bellIconSrc = "/public/images/bell.svg";
const EDIT_ICON_SRC = "/public/images/external-link.svg";

type CollectorRow = {
  name: string;
  location: string;
  zone: string;
  status: string;
  completed: number;
};

const COLLECTORS: CollectorRow[] = [
  {
    name: "Kelly Martins",
    location: "Tesano",
    zone: "B",
    status: "Busy",
    completed: 203,
  },
  {
    name: "Prince Owusu",
    location: "Abeka",
    zone: "B",
    status: "Offline",
    completed: 203,
  },
  {
    name: "Michael Tawnson",
    location: "Ofankor",
    zone: "B",
    status: "Available",
    completed: 203,
  },
  {
    name: "Andrews Anarfi",
    location: "Lapaz",
    zone: "B",
    status: "Offline",
    completed: 203,
  },
  {
    name: "Kingsley Mensah",
    location: "Ajao",
    zone: "B",
    status: "Busy",
    completed: 203,
  },
  {
    name: "Dorothy Akampa",
    location: "Kasoa",
    zone: "B",
    status: "Available",
    completed: 203,
  },
  {
    name: "Daniel Don Davies",
    location: "Circle",
    zone: "B",
    status: "Busy",
    completed: 203,
  },
  {
    name: "Pius Akwegedi",
    location: "Odorkor",
    zone: "B",
    status: "Busy",
    completed: 203,
  },
  {
    name: "Aaron Tetey-Fia",
    location: "Dansoman",
    zone: "B",
    status: "Busy",
    completed: 203,
  },
  {
    name: "Ernest Kye",
    location: "Kaneshie",
    zone: "B",
    status: "Available",
    completed: 203,
  },
];

const SupervisorCollectors: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  return (
    <div className="supervisor-collectors-page">
      <div className="sc-shell">
        <header className="sc-header">
          <div className="sc-header-left">
            <div
              className="sc-logo"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <img
                src={logoSrc}
                alt="Borla Tracker logo"
                className="sc-logo-img"
              />
              <span className="sc-logo-text"></span>
            </div>
            <span className="sc-org-name">City Waste</span>
          </div>

          <div className="sc-header-right">
            <button className="sc-icon-button" type="button">
              <img
                src={bellIconSrc}
                alt="Notifications"
                className="sc-bell-icon"
              />
            </button>
            <span className="sc-header-text">ID: 12444</span>
            <span className="sc-header-text">Supervisor: John Smith</span>
            <button
              type="button"
              className="sc-logout-button"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="sc-main">
          <aside className="sc-sidebar">
            <button
              type="button"
              className="sc-nav-item"
              onClick={() => navigate("/supervisor/dashboard")}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="sc-nav-item"
              onClick={() => navigate("/supervisor/tasks")}
            >
              Task
            </button>
            <button
              type="button"
              className="sc-nav-item sc-nav-item--active"
              onClick={() => navigate("/supervisor/collectors")}
            >
              Collectors
            </button>
            <button type="button" className="sc-nav-item">
              Settings
            </button>
          </aside>

          <section className="sc-content">
            <div className="sc-table-wrapper">
              <table className="sc-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Zone</th>
                    <th>Status</th>
                    <th>Completed Task</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {COLLECTORS.map((c, index) => (
                    <tr key={index}>
                      <td>{c.name}</td>
                      <td>{c.location}</td>
                      <td>{c.zone}</td>
                      <td>{c.status}</td>
                      <td>{c.completed}</td>
                      <td>
                        <button type="button" className="sc-edit-btn">
                          <img
                            src={EDIT_ICON_SRC}
                            alt="Edit collector"
                            className="sc-edit-icon"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SupervisorCollectors;
