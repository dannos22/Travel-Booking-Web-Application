function searchTrips() {
    const location = document.getElementById("locationInput").value;
    const budget = document.getElementById("budgetInput").value;
    const date = document.getElementById("dateInput").value;

    localStorage.setItem("searchLocation", location);
    localStorage.setItem("searchBudget", budget);
    localStorage.setItem("searchDate", date);

    window.location.href = "results.html";
}

// Listen for Enter key press in any of the search fields
document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".search-box");
    inputs.forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                searchTrips();
            }
        });
    });
});
