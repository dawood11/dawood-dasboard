// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const authCheck = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
        return authUser;
    } else {
        return null;
    }
});

export const signInWithGoogle = async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider())
        .then((response) => response.user)
        .catch((error) => console.log(error));
};

export const signOutFirebase = async () => await signOut(auth);
