// results.js

import { db } from "./firebase-init.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function showResults() {
    const searchLocation = localStorage.getItem("searchLocation")?.toLowerCase() || "";
    const searchBudget = parseFloat(localStorage.getItem("searchBudget")) || Infinity;
    const searchDate = localStorage.getItem("searchDate") || "";

    const container = document.getElementById("results-container");
    container.innerHTML = "<p>Loading trips...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        container.innerHTML = ""; // Clear loading message

        let found = false;

        querySnapshot.forEach(doc => {
            const trip = doc.data();

            const matchesLocation = trip.location?.toLowerCase().includes(searchLocation);
            const matchesBudget = !isNaN(trip.price) && trip.price <= searchBudget;
            const matchesDate = !searchDate || trip.date === searchDate;

            if (matchesLocation && matchesBudget && matchesDate) {
                found = true;

                const card = document.createElement("div");
                card.className = "trip-card";
                card.innerHTML = `
                    <h2>${trip.location}</h2>
                    <img src="${trip.imageURL}" alt="${trip.location}" style="width:100%; max-height:200px; object-fit:cover;" />
                    <p><strong>Date:</strong> ${trip.date}</p>
                    <p><strong>Price:</strong> $${trip.price}</p>
                    <p><strong>Rating:</strong> ${trip.rating}</p>
                    <p>${trip.description}</p>
                    <button onclick="viewTrip('${doc.id}')">View Details</button>
                `;
                container.appendChild(card);
            }
        });

        if (!found) {
            container.innerHTML = "<p>No trips match your search. Try different criteria.</p>";
        }

    } catch (error) {
        console.error("Error loading trips:", error);
        container.innerHTML = "<p>Error loading trips. Please try again later.</p>";
    }
}

function viewTrip(id) {
    localStorage.setItem("selectedTripId", id);
    window.location.href = "trip-details.html";
}

window.onload = showResults;
