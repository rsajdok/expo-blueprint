// Move it to .env file

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAR4BIZ6_cdKvZJSL9zQlek3X_saMWTGIk",
    authDomain: "oauth-firebase-3197c.firebaseapp.com",
    projectId: "oauth-firebase-3197c",
    storageBucket: "oauth-firebase-3197c.firebasestorage.app",
    messagingSenderId: "822419801480",
    appId: "1:822419801480:web:dd21702389df29eff4663d",
    measurementId: "G-JG640GMF8M"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
initializeApp(firebaseConfig);

export const auth = getAuth();
