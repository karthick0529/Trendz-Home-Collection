import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize the providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

// General function for sign-in using any provider
const signInWithProvider = (provider) => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      // Handle success (store user info or any additional operations)
      return result.user; // Returning the user object in case you want to use it
    })
    .catch((error) => {
      console.error(error);
      // Handle errors (display an error message, etc.)
      throw error;
    });
};

// Google Sign-In
export const signInWithGoogle = () => signInWithProvider(googleProvider);

// Facebook Sign-In
export const signInWithFacebook = () => signInWithProvider(facebookProvider);

// GitHub Sign-In
export const signInWithGithub = () => signInWithProvider(githubProvider);

export default app;