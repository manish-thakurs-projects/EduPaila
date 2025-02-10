import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "edu-paila.firebaseapp.com",
  projectId: "edu-paila",
  storageBucket: "edu-paila.firebasestorage.app",
  messagingSenderId: "914706933693",
  appId: "1:914706933693:web:428db651701d823a17d4d4"
};

export const app = initializeApp(firebaseConfig);

