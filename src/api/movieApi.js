import axios from "axios";

// Create a reusable axios client with TMDB base URL and auth header
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
  },
});

//  Fetch trending movies of the week
export const fetchTrendingMovies = async () => {
  const res = await apiClient.get("/trending/movie/week");
  return res.data.results; // returns array of movie objects
};

//  Fetch details for a specific movie by ID
export const fetchMovieDetails = async (id) => {
  const res = await apiClient.get(`/movie/${id}`);
  return res.data; // returns full movie details object
};

// Fetch trailer videos for a specific movie
export const fetchMovieTrailer = async (id) => {
  const res = await apiClient.get(`/movie/${id}/videos`);
  return res.data.results; // returns array of video objects (YouTube keys, etc.)
};

//  Fetch related/similar movies for a specific movie
export const fetchSimilarMovies = async (id) => {
  const res = await apiClient.get(`/movie/${id}/similar`);
  return res.data.results; // returns array of similar movie objects
};
