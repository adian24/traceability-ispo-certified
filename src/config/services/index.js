import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAuVV6VBoaLd8BYblZi6hlvBXXQe95aQFU",
  authDomain: "label-maps.firebaseapp.com",
  projectId: "label-maps",
  storageBucket: "label-maps.appspot.com",
  messagingSenderId: "257649634517",
  appId: "1:257649634517:web:a65600720a0eb48248c65c",
  measurementId: "G-NFBDMT2Z7T"
};


  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

//login with google account
export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
}

//register email pass
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

//login email pass
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

//reset pass
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
}

export const emailVerification = () => {
  return sendEmailVerification(auth.currentUser)
}

// logout
export const logout = () => {
  return signOut(auth);
}

//custom hook
// export function useAuth() {
//   const [ currentUser, setCurrentUser ] = useState();

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
//     return unsub;
//   }, [])

//   return currentUser;
// }

