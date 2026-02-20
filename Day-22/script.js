// ==========================
// PROJECT NEXUS - Single JS File
// ==========================


// ==========================
// CENTRAL STATE OBJECT
// ==========================
const State = {

    coins: [],
    filteredCoins: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    theme: localStorage.getItem("theme") || "light"

};


// ==========================
// API MODULE
// ==========================
async function fetchCoins() {

    showLoading(true);

    try {

        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"
        );

        const data = await response.json();

        State.coins = data;
        State.filteredCoins = data;

        renderCoins(data);

    }
    catch (error) {

        showNotification("❌ Failed to fetch data");

    }

    showLoading(false);
}


// ==========================
// UI MODULE
// ==========================

// Render coin cards
function renderCoins(coins) {

    const container = document.getElementById("cardContainer");

    container.innerHTML = "";

    coins.forEach(coin => {

        const isFavorite = State.favorites.includes(coin.id);

        const card = `
        <div class="card">

            <img src="${coin.image}">
            <h3>${coin.name}</h3>

            <p>💲 Price: $${coin.current_price}</p>

            <button onclick="toggleFavorite('${coin.id}')">
                ${isFavorite ? "Remove Favorite" : "Add Favorite"}
            </button>

        </div>
        `;

        container.innerHTML += card;

    });

}


// Show loading spinner
function showLoading(show) {

    const loading = document.getElementById("loading");

    if(show)
        loading.classList.remove("hidden");
    else
        loading.classList.add("hidden");
}


// Show notification
function showNotification(message) {

    const notification = document.getElementById("notification");

    notification.innerText = message;

    setTimeout(() => {
        notification.innerText = "";
    }, 3000);

}


// ==========================
// FAVORITES MODULE
// ==========================
function toggleFavorite(id) {

    const index = State.favorites.indexOf(id);

    if(index === -1)
        State.favorites.push(id);
    else
        State.favorites.splice(index, 1);

    localStorage.setItem(
        "favorites",
        JSON.stringify(State.favorites)
    );

    renderCoins(State.filteredCoins);
}


// ==========================
// SEARCH MODULE
// ==========================
function searchCoins(text) {

    State.filteredCoins = State.coins.filter(coin =>
        coin.name.toLowerCase().includes(text.toLowerCase())
    );

    renderCoins(State.filteredCoins);
}


// ==========================
// SORT MODULE
// ==========================
function sortCoins(type) {

    if(type === "name") {

        State.filteredCoins.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    else if(type === "price") {

        State.filteredCoins.sort((a, b) =>
            b.current_price - a.current_price
        );

    }

    renderCoins(State.filteredCoins);
}


// ==========================
// THEME MODULE
// ==========================
function loadTheme() {

    if(State.theme === "dark")
        document.body.classList.add("dark");

}


function toggleTheme() {

    document.body.classList.toggle("dark");

    State.theme =
        document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", State.theme);

}


// ==========================
// EVENT LISTENERS
// ==========================
document
.getElementById("searchInput")
.addEventListener("input", e =>
    searchCoins(e.target.value)
);


document
.getElementById("sortSelect")
.addEventListener("change", e =>
    sortCoins(e.target.value)
);


document
.getElementById("themeToggle")
.addEventListener("click", toggleTheme);


// ==========================
// INIT APP
// ==========================
loadTheme();

fetchCoins();