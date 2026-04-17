function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const clearBtn = document.getElementById('clearCartBtn');

    const cartData = getCart(); // from cart.js

    if (cartData.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5">
                <h4>Your cart is empty!</h4>
                <a href="../index.html" class="btn btn-dark mt-3">Shop Now</a>
            </div>`;
        cartTotal.innerText = "₹0";
        if (clearBtn) clearBtn.disabled = true; // disable button
        return;
    }
    if (clearBtn) clearBtn.disabled = false; // enable when items exist

    let totalAmount = 0;

    cartItemsContainer.innerHTML = cartData.map(item => {
        totalAmount += item.price * item.quantity;

        return `
        <div class="d-flex align-items-center mb-3 border-bottom pb-2">
            <img src="${item.thumbnail}" style="width: 70px; height: 70px; object-fit: contain;" class="me-3">

            <div class="flex-grow-1">
                <h6>${item.title}</h6>
                <small>${formatINR(item.price)} x ${item.quantity}</small>
            </div>

            <div>
                <button class="btn btn-sm btn-secondary" onclick="changeQty(${item.id}, -1)">-</button>
                <button class="btn btn-sm btn-secondary" onclick="changeQty(${item.id}, 1)">+</button>
                <button class="btn btn-sm text-danger" onclick="handleRemove(${item.id})">🗑</button>
            </div>
        </div>`;
    }).join('');

    cartTotal.innerText = formatINR(totalAmount);
}

// Remove
function handleRemove(id) {
    removeFromCart(id); // from cart.js
    renderCart();
}

// Clear
function handleClearCart() {
    clearCart(); // from cart.js
    renderCart();
}

// Quantity change
function changeQty(id, delta) {
    const cart = getCart(); // from cart.js
    const item = cart.find(i => i.id === id);

    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    saveCart(cart); // from cart.js
    renderCart();
}

// Init
renderCart();
updateCartBadge();