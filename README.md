# EatEase -- Online Food Ordering System

EatEase is a front-end online food ordering website developed as a
university project. Users can explore food items, search and filter the
menu, add products to a shopping cart, change quantities, and place a
demo order.

## Features

-   **Home page:** Landing page with food highlights, categories,
    popular items, and navigation.
-   **Food menu:** Displays food items with images, prices, ratings, and
    descriptions.
-   **Search and category filters:** Search for food by name and filter
    by category.
-   **Shopping cart:** Add items, view selected products, increase or
    decrease quantities, and remove items.
-   **Order summary:** Calculates subtotal, delivery charge, discount
    display, and grand total.
-   **Checkout:** Collects customer and delivery information and lets
    the user select Cash on Delivery or demo UPI.
-   **Order confirmation:** Displays the generated order ID, customer
    details, ordered items, and payable amount.
-   **Responsive layout:** CSS includes responsive rules for different
    screen sizes.
-   **Browser storage:** Uses `localStorage` to keep cart and order data
    in the browser.

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript
-   Browser Local Storage
-   Google Fonts (Poppins)
-   Unsplash images for selected food items

## Project Structure

Arrange the project files like this. Keep the food image in the same
main folder as the HTML files.

``` text
EatEase/
│
├── index.html
├── menu.html
├── cart.html
├── checkout.html
├── order-success.html
│
├── style.css
│
├── script.js
├── menu.js
├── cart.js
├── checkout.js
├── order-success.js
│
├── chiken biriyani.jpg
└── README.md
```

> If your downloaded files have names such as `index.html`,
> `menu.js`, or `style.css`, rename them to the names shown above.
> The HTML files refer to these standard filenames.

## How to Run the Project

1.  Download or clone this repository.
2.  Keep all HTML, CSS, JavaScript, and image files in the structure
    shown above.
3.  Open the project folder in Visual Studio Code.
4.  Install the **Live Server** extension if it is not already
    installed.
5.  Right-click `index.html` and select **Open with Live Server**.
6.  Open the **Menu** page, add food items, and visit the **Cart** page
    to test the ordering flow.

You can also open `index.html` directly in a browser, but Live Server is
recommended during development.

## How the Project Works

1.  The food database is defined in `script.js`.
2.  `menu.js` displays the food cards and handles searching and category
    filtering.
3.  When a user adds an item, `script.js` saves it in browser
    `localStorage` using the key `foodieCart`.
4.  `cart.js` reads the saved cart, displays the food cards, updates
    quantities, removes items, and calculates the cart total.
5.  `checkout.js` displays the order summary, validates the customer
    form, generates an order ID, and saves the order.
6.  After placing an order, the cart is cleared and the user is
    redirected to `order-success.html`.
7.  `order-success.js` reads the saved order and displays its
    confirmation details.

## Delivery and Payment Notes

-   Delivery charge is **₹30** when the subtotal is below **₹499**.
-   Delivery is free when the subtotal is **₹499 or more**.
-   The current cart code displays a discount row, but the discount is
    set to **₹0**.
-   Cash on Delivery is available as a demo option.
-   UPI is labelled as a demo option. **No real payment is processed.**

## Important Limitations

This is a front-end demonstration project. It does not currently use a
server, database, user authentication, live restaurant inventory, real
order dispatch, or a payment gateway.

Cart and order information are stored in the browser's `localStorage`.
This means the data is local to that browser and device; it is not
shared with a restaurant or another user.

## Image Notes

The Chicken Biryani image is stored locally as `chiken biriyani.jpg`.
Keep the spelling and filename exactly the same as the image reference
in `script.js` and `index.html`, or update those references if you
rename the image.

Some other food images are loaded from Unsplash URLs, so an internet
connection is required to display those images.

## Future Improvements

-   Add a backend and database to store users, products, and orders.
-   Add user registration and login.
-   Integrate a real payment gateway.
-   Add order tracking and order history.
-   Add an admin panel to manage food items and orders.
-   Add form and security validation on the server.

## Academic Project

**Project:** EatEase -- Online Food Ordering System
**Project Type:** Front-end web development / University project
**Developer:** Surya Mondal

------------------------------------------------------------------------

Made with HTML, CSS, and JavaScript.
