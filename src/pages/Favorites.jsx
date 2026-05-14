import { useState } from "react";

function Favorites() {
  // State to hold the list of favorite movies
  const [favorites, setFavorites] = useState([]);

  // Function to remove a movie from favorites by its ID
  const removeFavorite = (id) => {
    // Filter out the movie with the matching ID
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  return (
    <div>
      
      <h2>My Favorites</h2>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
      />

      {/* Conditional rendering: show message if no favorites */}
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        // Loop through favorites and display each movie
        favorites.map((movie) => (
          <div key={movie.id}>
            {/* Movie title */}
            <p>{movie.title}</p>
            {/* Remove button */}
            <button onClick={() => removeFavorite(movie.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
