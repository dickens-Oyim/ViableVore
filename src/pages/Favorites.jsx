import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedMovies =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedMovies);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div className="favorites-page">
      <h2>My Favorites</h2>

      <div className="movie-grid">
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
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
                onClick={() => removeFavorite(movie.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;