// js/trips.js
async function loadTrips() {
  const response = await fetch('data/trips.json');
  const trips = await response.json();

  const container = document.getElementById('destinations-container');
  container.innerHTML = '';

  trips.forEach(trip => {
    const card = document.createElement('div');
    card.className = 'trip-card';
    card.innerHTML = `
      <h2>${trip.destination}</h2>
      <p>${trip.description}</p>
      <p><strong>Dates:</strong> ${trip.dates}</p>
      <p><strong>Price:</strong> $${trip.price}</p>
      <button onclick="viewTrip('${trip.id}')">View Details</button>
    `;
    container.appendChild(card);
  });
}

function viewTrip(tripId) {
  localStorage.setItem('selectedTrip', tripId);
  window.location.href = 'trip.html';
}

loadTrips();
