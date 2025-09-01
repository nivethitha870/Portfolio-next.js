// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config (copy pannitu paste pannu)
const firebaseConfig = {
  apiKey: "AIzaSyDbjm9Pt1SIE5paNZF6fvkAz4Mtt6xst2A",
  authDomain: "mynextjs-portfolio-680fa.firebaseapp.com",
  projectId: "mynextjs-portfolio-680fa",
  storageBucket: "mynextjs-portfolio-680fa.appspot.com",
  messagingSenderId: "1049288933841",
  appId: "1:1049288933841:web:979450d9aee2d8cbc660f0",
  measurementId: "G-0MH0Q3R3D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
