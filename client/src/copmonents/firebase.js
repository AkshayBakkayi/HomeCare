// Import Firebase core
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7C3Ctqvdb8j5hlbZKh-oM3lumAbEGPyM",
  authDomain: "homecare-6ae51.firebaseapp.com",
  projectId: "homecare-6ae51",
  storageBucket: "homecare-6ae51.firebasestorage.app",
  messagingSenderId: "489454649000",
  appId: "1:489454649000:web:34a101ac9a445c72308c9d",
  measurementId: "G-Z0TF3BP9H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);