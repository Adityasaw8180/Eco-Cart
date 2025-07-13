import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDxVXJXJXJXJXJXJXJXJXJXJXJXJXJXJXJX",
  authDomain: "ecocart-hackathon.firebaseapp.com",
  projectId: "ecocart-hackathon",
  storageBucket: "ecocart-hackathon.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuv"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const emailProvider = new EmailAuthProvider();

export { auth, db, storage, googleProvider, facebookProvider, emailProvider }; 