// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDW7O25tk3gS89VcpxcPQXx5sVFBj25WLs",
    authDomain: "social-media-a6727.firebaseapp.com",
    projectId: "social-media-a6727",
    storageBucket: "social-media-a6727.firebasestorage.app",
    messagingSenderId: "70292877237",
    appId: "1:70292877237:web:18df12ad4cf462286b73fc",
    measurementId: "G-BZ5F9TM7FD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);