import React from "react";
import { useNavigate } from "react-router-dom";
import "./SupervisorTasks.css";

const logoSrc = "/public/images/logo1.png";
const bellIconSrc = "/public/images/bell.svg";

type TaskRow = {
  name: string;
  location: string;
  taskId: string;
  status: string;
  priority: string;
  created: string;
};

const TASKS: TaskRow[] = [
  {
    name: "James Wilson",
    location: "Santa Maria",
    taskId: "#6788",
    status: "Pending",
    priority: "Normal",
    created: "26.12.2024",
  },
  {
    name: "Jason Miller",
    location: "Kwame Nkrumah Avenue",
    taskId: "#9181",
    status: "Pending",
    priority: "Normal",
    created: "11.02.2025",
  },
  {
    name: "Emily Parker",
    location: "Ring Road Central",
    taskId: "#4561",
    status: "Ready",
    priority: "High",
    created: "13.03.2025",
  },
  {
    name: "Tyler Brooks",
    location: "Spintex Road",
    taskId: "#6851",
    status: "Pending",
    priority: "Normal",
    created: "19.03.2025",
  },
  {
    name: "Chloe Adams",
    location: "Ring Road East",
    taskId: "#9123",
    status: "Pending",
    priority: "Normal",
    created: "22.03.2025",
  },
  {
    name: "Riley James",
    location: "Oxford street",
    taskId: "#1910",
    status: "Ready",
    priority: "Normal",
    created: "29.03.2025",
  },
  {
    name: "Jordan Reed",
    location: "Ilia Street",
    taskId: "#3458",
    status: "Pending",
    priority: "Normal",
    created: "02.05.2025",
  },
  {
    name: "Cameron Lee",
    location: "High Street (Old Accra)",
    taskId: "#3456",
    status: "Pending",
    priority: "Normal",
    created: "09.06.2025",
  },
  {
    name: "Sarah Knight",
    location: "Russia Road (Accra)",
    taskId: "#4911",
    status: "Ready",
    priority: "Low",
    created: "23.06.2025",
  },
  {
    name: "Mrs Khatifa",
    location: "Sakumono Avenue",
    taskId: "#8893",
    status: "Ready",
    priority: "High",
    created: "18.07.2025",
  },
];

const SupervisorTasks: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  return (
    <div className="supervisor-tasks-page">
      <div className="st-shell">
        <header className="st-header">
          <div className="st-header-left">
            <div
              className="st-logo"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <img
                src={logoSrc}
                alt="Borla Tracker logo"
                className="st-logo-img"
              />
              <span className="st-logo-text"></span>
            </div>
            <span className="st-org-name">City Waste</span>
          </div>

          <div className="st-header-right">
            <button className="st-icon-button" type="button">
              <img
                src={bellIconSrc}
                alt="Notifications"
                className="st-bell-icon"
              />
            </button>
            <span className="st-header-text">ID: 12444</span>
            <span className="st-header-text">Supervisor: John Smith</span>
            <button
              type="button"
              className="st-logout-button"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="st-main">
          <aside className="st-sidebar">
            <button
              type="button"
              className="st-nav-item"
              onClick={() => navigate("/supervisor/dashboard")}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="st-nav-item st-nav-item--active"
              onClick={() => navigate("/supervisor/tasks")}
            >
              Task
            </button>
            <button
              type="button"
              className="st-nav-item"
              onClick={() => navigate("/supervisor/collectors")}
            >
              Collectors
            </button>

            <button
              type="button"
              className="sd-nav-item"
              onClick={() => navigate("/company/profile")}
            >
              Company Profile
            </button>

            <button type="button" className="st-nav-item">
              Settings
            </button>
          </aside>

          <section className="st-content">
            <section className="st-task-card">
              <div className="st-task-card-header">
                <h2>Today&apos;s Task</h2>
              </div>

              <div className="st-table-wrapper">
                <table className="st-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Task ID</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th className="st-created-header">Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TASKS.map((task, index) => (
                      <tr key={index}>
                        <td>{task.name}</td>
                        <td>{task.location}</td>
                        <td>{task.taskId}</td>
                        <td>{task.status}</td>
                        <td>{task.priority}</td>
                        <td>{task.created}</td>
                        <td>
                          <button type="button" className="st-assign-link">
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="st-pagination">
                <button className="st-page-link" type="button">
                  Prev 10
                </button>
                <div className="st-page-numbers">
                  <button
                    type="button"
                    className="st-page-link st-page-link--active"
                  >
                    12
                  </button>
                  <button type="button" className="st-page-link">
                    13
                  </button>
                  <button type="button" className="st-page-link">
                    14
                  </button>
                  <button type="button" className="st-page-link">
                    15
                  </button>
                  <button type="button" className="st-page-link">
                    16
                  </button>
                  <button type="button" className="st-page-link">
                    17
                  </button>
                  <button type="button" className="st-page-link">
                    18
                  </button>
                </div>
                <button className="st-page-link" type="button">
                  Next 10
                </button>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SupervisorTasks;
