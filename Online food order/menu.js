// Get HTML Elements
const foodContainer = document.getElementById("food-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("no-results");

// Current Category
let selectedCategory = "all";

// DISPLAY FOOD ITEMS
function displayFoodItems(items) {
    foodContainer.innerHTML = "";
    if (items.length === 0) {
        noResults.hidden = false;
        return;
    }
    noResults.hidden = true;
    items.forEach(food => {
        let foodCard = document.createElement("div");
        foodCard.className = "menu-food-card";
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="menu-food-details">
                <h3>${food.name}</h3>
                <div class="food-rating">
                    ⭐ ${food.rating} / 5
                </div>
                <p>${food.description}</p>
                <div class="menu-food-bottom">
                    <span class="price">
                        ₹${food.price}
                    </span>
                    <button onclick="addToCart(${food.id})">
                        + Add to Cart
                    </button>
                </div>
            </div>
        `;
        foodContainer.appendChild(foodCard);
    });
}

// FILTER FOOD BY CATEGORY
function filterFood(category) {
    selectedCategory = category;
    let filteredFood;
    if (category === "all") {
        filteredFood = foodItems;
    } else {
        filteredFood = foodItems.filter(
            food => food.category === category
        );
    }

    // Apply search if text exists
    let searchText = searchInput.value.toLowerCase().trim();
    if (searchText !== "") {
        filteredFood = filteredFood.filter(food =>
            food.name.toLowerCase().includes(searchText)
        );
    }
    displayFoodItems(filteredFood);
}

// SEARCH FOOD
function searchFood() {
    let searchText = searchInput.value.toLowerCase().trim();
    let filteredFood = foodItems.filter(food => {
        let matchesName = food.name.toLowerCase().includes(searchText);
        let matchesCategory =
            selectedCategory === "all" ||
            food.category === selectedCategory;
        return matchesName && matchesCategory;
    });

    displayFoodItems(filteredFood);
}

// CATEGORY BUTTON EVENTS
filterButtons.forEach(button => {
    button.addEventListener("click", function () {

        // Remove previous active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        // Get selected category
        let category = this.dataset.category;
        filterFood(category);
    });
});

// SEARCH BUTTON EVENT
searchButton.addEventListener("click", searchFood);

// SEARCH WHILE TYPING
searchInput.addEventListener("input", searchFood);

// INITIALIZE MENU
displayFoodItems(foodItems);