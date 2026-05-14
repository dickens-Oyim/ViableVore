import { useEffect, useState } from "react";
import { fetchMovieTrailer } from "../api/movieApi";
import axios from "axios";
import { searchMovies } from "../services/movieService";
import { useNavigate } from "react-router-dom";

function Home() {
  // State to store movies fetched from TMDB
  const [movies, setMovies] = useState([]);
  // State to store search query input
  const [query, setQuery] = useState("");
  // State to store trailers keyed by movie ID
  const [trailers, setTrailers] = useState({});
  const navigate = useNavigate();

  // Runs once when component mounts
  useEffect(() => {
    const fetchAllMovies = async () => {
<<<<<<< HEAD
         
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          },
        }
      );
=======
      // Fetch movies from TMDB discover endpoint
      const res = await axios.get("https://api.themoviedb.org/3/discover/movie", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        },
      });
>>>>>>> 4bffd253de2df803622897d22b1da4facf732da9
      setMovies(res.data.results);

      // Prepare object to store trailers
      const trailerData = {};
      // Loop through first 6 movies (limit for performance)
      for (const m of res.data.results.slice(0, 6)) {
        // Fetch video list for each movie
        const videos = await fetchMovieTrailer(m.id);
        // Find a trailer hosted on YouTube or Vimeo
        const trailer = videos.find(
          (v) => v.type === "Trailer" && (v.site === "YouTube" || v.site === "Vimeo")
        );
        // If found, store trailer key and site by movie ID
        if (trailer) trailerData[m.id] = { key: trailer.key, site: trailer.site };
      }
      // Save trailers in state
      setTrailers(trailerData);
    };
    fetchAllMovies();
  }, []);

  


  //  Search movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    // Fetch movies matching search query
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        },
      }
    );
    setMovies(res.data.results);
  };

  return (
    <div className="home">
      <h2>Movies</h2>
      {/* Search bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Movie grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
<<<<<<< HEAD
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
               src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                />
=======
          <div key={movie.id} className="movie-card">
            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
>>>>>>> 4bffd253de2df803622897d22b1da4facf732da9
            <p>{movie.title}</p>

            {/* Trailer embed if available */}
            {trailers[movie.id] && (
              <div className="trailer-container">
                {trailers[movie.id].site === "YouTube" ? (
                  <iframe
                    width="100%"
                    height="250"
                    src={`https://www.youtube.com/embed/${trailers[movie.id].key}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : trailers[movie.id].site === "Vimeo" ? (
                  <iframe
                    width="100%"
                    height="250"
                    src={`https://player.vimeo.com/video/${trailers[movie.id].key}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video width="100%" height="250" controls>
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
