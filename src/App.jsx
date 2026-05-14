import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    // Router wraps the whole app to enable navigation between pages
    <Router>
      <div className="app">
        {/* Header with logo and navigation links */}
        <header className="navbar">
          <h1 className="logo">ViableVore</h1>
          <nav>
            {/* Link components let you navigate without page reload */}
            <Link to="/">Home</Link>
            <Link to="/details">Details</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </header>

        {/* Main content area where routes are rendered */}
        <main>
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />
            {/* Movie details page route with dynamic id */}
            <Route path="/details/:id" element={<MovieDetails />} />
            {/* Favorites page route */}
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
