// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIDlz86Pf5HIV69ZKotp7qcCKSjdUZMyo",
  authDomain: "react-notes-b22aa.firebaseapp.com",
  projectId: "react-notes-b22aa",
  storageBucket: "react-notes-b22aa.appspot.com",
  messagingSenderId: "647498983971",
  appId: "1:647498983971:web:a5494ed350f200d0855f96",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
