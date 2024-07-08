// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt-J7sF1rmPeEXBBOpRvfw1WpaBERyw68",
  authDomain: "music-player-631fc.firebaseapp.com",
  projectId: "music-player-631fc",
  storageBucket: "music-player-631fc.appspot.com",
  messagingSenderId: "548615267971",
  appId: "1:548615267971:web:8a177b53f5aa0757d45db6",
  measurementId: "G-R9DHJZS3ND",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
