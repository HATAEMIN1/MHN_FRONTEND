// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebaseApiKey,
  authDomain: process.env.REACT_APP_firebaseAuthDomain,
  databaseURL: process.env.REACT_APP_firebaseDatabaseURL,
  projectId: process.env.REACT_APP_firebaseProjectId,
  storageBucket: process.env.REACT_APP_firebaseStorageBucket,
  messagingSenderId: process.env.REACT_APP_firebaseMessagingSenderId,
  appId: process.env.REACT_APP_firebaseAppId,
  measurementId: process.env.REACT_APP_firebaseMeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);