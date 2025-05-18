
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace these with your actual Firebase project configuration
// To get this configuration:
// 1. Go to Firebase console (https://console.firebase.google.com/)
// 2. Create or select your project
// 3. Go to Project Settings (gear icon)
// 4. Scroll down to "Your apps" section
// 5. Copy the configuration object values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

// Preset admin credentials
export const adminEmail = "abdellahsebti001@gmail.com";
// Generated strong password - make sure to share this with the admin securely
export const adminPassword = "F9k#2pL$7xQz@5Jm!8Tb";

export default app;
