import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP7zTp1JSOBAc4nakEpJWryADEr4jmdF4",
  authDomain: "basketball-app-caba1.firebaseapp.com",
  projectId: "basketball-app-caba1",
  storageBucket: "basketball-app-caba1.firebasestorage.app",
  messagingSenderId: "358028624503",
  appId: "1:358028624503:web:72134a7994b2040852fc72",
};

export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);