import { useState } from "react";
import { login } from "../services/auth"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Logged in!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Login</h2>

          <input
            className="auth-field"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-field"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
 );
};

export default Login;