// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "edu-paila.firebaseapp.com",
  projectId: "edu-paila",
  storageBucket: "edu-paila.firebasestorage.app",
  messagingSenderId: "914706933693",
  appId: "1:914706933693:web:428db651701d823a17d4d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

