import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0xP6-9DdqeVDT8ZN3HnpMOB_jHSClB8w",
  authDomain: "viablevore.firebaseapp.com",
  projectId: "viablevore",
  storageBucket: "viablevore.firebasestorage.app",
  messagingSenderId: "1036249499459",
  appId: "1:1036249499459:web:7dc23ff5af68c2a69a51f6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);