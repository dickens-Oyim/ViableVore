export const addReview = async (review) => {
  return await addDoc(collection(db, "reviews"), review);
};

await addReview({
  movieId: movie.id,   //  LINK TO API MOVIE
  text,
  rating,
  userId: auth.currentUser.uid,
  createdAt: new Date()
});