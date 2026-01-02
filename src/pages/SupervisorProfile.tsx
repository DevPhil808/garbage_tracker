import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./SupervisorDashboard.css";

const SupervisorProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.get("/supervisor/profile/");
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch("/supervisor/profile/", {
        team_size: Number(profile.team_size),
        photo_url: profile.photo_url,
      });
      alert("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <div className="sd-content">Loading Profile...</div>;

  return (
    <div className="supervisor-dashboard-page">
      <div className="sd-shell">
        <header className="sd-header">
          <span className="sd-logo-text">MY PROFILE</span>
          <button
            className="sd-nav-item"
            onClick={() => navigate("/supervisor/dashboard")}
          >
            Dashboard
          </button>
        </header>
        <main className="sd-content">
          <div
            className="sd-stat-card"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <form onSubmit={handleUpdate}>
              <p>
                Username: <strong>{profile?.username}</strong>
              </p>
              <p>
                Company: <strong>{profile?.company_username}</strong>
              </p>

              <div className="login-field" style={{ marginTop: "15px" }}>
                <label>Team Size</label>
                <input
                  className="sr-input"
                  type="number"
                  value={profile?.team_size || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, team_size: e.target.value })
                  }
                />
              </div>

              <div className="login-field">
                <label>Photo URL</label>
                <input
                  className="sr-input"
                  type="text"
                  value={profile?.photo_url || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, photo_url: e.target.value })
                  }
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                {isEditing ? (
                  <button
                    type="submit"
                    className="sd-nav-item sd-nav-item--active"
                    style={{ width: "100%" }}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="button"
                    className="sd-nav-item"
                    onClick={() => setIsEditing(true)}
                    style={{ width: "100%" }}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupervisorProfile;
