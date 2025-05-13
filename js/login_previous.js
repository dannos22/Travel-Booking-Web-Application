import { getAuth, signInWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

// 🔐 Replace these with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyByKqFEbe67h2CfVhGR80TX7BAjI9nRre0",
    authDomain: "travel-booking-web-application.firebaseapp.com",
    projectId: "travel-booking-web-application",
    storageBucket: "travel-booking-web-application.firebasestorage.app",
    messagingSenderId: "766483132172",
    appId: "1:766483132172:web:17111be277053195abe329"
};

// Initializae Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// inputs
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

// submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault()

    // inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Creating Account...")
            window.location.href = "Website.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        })
});

// Login Form Handler
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            console.log("User:", userCredential.user);
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
})
