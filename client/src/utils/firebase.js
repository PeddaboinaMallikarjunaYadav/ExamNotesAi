import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY, // Initilizing the API key from .env file
  authDomain: "authexamnotes-becbb.firebaseapp.com",
  projectId: "authexamnotes-becbb",
  storageBucket: "authexamnotes-becbb.firebasestorage.app",
  messagingSenderId: "948343990826",
  appId: "1:948343990826:web:520b23987d51a6d2117153"  
};

const app = initializeApp(firebaseConfig); // Initilizing the app to firebase

const auth = getAuth(app)  // Getting the authontication for the App

const provider = new GoogleAuthProvider()  // Initilizing the provider  

export {auth, provider}