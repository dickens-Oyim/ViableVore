import { useEffect, useState } from "react";
import { fetchMovieTrailer } from "../api/movieApi";
import axios from "axios";
import { searchMovies } from "../services/movieService";

function Home({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [trailers, setTrailers] = useState({});

  // Fetch all movies (discover endpoint)
  useEffect(() => {
    const fetchAllMovies = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          },
        }
      );
      setMovies(res.data.results);

      // Fetch trailers for first few movies
      const trailerData = {};
      for (const m of res.data.results.slice(0, 30)) {
        const videos = await fetchMovieTrailer(m.id);
        const trailer = videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) trailerData[m.id] = trailer.key;
      }
      setTrailers(trailerData);
    };

    fetchAllMovies();
  }, []);

  


  //  Search movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

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
    <div>
      <h1>Movies</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => onSelectMovie(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>

            {/*  Trailer preview */}
            {trailers[movie.id] && (
              <iframe
                width="200"
                height="120"
                src={`https://www.youtube.com/embed/${trailers[movie.id]}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
