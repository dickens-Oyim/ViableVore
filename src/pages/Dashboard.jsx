import { logout } from "../services/auth";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [favorites, setFavorites] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const savedReviews =
      JSON.parse(localStorage.getItem("reviews")) || [];

    setFavorites(savedFavorites.length);
    setReviews(savedReviews.length);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard</h2>

        <p className="dashboard-text">
          Manage your favorites and reviews.
        </p>

        <div className="dashboard-stats">
          <div className="stat-box">
            <h3>Favorites</h3>
            <p>{favorites}</p>
          </div>

          <div className="stat-box">
            <h3>Reviews</h3>
            <p>{reviews}</p>
          </div>
        </div>

        <button className="auth-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;