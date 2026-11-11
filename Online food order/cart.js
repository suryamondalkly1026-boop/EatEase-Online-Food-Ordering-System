// GET CART DATA
function getCartItems() {
    return JSON.parse(localStorage.getItem("foodieCart")) || [];
}

// SAVE CART DATA
function saveCartItems(cart) {
    localStorage.setItem("foodieCart", JSON.stringify(cart));
    updateCartCount();
}

// DISPLAY CART
function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;
    let cart = getCartItems();
    cartItemsContainer.innerHTML = "";

    // EMPTY CART
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your Cart is Empty!</h2>
                <p>You haven't added any food items yet.</p>
                <a href="menu.html" class="btn-primary">
                    Explore Menu →
                </a>
            </div>
        `;
        updateBill(0);
        return;
    }

    // DISPLAY FOOD CARDS
    cart.forEach(item => {
        const card = document.createElement("div");
        card.className = "cart-item";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <div class="cart-item-price">
                    ₹${item.price * item.quantity}
                </div>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>
                </div>
                <button class="remove-item"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(card);
    });
    calculateBill();
}

// INCREASE QUANTITY
function increaseQuantity(id) {
    let cart = getCartItems();
    let item = cart.find(food => food.id === id);
    if (item) {
        item.quantity++;
    }
    saveCartItems(cart);
    displayCart();
}

// DECREASE QUANTITY
function decreaseQuantity(id) {
    let cart = getCartItems();
    let item = cart.find(food => food.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(food => food.id !== id);
        }
    }
    saveCartItems(cart);
    displayCart();
}

// REMOVE ITEM
function removeItem(id) {
    let cart = getCartItems();
    cart = cart.filter(food => food.id !== id);
    saveCartItems(cart);
    displayCart();
}

// CALCULATE BILL
function calculateBill() {
    let cart = getCartItems();
    let subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    updateBill(subtotal);
}

// UPDATE BILL
function updateBill(subtotal) {
    let deliveryCharge = subtotal > 0 ? 30 : 0;
    let discount = 0;
    if (subtotal >= 499) {
        deliveryCharge = 0;
    }
    let grandTotal = subtotal + deliveryCharge - discount;
    document.getElementById("subtotal").textContent = "₹" + subtotal;
    document.getElementById("delivery-charge").textContent =
        "₹" + deliveryCharge;
    document.getElementById("discount").textContent =
        "₹" + discount;
    document.getElementById("grand-total").textContent =
        "₹" + grandTotal;
}

// INITIALIZE CART
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});
