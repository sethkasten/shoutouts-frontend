import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2C2AgLnS_RRWMGvgAsSYHaWGECWSz4os",
  authDomain: "shoutouts-3b5d5.firebaseapp.com",
  projectId: "shoutouts-3b5d5",
  storageBucket: "shoutouts-3b5d5.appspot.com",
  messagingSenderId: "656621035157",
  appId: "1:656621035157:web:8f9d52b6fb0e5e63cd059c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();
export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
