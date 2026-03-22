// Grab references to the menu and order containers in the DOM
const menuContainer = document.getElementById("menu-container")
const orderContainer = document.getElementById("order-container")

// Array to store the user's current order items
let order = []


/* ================================
   RENDER MENU
================================ */

// Dynamically builds and injects menu HTML from menuArray in data.js
function renderMenu() {
    menuContainer.innerHTML = menuArray.map(
        function(item) {
            return `
                <div class="menu-item">
                    <span class="menu-emoji">${item.emoji}</span>
                    <div class="item-text">
                        <h3>${item.name}</h3>
                        <p class="ingredients">${item.ingredients.join(", ")}</p>
                        <p class="price">$${item.price}</p>
                    </div>
                    <!-- data-id stores the item's id so we know which item was clicked -->
                    <button data-id="${item.id}">+</button>
                </div>
            `
        }).join("") // join() removes commas between array items
}

// Render the menu on page load
renderMenu()


/* ================================
   ADD TO ORDER
================================ */

// Listen for clicks on the menu container (event delegation)
menuContainer.addEventListener("click", function(e) {
    // Only respond if a + button was clicked (it has a data-id attribute)
    if (e.target.dataset.id) {
        addToOrder(e.target.dataset.id)
    }
})

// Find the clicked item in menuArray and add it to the order array
function addToOrder(itemId) {
    // find() returns the first item where the condition is true
    // Number() converts the string id from dataset back to a number
    const item = menuArray.find(function(menuItem) {
        return menuItem.id === Number(itemId)
    })
    order.push(item)
    renderOrder() // Re-render the order section to show the new item
}


/* ================================
   RENDER ORDER
================================ */

// Builds and injects the full order section HTML
function renderOrder() {
    // reduce() sums up all item prices, starting from 0
    const total = order.reduce(function(sum, item) {
        return sum + item.price
    }, 0)

    orderContainer.innerHTML = `
        <h3 class="order-heading">Your Order</h3>
        ${order.map(function(item) {
            return `
                <div class="order-item">
                    <h3>${item.name}</h3>
                    <!-- data-id on remove button identifies which item to remove -->
                    <button data-id="${item.id}">remove</button>
                    <p class="price">$${item.price}</p>
                </div>
            `
        }).join("")}
        <div class="total-price">
            <h3>Total price:</h3>
            <p>$${total}</p>
        </div>
        <button class="complete-order-btn">Complete order</button>
    `
}


/* ================================
   REMOVE FROM ORDER / SHOW MODAL
================================ */

// Listen for clicks inside the order container (event delegation)
orderContainer.addEventListener("click", function(e) {
    // If a remove button was clicked, remove that item from the order
    if (e.target.dataset.id) {
        removeFromOrder(e.target.dataset.id)
    }
    // If "Complete order" was clicked, show the payment modal
    if (e.target.classList.contains("complete-order-btn")) {
        document.querySelector(".modal-content").style.display = "block"
    }
})

// Remove an item from the order array by its id
function removeFromOrder(itemId) {
    // findIndex() returns the position of the item in the array
    const index = order.findIndex(function(orderItem) {
        return orderItem.id === Number(itemId)
    })
    // splice(index, 1) removes 1 item at the found position
    order.splice(index, 1)
    renderOrder() // Re-render to reflect the removal
}


/* ================================
   PAYMENT FORM SUBMISSION
================================ */

// Listen for form submission (handles required field validation automatically)
document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault() // Prevent page refresh on form submit
    const name = document.getElementById("name-input").value
    document.querySelector(".modal-content").style.display = "none" // Hide modal
    // Replace order section with personalised confirmation message
    orderContainer.innerHTML = `<p class="confirmation-msg">Thanks, ${name}! Your order is on its way!</p>`
})
