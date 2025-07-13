// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh5VBIRbwehegJ2EMOtYD1VcZTNWPHqZQ",
  authDomain: "danny-535a3.firebaseapp.com",
  projectId: "danny-535a3",
  storageBucket: "danny-535a3.firebasestorage.app",
  messagingSenderId: "236838720466",
  appId: "1:236838720466:web:85cf23d314039fbf1b6e0b",
  measurementId: "G-MYZ3KHNHHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);