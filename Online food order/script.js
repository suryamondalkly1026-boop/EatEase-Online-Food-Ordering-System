// Food Database
const foodItems = [

    {
        id: 1,
        name: "Cheese Pizza",
        category: "pizza",
        price: 199,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        description: "Delicious cheese-loaded pizza with fresh toppings."
    },

    {
        id: 2,
        name: "Chicken Burger",
        category: "burger",
        price: 149,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        description: "Fresh and crispy chicken burger."
    },

    {
        id: 3,
        name: "Chicken Biryani",
        category: "biryani",
        price: 249,
        rating: 4.8,
        image: "chiken biriyani.jpg",
        description: "Authentic aromatic chicken biryani."
    },

    {
        id: 4,
        name: "Veg Pizza",
        category: "pizza",
        price: 179,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
        description: "Fresh vegetable pizza with melted cheese."
    },

    {
        id: 5,
        name: "Classic Burger",
        category: "burger",
        price: 119,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
        description: "Classic burger with fresh vegetables."
    },

    {
        id: 6,
        name: "Veg Biryani",
        category: "biryani",
        price: 179,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600",
        description: "Flavourful vegetable biryani."
    },

    {
        id: 7,
        name: "Hakka Noodles",
        category: "noodles",
        price: 129,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600",
        description: "Delicious stir-fried Hakka noodles."
    },

    {
        id: 8,
        name: "Chicken Noodles",
        category: "noodles",
        price: 169,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600",
        description: "Hot noodles with delicious chicken."
    },

    {
        id: 9,
        name: "Chocolate Cake",
        category: "dessert",
        price: 99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        description: "Soft and delicious chocolate cake."
    },

    {
        id: 10,
        name: "Ice Cream",
        category: "dessert",
        price: 79,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600",
        description: "Creamy and refreshing ice cream."
    },

    {
        id: 11,
        name: "Cold Coffee",
        category: "drinks",
        price: 89,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
        description: "Refreshing chilled cold coffee."
    },

    {
        id: 12,
        name: "Fresh Orange Juice",
        category: "drinks",
        price: 69,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600",
        description: "Fresh and healthy orange juice."
    }
];

// GET CART FROM LOCAL STORAGE
function getCart() {
    return JSON.parse(localStorage.getItem("foodieCart")) || [];
}

// SAVE CART TO LOCAL STORAGE
function saveCart(cart) {
    localStorage.setItem("foodieCart", JSON.stringify(cart));
    updateCartCount();
}

// ADD FOOD TO CART
function addToCart(foodId) {
    let cart = getCart();
    let food = foodItems.find(item => item.id === foodId);
    if (!food) return;
    let existingItem = cart.find(item => item.id === foodId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1
        });
    }
    saveCart(cart);
    alert(food.name + " added to your cart!");
}

function updateCartCount() {
    let cart = getCart();
    let totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});