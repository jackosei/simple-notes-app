// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "simple-notes-app-8e895.firebaseapp.com",
  projectId: "simple-notes-app-8e895",
  storageBucket: "simple-notes-app-8e895.appspot.com",
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")