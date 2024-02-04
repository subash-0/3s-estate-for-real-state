import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "fir-estate-5d44f.firebaseapp.com",
  projectId: "fir-estate-5d44f",
  storageBucket: "fir-estate-5d44f.appspot.com",
  messagingSenderId: "1068905737028",
  appId: "1:1068905737028:web:d64939de6a024636f64511"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);