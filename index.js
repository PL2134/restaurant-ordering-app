const menuContainer = document.getElementById("menu-container")
const orderContainer = document.getElementById("order-container")
let order = []

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
                    <button data-id="${item.id}">+</button>
                </div>
            `
        }).join("")
}

renderMenu()

menuContainer.addEventListener("click", function(e) {
    if (e.target.dataset.id) {
        addToOrder(e.target.dataset.id)
    }
})

function addToOrder(itemId) {
    const item = menuArray.find(function(menuItem) {
        return menuItem.id === Number(itemId)
    })
    order.push(item)
    renderOrder()
}

function renderOrder() {
    const total = order.reduce(function(sum, item) {
        return sum + item.price
    }, 0)
    orderContainer.innerHTML = `
        <h3 class="order-heading">Your Order</h3>
        ${order.map(function(item) {
            return `
                <div class="order-item">
                    <h3>${item.name}</h3>
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



orderContainer.addEventListener("click", function(e) {
    if (e.target.dataset.id) {
        removeFromOrder(e.target.dataset.id)
    }
    if (e.target.classList.contains("complete-order-btn")) {
        document.querySelector(".modal-content").style.display = "block"
    }
})

function removeFromOrder(itemId) {
    const index = order.findIndex(function(orderItem) {
        return orderItem.id === Number(itemId)
    })
    order.splice(index, 1)
    renderOrder()
}

document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault()
    const name = document.getElementById("name-input").value
    document.querySelector(".modal-content").style.display = "none"
    orderContainer.innerHTML = `<p class="confirmation-msg">Thanks, ${name}! Your order is on its way!</p>`
})