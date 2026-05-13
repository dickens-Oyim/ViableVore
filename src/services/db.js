import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add review
export const addReview = async (review) => {
  return await addDoc(collection(db, "reviews"), review);
};

// Get all reviews
export const getReviews = async () => {
  const snapshot = await getDocs(collection(db, "reviews"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};