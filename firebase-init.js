// firebase-init.js
// This file initializes Firebase and exports auth and firestore instances

// Import Firebase core and services
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase configuration (replace with your actual Firebase project config)
const firebaseConfig = {
    apiKey: "AIzaSyByKqFEbe67h2CfVhGR80TX7BAjI9nRre0",
    authDomain: "travel-booking-web-application.firebaseapp.com",
    projectId: "travel-booking-web-application",
    storageBucket: "travel-booking-web-application.firebasestorage.app",
    messagingSenderId: "766483132172",
    appId: "1:766483132172:web:17111be277053195abe329"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);