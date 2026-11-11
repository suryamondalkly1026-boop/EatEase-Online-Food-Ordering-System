// Get HTML Elements
const orderIDElement = document.getElementById("success-order-id");
const customerNameElement = document.getElementById("success-customer-name");
const phoneElement = document.getElementById("success-phone");
const paymentElement = document.getElementById("success-payment");
const dateElement = document.getElementById("success-date");
const statusElement = document.getElementById("success-status");
const addressElement = document.getElementById("success-address");
const itemsContainer = document.getElementById("success-items");
const totalElement = document.getElementById("success-total");

// GET LATEST ORDER FROM LOCAL STORAGE
function getLatestOrder() {
    return JSON.parse(localStorage.getItem("foodieLastOrder"));
}

// DISPLAY ORDER DETAILS
function displayOrderDetails() {
    let order = getLatestOrder();

    // Check Whether Order Exists
    if (!order) {
        document.querySelector(".success-card").innerHTML = `
            <div class="success-icon">!</div>
            <h1>No Order Found</h1>
            <p class="success-description">
                We couldn't find your order information.
                Please place an order first.
            </p>
            <a href="menu.html" class="btn-primary">
                Explore Menu →
            </a>
        `;
        return;
    }

    // Display Customer Information
    orderIDElement.textContent = order.orderID;
    customerNameElement.textContent = order.customer.name;
    phoneElement.textContent = order.customer.phone;
    paymentElement.textContent = order.paymentMethod;
    dateElement.textContent = order.orderDate;
    statusElement.textContent = order.orderStatus;

    // Display Delivery Address
    addressElement.textContent =
        order.customer.address + ", " +
        order.customer.city + " - " +
        order.customer.pincode;

    // Display Total Amount
    totalElement.textContent = "₹" + order.totalAmount;


    // Display Ordered Food Items
    itemsContainer.innerHTML = "";
    order.items.forEach(item => {
        let itemElement = document.createElement("div");
        itemElement.className = "success-item";
        itemElement.innerHTML = `
            <span>
                ${item.name} × ${item.quantity}
            </span>
            <span>
                ₹${item.price * item.quantity}
            </span>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// INITIALIZE ORDER SUCCESS PAGE
document.addEventListener("DOMContentLoaded", function () {
    displayOrderDetails();
});