// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcRNM6XTSLYs6ocbxt2_ECa2r2PH8Fl8Y",
  authDomain: "inventoryapp-7782c.firebaseapp.com",
  projectId: "inventoryapp-7782c",
  storageBucket: "inventoryapp-7782c.appspot.com",
  messagingSenderId: "282262248149",
  appId: "1:282262248149:web:202fd4246f0732ae7f205c",
  measurementId: "G-LPZH51RL8C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
const authenticate = getAuth(app)

export { app, storage, db, authenticate };
