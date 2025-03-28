import { initializeApp, getApps } from "firebase/app";
import firebase from 'firebase';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnjoG5-MvBdFoYF1fd-qXPguSH2VUTMmw",
  authDomain: "amzn2-f8e83.firebaseapp.com",
  projectId: "amzn2-f8e83",
  storageBucket: "amzn2-f8e83.firebasestorage.app",
  messagingSenderId: "774461316507",
  appId: "1:774461316507:web:6d9bc91fc4dc47932dd53e"
};

// Initialize Firebase
const app = !firebase.apps.length? firebase.initializeApp(firebaseConfig) : firebase.app();


// Initialize Cloud Firestore and get a reference to the service

const db = app.firestore();

export { db };





/*
original code:
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBnjoG5-MvBdFoYF1fd-qXPguSH2VUTMmw",
  authDomain: "amzn2-f8e83.firebaseapp.com",
  projectId: "amzn2-f8e83",
  storageBucket: "amzn2-f8e83.firebasestorage.app",
  messagingSenderId: "774461316507",
  appId: "1:774461316507:web:6d9bc91fc4dc47932dd53e"
};

const app = !firebase.apps.length? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
export default db;


corrected by gemini:
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnjoG5-MvBdFoYF1fd-qXPguSH2VUTMmw",
  authDomain: "amzn2-f8e83.firebaseapp.com",
  projectId: "amzn2-f8e83",
  storageBucket: "amzn2-f8e83.firebasestorage.app",
  messagingSenderId: "774461316507",
  appId: "1:774461316507:web:6d9bc91fc4dc47932dd53e"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
*/