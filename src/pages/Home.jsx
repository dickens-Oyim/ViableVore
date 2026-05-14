import { useEffect, useState } from "react";
import { fetchMovieTrailer } from "../api/movieApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [trailers, setTrailers] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        // Fetch movies from TMDB
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
            },
          }
        );

        setMovies(res.data.results);

        // Store trailers
        const trailerData = {};

        // Limit trailer fetches for performance
        for (const m of res.data.results.slice(0, 6)) {
          const videos = await fetchMovieTrailer(m.id);

          const trailer = videos.find(
            (v) =>
              v.type === "Trailer" &&
              (v.site === "YouTube" || v.site === "Vimeo")
          );

          if (trailer) {
            trailerData[m.id] = {
              key: trailer.key,
              site: trailer.site,
            };
          }
        }

        setTrailers(trailerData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchAllMovies();
  }, []);

  // Search movies
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          },
        }
      );

      setMovies(res.data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
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

      {/* Movie Grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            {/* Poster */}
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />

            <p>{movie.title}</p>
              <button
                className="favorite-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  const savedMovies =
                    JSON.parse(localStorage.getItem("favorites")) || [];

                  const alreadyExists = savedMovies.find(
                    (m) => m.id === movie.id
                  );

                  if (alreadyExists) {
                    alert("Movie already in favorites");
                    return;
                  }

                  const updatedFavorites = [...savedMovies, movie];

                  localStorage.setItem(
                    "favorites",
                    JSON.stringify(updatedFavorites)
                  );

                  alert("Added to favorites!");
                }}
                >
                Add to Favorites
              </button>

            {/* Trailer */}
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