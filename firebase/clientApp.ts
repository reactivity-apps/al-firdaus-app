// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyD-pwbMwQ9cKjs0HkhCa8_rwXQaE8Q8aWM",
  authDomain: "afa-dev-1a8f6.firebaseapp.com",
  projectId: "afa-dev-1a8f6",
  storageBucket: "afa-dev-1a8f6.firebasestorage.app",
  messagingSenderId: "874096223889",
  appId: "1:874096223889:web:943574869fa73c3f6b4130"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);

// Initialize Firebase authentication
// export const auth = getAuth(app);