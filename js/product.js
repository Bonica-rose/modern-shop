// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));
// console.log("Product ID:", productId);

if (!productId) {
    document.getElementById('productDetails').innerHTML =
        `<div class="alert alert-danger">Invalid product</div>`;
    throw new Error("Invalid product ID");
}

// Load product details
async function loadProduct() {
    try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await res.json();

        renderProduct(product);
    } catch (err) {
        document.getElementById('productDetails').innerHTML =
            `<div class="alert alert-danger">Failed to load product</div>`;
    }
}

// Render product UI
function renderProduct(p) {
    // Breadcrumb (optional if already added)
    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
            <li class="breadcrumb-item">${p.category}</li>
            <li class="breadcrumb-item active">${p.title}</li>
        `;
    }

    document.getElementById('productDetails').innerHTML = `
        <div class="col-md-6 text-center">
            <img src="${p.thumbnail}" class="img-fluid rounded shadow mb-3">
        </div>

        <div class="col-md-6">
            <h2>${p.title}</h2>
            <p class="text-muted">${p.category}</p>

            <h4 class="text-success">${formatINR(p.price)}</h4>

            <p class="mt-3">${p.description}</p>

            <p>
                <i class="fa-solid fa-star text-warning"></i>
                ${p.rating}
            </p>

            <button class="btn btn-dark mt-3" onclick="handleAddToCart()">
                Add to Cart
            </button>
        </div>
    `;

    // Store current product globally (for reuse in add to cart)
    window.currentProduct = p;
}

function handleAddToCart() {
    if (!window.currentProduct) return;

    addToCart(window.currentProduct);  // from cart.js
    updateCartBadge();// from cart.js
    alert("Added to cart!");
}

// Back button
function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "../index.html";
    }
}

// Init
loadProduct();
updateCartBadge();