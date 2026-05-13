import { useEffect, useState } from "react";
import { getReviews } from "../services/db";

const ReviewsSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews();

      // filter reviews for this movie only
      const filtered = data.filter(
        (review) => review.movieId === movieId
      );

      setReviews(filtered);
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>

      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

const ReviewsSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews();

      const filtered = data.filter(
        (r) => r.movieId === movieId
      );

      setReviews(filtered);
    };

    fetchData();
  }, [movieId]);

};
export default ReviewsSection;
