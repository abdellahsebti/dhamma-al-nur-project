
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
  apiKey: "AIzaSyDnGjHrKVCdHt78-DW3tkHq7Nzv86YdCmg",
  authDomain: "dhamma-al-nur-project.firebaseapp.com",
  projectId: "dhamma-al-nur-project",
  storageBucket: "dhamma-al-nur-project.firebasestorage.app",
  messagingSenderId: "479477583909",
  appId: "1:479477583909:web:91ab605ce0f93d37acefcc",
  measurementId: "G-JQE6XPY8ZT"
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
