// Import the functions you need from the SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW7PNwnd5BXL21R2lF_oL8_-SnzgPgVLs",
  authDomain: "dammmasssss.firebaseapp.com",
  projectId: "dammmasssss",
  storageBucket: "dammmasssss.firebasestorage.app",
  messagingSenderId: "1070789052123",
  appId: "1:1070789052123:web:cfe20676cfe07ae797aefe",
  measurementId: "G-2TJYPTG3X0"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
