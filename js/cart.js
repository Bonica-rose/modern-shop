function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(product) {
    console.log("Adding to cart:", product);
    let cart = loadCart();  // always fresh
    
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = loadCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function clearCart() {
    if (!confirm("Are you sure you want to clear the cart?")) return;

    saveCart([]); 
}

function getCart() {
    return loadCart();
}

function getCartCount() {
    let cart = loadCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
    let cart = loadCart();
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartBadge() {
    const el = document.getElementById('cartCount');
    if (el) {
        el.innerText = getCartCount();
    }
}