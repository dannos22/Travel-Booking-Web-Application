// admin.js

import { db } from "./firebase-init.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const form = document.getElementById("add-trip-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const location = document.getElementById("location").value.trim();
    const date = document.getElementById("date").value;
    const price = parseFloat(document.getElementById("price").value);
    const rating = parseFloat(document.getElementById("rating").value);
    const description = document.getElementById("description").value.trim();
    const imageURL = document.getElementById("imageURL").value.trim();
    const tagsInput = document.getElementById("tags").value.trim();
    const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];

    try {
        await addDoc(collection(db, "destinations"), {
            location,
            date,
            price,
            rating,
            description,
            imageURL,
            tags
        });

        status.textContent = "Trip added successfully!";
        form.reset();
    } catch (error) {
        console.error("Error adding trip:", error);
        status.textContent = "Failed to add trip. Check console for details.";
    }
});
