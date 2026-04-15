import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpUWUIzPXIZN6rrNtsIqcL6VfOE2RLVl0",
  authDomain: "mading-cf676.firebaseapp.com",
  projectId: "mading-cf676",
  storageBucket: "mading-cf676.firebasestorage.app",
  messagingSenderId: "72175203671",
  appId: "1:72175203671:web:7a0676a55beb64bc96ba12",
  measurementId: "G-590P9LLK7J"
};

// Cek agar Firebase tidak di-load berulang kali
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
