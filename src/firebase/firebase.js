import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBhfYJqicZ1HTcyj7wKypwiA-DmXTOASpk",
    authDomain: "ecochartassistant.firebaseapp.com",
    projectId: "ecochartassistant",
    storageBucket: "ecochartassistant.firebasestorage.app",
    messagingSenderId: "533582235159",
    appId: "1:533582235159:web:93b7ea8e7dbda12c133e52",
    measurementId: "G-32XGY2NXWY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
