// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAiF6AukDhkj1hbaoKK6Iw9imrmWJFnNFQ",
  authDomain: "fir-78f97.firebaseapp.com",
  databaseURL: "https://fir-78f97-default-rtdb.firebaseio.com",
  projectId: "fir-78f97",
  storageBucket: "fir-78f97.firebasestorage.app",
  messagingSenderId: "315472783806",
  appId: "1:315472783806:web:1b6d0ba68bac5bc38431ef",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
