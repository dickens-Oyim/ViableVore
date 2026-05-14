import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header/Navbar */}
        <header className="navbar">
          <h1 className="logo">ViableVore</h1>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Movie Details */}
            <Route path="/movie/:id" element={<MovieDetails />} />

            {/* Favorites */}
            <Route path="/favorites" element={<Favorites />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Register */}
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;