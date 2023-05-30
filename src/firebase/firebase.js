// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ1VGgoZgwzoLPagAStSeN9lZSQwI6m7M",
  authDomain: "todolist-88671.firebaseapp.com",
  projectId: "todolist-88671",
  storageBucket: "todolist-88671.appspot.com",
  messagingSenderId: "618142581404",
  appId: "1:618142581404:web:d460ea563ccb2214b72359",
  measurementId: "G-MWD2Y6BQNX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseDatabase = getFirestore(app);