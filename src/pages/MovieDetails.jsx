import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchSimilarMovies,
} from "../api/movieApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id).then(setMovie);

      fetchMovieTrailer(id).then((videos) => {
        const trailer = videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        if (trailer) setTrailerKey(trailer.key);
      });

      fetchSimilarMovies(id).then(setSimilarMovies);

      const savedReviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

      setReviews(savedReviews);
    }
  }, [id]);

  const handleReview = () => {
    if (!review.trim()) return;

    const updatedReviews = [...reviews, review];

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );

    setReview("");
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      {/* Movie Details */}
      <h2>{movie.title}</h2>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
      />

      <p>{movie.overview}</p>

      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>

      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>

      {/* Trailer */}
      {trailerKey && (
        <div className="trailer-container">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Reviews */}
      <div className="review-section">
        <h3>
          Reviews ({reviews.length})
        </h3>

        <textarea
          className="review-input"
          placeholder="Share your thoughts about this movie..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button className="auth-btn" onClick={handleReview}>
          Submit Review
        </button>

        <div className="review-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">
              No reviews yet.
            </p>
          ) : (
            reviews.map((r, index) => (
              <div key={index} className="review-card">
                <p>{r}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Similar Movies */}
      <h3>Related Movies</h3>

      <div className="movie-grid">
        {similarMovies.map((m) => (
          <div key={m.id} className="movie-card">
            <img
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
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