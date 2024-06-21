import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmYuXG8W9Am_J3lMFiQU7T15pf5AWBPG0",
  authDomain: "instaclone-4af3e.firebaseapp.com",
  projectId: "instaclone-4af3e",
  storageBucket: "instaclone-4af3e.appspot.com",
  messagingSenderId: "1023593970960",
  appId: "1:1023593970960:web:51dcb038c2fea7f841f995",
  measurementId: "G-8M30HNGJ8Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
