import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyByKqFEbe67h2CfVhGR80TX7BAjI9nRre0",
  authDomain: "travel-booking-web-application.firebaseapp.com",
  projectId: "travel-booking-web-application",
  storageBucket: "travel-booking-web-application.firebasestorage.app",
  messagingSenderId: "766483132172",
  appId: "1:766483132172:web:17111be277053195abe329"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("destinations-container");

  async function loadDestinations() {
    const querySnapshot = await getDocs(collection(db, "destinations"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.name}" />
        <div class="card-content">
          <h3>${data.name}</h3>
          <p>${data.description}</p>
          <div class="tags">
            ${(data.tags || []).map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="rating">⭐ ${data.rating || 'N/A'}/5</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  loadDestinations();
});
