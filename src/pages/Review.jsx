import { addReview } from "../services/db";
import { auth } from "../firebase";

const handleAddReview = async () => {
  try {
    await addReview({
      movieId: 123,
      text: "Amazing movie!",
      rating: 5,
      userId: auth.currentUser.uid,
      createdAt: new Date()
    });

    alert("Review saved!");
  } catch (error) {
    console.log(error);
  }
};