import { useState } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

function App() {
  // Track which page is currently active: "home", "details", or "favorites"
  const [page, setPage] = useState("home");

  // Store the ID of the movie selected from Home, passed into MovieDetails
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  return (
    <div>
      {/* App title */}
      <h1>ViableVore</h1>

      {/* Navigation buttons to switch between pages */}
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("details")}>Details</button>
        <button onClick={() => setPage("favorites")}>Favorites</button>
      </nav>

      {/* Conditional rendering based on current page */}
      {page === "home" && <Home onSelectMovie={setSelectedMovieId} />}
      {page === "details" && <MovieDetails movieId={selectedMovieId} />}
      {page === "favorites" && <Favorites />}
    </div>
  );
}

export default App;
