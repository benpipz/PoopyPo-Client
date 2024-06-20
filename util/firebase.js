// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp_6Pr2IREbREXed-htSLpO2aYeCSRREo",
  authDomain: "poopypo-e7e2b.firebaseapp.com",
  projectId: "poopypo-e7e2b",
  storageBucket: "poopypo-e7e2b.appspot.com",
  messagingSenderId: "869574490096",
  appId: "1:869574490096:web:664bca74e93c2382b34f35",
  measurementId: "G-KMGTLH4DB8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
