// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI-oc81k5wjJMLqEMFyoAibH3ThfXa__E",
  authDomain: "trendy-collection-de6bc.firebaseapp.com",
  projectId: "trendy-collection-de6bc",
  storageBucket: "trendy-collection-de6bc.appspot.com",
  messagingSenderId: "794031777479",
  appId: "1:794031777479:web:b0874cd461ec6b883700e2",
  measurementId: "G-RMZ2F9BQ48"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
