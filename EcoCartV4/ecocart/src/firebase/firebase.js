import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhfYJqicZ1HTcyj7wKypwiA-DmXTOASpk",
    authDomain: "ecochartassistant.firebaseapp.com",
    projectId: "ecochartassistant",
    storageBucket: "ecochartassistant.firebasestorage.app",
    messagingSenderId: "533582235159",
    appId: "1:533582235159:web:93b7ea8e7dbda12c133e52",
    measurementId: "G-32XGY2NXWY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
