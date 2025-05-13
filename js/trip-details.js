// trip-details.js

import { db, auth } from "./firebase-init.js";
import {
    doc,
    getDoc,
    addDoc,
    collection,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const container = document.getElementById("trip-details-container");
const selectedTripId = localStorage.getItem("selectedTripId");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    loadTripDetails();
});

async function loadTripDetails() {
    if (!selectedTripId) {
        container.innerHTML = "<p>No trip selected.</p>";
        return;
    }

    try {
        const docRef = doc(db, "destinations", selectedTripId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            container.innerHTML = "<p>Trip not found.</p>";
            return;
        }

        const trip = docSnap.data();

        container.innerHTML = `
            <div class="trip-card">
                <h2>${trip.location}</h2>
                <img src="${trip.imageURL}" alt="${trip.location}" style="width:100%; max-width:600px;">
                <p><strong>Date:</strong> ${trip.date}</p>
                <p><strong>Price:</strong> $${trip.price}</p>
                <p><strong>Rating:</strong> ${trip.rating} ⭐</p>
                <p>${trip.description}</p>
                <p><strong>Tags:</strong> ${trip.tags.join(", ")}</p>
                ${currentUser ? `<button id="bookBtn">Book Now</button>` : `<p><em>Please sign in to book this trip.</em></p>`}
            </div>
        `;

        if (currentUser) {
            document.getElementById("bookBtn").addEventListener("click", () => bookTrip(trip));
        }
    } catch (error) {
        console.error("Failed to fetch trip details:", error);
        container.innerHTML = "<p>Error loading trip details.</p>";
    }
}

async function bookTrip(trip) {
    try {
        await addDoc(collection(db, "bookings"), {
            userEmail: currentUser.email,
            tripId: selectedTripId,
            bookedAt: serverTimestamp(),
            location: trip.location,
            date: trip.date,
            price: trip.price
        });
        alert("Trip booked successfully!");
    } catch (error) {
        console.error("Error booking trip:", error);
        alert("There was a problem booking the trip.");
    }
}
