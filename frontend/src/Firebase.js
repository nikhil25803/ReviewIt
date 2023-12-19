import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPIKEY,
  authDomain: import.meta.env.VITE_FIREBASEAUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASEPROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASESTORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASEMESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASEAPPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
