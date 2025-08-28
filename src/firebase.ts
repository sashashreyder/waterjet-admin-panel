// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3PS7WQKqDbnQ5wRABdpRQP_QjKKq7IeY",
  authDomain: "waterjet-dbe65.firebaseapp.com",
  projectId: "waterjet-dbe65",
  storageBucket: "waterjet-dbe65.firebasestorage.app",
  messagingSenderId: "855739547805",
  appId: "1:855739547805:web:2ee9df1d51f8d9ab9b9474",
  measurementId: "G-NLPK5ZFTCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
