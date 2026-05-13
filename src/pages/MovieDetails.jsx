import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieTrailer, fetchSimilarMovies } from "../api/movieApi";

function MovieDetails() {
  // Get movie ID from the URL (React Router)
  const { id } = useParams();

  // State to hold movie details
  const [movie, setMovie] = useState(null);
  // State to hold YouTube trailer key
  const [trailerKey, setTrailerKey] = useState(null);
  // State to hold list of similar movies
  const [similarMovies, setSimilarMovies] = useState([]);

  // Fetch movie details, trailer, and related movies whenever ID changes
  useEffect(() => {
    if (id) {
      // Fetch main movie details
      fetchMovieDetails(id).then(setMovie);

      // Fetch trailer videos and pick the first YouTube trailer
      fetchMovieTrailer(id).then((videos) => {
        const trailer = videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      });

      // Fetch similar movies
      fetchSimilarMovies(id).then(setSimilarMovies);
    }
  }, [id]);

  // Show loading message until movie data is ready
  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      {/* Movie details */}
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>

      {/* Embedded YouTube trailer */}
      {trailerKey && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}

      {/* Related movies section */}
      <h3>Related Movies</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {similarMovies.map((m) => (
          <div key={m.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
              alt={m.title}
            />
            <p>{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
