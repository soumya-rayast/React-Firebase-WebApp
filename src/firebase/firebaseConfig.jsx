// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY3lvjS8v2zZvO8tmUKZQ6BZ_M0Sb3VT8",
  authDomain: "react-firebase-webapp-28102.firebaseapp.com",
  projectId: "react-firebase-webapp-28102",
  storageBucket: "react-firebase-webapp-28102.appspot.com",
  messagingSenderId: "657655928755",
  appId: "1:657655928755:web:fb5660eaabe2fc0cd29dc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// for Initialize firebase 
 const db = getFirestore(app);

// for initialize storage 
export const storage = getStorage(); 
export default db;