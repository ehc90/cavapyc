import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDirgl5tDO67W3CPCmIuO7g1NtSpXQp5hA",
    authDomain: "cavapyc.firebaseapp.com",
    projectId: "cavapyc",
    storageBucket: "cavapyc.firebasestorage.app",
    messagingSenderId: "180680187560",
    appId: "1:180680187560:web:34b4fbbd8c2522937a6c9d"
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
