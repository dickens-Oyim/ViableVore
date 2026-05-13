import { logout } from "../services/auth";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Dashboard;