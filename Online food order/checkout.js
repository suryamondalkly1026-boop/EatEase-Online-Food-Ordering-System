// Get HTML Elements
const checkoutForm = document.getElementById("checkout-form");
const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutDelivery = document.getElementById("checkout-delivery");
const checkoutTotal = document.getElementById("checkout-total");

// GET CART DATA
function getCheckoutCart() {
    return JSON.parse(localStorage.getItem("foodieCart")) || [];

}

// DISPLAY CHECKOUT ITEMS
function displayCheckoutItems() {
    let cart = getCheckoutCart();
    checkoutItems.innerHTML = "";
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p class="empty-checkout">
                Your cart is empty.
                <a href="menu.html">Explore Menu</a>
            </p>
        `;
        checkoutSubtotal.textContent = "₹0";
        checkoutDelivery.textContent = "₹0";
        checkoutTotal.textContent = "₹0";
        return;
    }

    cart.forEach(item => {
        let itemElement = document.createElement("div");
        itemElement.className = "checkout-item";
        itemElement.innerHTML = `
            <span>
                ${item.name} × ${item.quantity}
            </span>
            <span>
                ₹${item.price * item.quantity}
            </span>
        `;
        checkoutItems.appendChild(itemElement);
    });
    calculateCheckoutTotal();
}

// CALCULATE CHECKOUT TOTAL
function calculateCheckoutTotal() {
    let cart = getCheckoutCart();
    let subtotal = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    let deliveryCharge = subtotal >= 499 ? 0 : 30;
    let grandTotal = subtotal + deliveryCharge;
    checkoutSubtotal.textContent = "₹" + subtotal;
    checkoutDelivery.textContent = "₹" + deliveryCharge;
    checkoutTotal.textContent = "₹" + grandTotal;

    return {
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        grandTotal: grandTotal
    };
}

// GENERATE UNIQUE ORDER ID
function generateOrderID() {
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    return "FH" + randomNumber;
}

// FORM VALIDATION AND ORDER PLACEMENT
checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let cart = getCheckoutCart();

    // Check Empty Cart
    if (cart.length === 0) {
        alert("Your cart is empty! Please add food items first.");
        window.location.href = "menu.html";
        return;
    }

    // Get Customer Information
    let customerName = document.getElementById("customer-name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let pincode = document.getElementById("pincode").value.trim();

    // Get Payment Method
    let paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    // Validate Customer Name
    if (customerName.length < 3) {
        alert("Please enter a valid name.");
        return;
    }

    // Validate Phone Number
    if (!/^[6-9]\d{9}$/.test(phone)) {
        alert("Please enter a valid 10-digit Indian mobile number.");
        return;
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate Address
    if (address.length < 10) {
        alert("Please enter a complete delivery address.");
        return;
    }

    // Validate City
    if (city.length < 2) {
        alert("Please enter a valid city name.");
        return;
    }

    // Validate PIN Code
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
        alert("Please enter a valid 6-digit Indian PIN code.");
        return;
    }

    // Calculate Final Amount
    let bill = calculateCheckoutTotal();

    // Create Order Object
    let order = {
        orderID: generateOrderID(),
        customer: {
            name: customerName,
            phone: phone,
            email: email,
            address: address,
            city: city,
            pincode: pincode
        },

        items: cart,
        paymentMethod: paymentMethod,
        subtotal: bill.subtotal,
        deliveryCharge: bill.deliveryCharge,
        totalAmount: bill.grandTotal,
        orderStatus: "Confirmed",
        orderDate: new Date().toLocaleString()
    };

    // Save Order Information
    localStorage.setItem(
        "foodieLastOrder",
        JSON.stringify(order)
    );

    // Save Order History
    let orderHistory = JSON.parse(
        localStorage.getItem("foodieOrders")
    ) || [];
    orderHistory.push(order);
    localStorage.setItem(
        "foodieOrders",
        JSON.stringify(orderHistory)
    );

    // Clear Shopping Cart
    localStorage.removeItem("foodieCart");

    // Redirect to Success Page
    window.location.href = "order-success.html";
});

// INITIALIZE CHECKOUT
document.addEventListener("DOMContentLoaded", function () {
    displayCheckoutItems();
});