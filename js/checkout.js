function guardCheckout() {
    const cart = getCart();

    if (!cart || cart.length === 0) {
        alert("Your cart is empty!");
        window.location.href = "../index.html";
    }
}

function renderCheckout() {
    const container = document.getElementById('checkoutItems');
    const totalEl = document.getElementById('checkoutTotal');

    const cart = getCart(); // from cart.js

    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = `<p>Your cart is empty.</p>`;
        totalEl.innerText = "₹0";
        return;
    }   

    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between mb-2">
            <span>${item.title} x ${item.quantity}</span>
            <span>${formatINR(item.price * item.quantity)}</span>
        </div>
    `).join('');

    totalEl.innerText = formatINR(getCartTotal());
}

function placeOrder() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment').value;

    const cart = getCart();

    if (!name || !phone || !address) {
        alert("Please fill all details");
        return;
    }

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const order = {
        id: Date.now(),
        customer: { name, phone, address },
        payment,
        items: cart,
        total: getCartTotal(),
        date: new Date().toLocaleString()
    };

    // Save order (mock)
    localStorage.setItem('lastOrder', JSON.stringify(order));

    // Clear cart 
    saveCart([]); 

    alert("Order placed successfully!");

    // Redirect
    window.location.href = "../index.html";
}

guardCheckout();
renderCheckout();
updateCartBadge();