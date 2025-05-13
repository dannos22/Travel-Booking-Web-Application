// Firebase SDK (v10.10.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// 🔐 Firebase config
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
const auth = getAuth(app);

// Form submission handler
document.getElementById("register-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Account created successfully!");
            // Redirect to homepage or dashboard
            window.location.href = "Website.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
