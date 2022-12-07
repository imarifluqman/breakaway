import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPDnKkKjf0UQcUPM2k7gL4P_lpdyWHxoA",
  authDomain: "smittestweb.firebaseapp.com",
  projectId: "smittestweb",
  storageBucket: "smittestweb.appspot.com",
  messagingSenderId: "604678797820",
  appId: "1:604678797820:web:3f2cd2b21725e29c7ada79",
  measurementId: "G-XCFWF8EQZQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
