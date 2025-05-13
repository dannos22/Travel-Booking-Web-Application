// login.js
import { auth } from './firebase-init.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const authMessage = document.getElementById("auth-message");

loginBtn.addEventListener("click", async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    authMessage.textContent = `Logged in as ${userCredential.user.email}`;
    window.location.href = "index.html"; // Redirect to homepage
  } catch (error) {
    authMessage.textContent = error.message;
  }
});

signupBtn.addEventListener("click", async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    authMessage.textContent = `Signed up as ${userCredential.user.email}`;
    window.location.href = "index.html"; // Redirect to homepage
  } catch (error) {
    authMessage.textContent = error.message;
  }
});
