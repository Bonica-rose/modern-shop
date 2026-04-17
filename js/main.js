let products = [];
const grid = document.getElementById('productGrid');

// Fetch Data from DummyJSON
async function loadShop() {
    try {
        // Fetch Products and Categories simultaneously
        const [pRes, cRes] = await Promise.all([
            fetch('https://dummyjson.com/products'),
            fetch('https://dummyjson.com/products/category-list')
        ]);

        const pData = await pRes.json();
        products = pData.products; // DummyJSON wraps array in 'products' key
        const categories = await cRes.json();

        // Limit the result to the first 5 elements
        const limitedCategories = categories.slice(0, 5);

        // Populate only those 5 Category Filter
        const catFilter = document.getElementById('categoryFilter');
        limitedCategories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat.replace(/-/g, ' '); // Clean UI text
            catFilter.appendChild(opt);
        });

        updateDisplay();
    } catch (error) {
        grid.innerHTML = `<div class="alert alert-danger w-100 text-center">Failed to load data. Please check your connection.</div>`;
    }
}

// Render Function
function render(data) {
    if (data.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center py-5"><h4>No products found <i class="fa-regular fa-face-frown"></i></h4></div>`;
        return;
    }

    grid.innerHTML = data.map(p => `
    <div class="col">
        <div class="card h-100 product-card shadow-sm">
            <div class="img-container">
                <img src="${p.thumbnail}" class="product-img" alt="${p.title}">
            </div>
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between mb-1">
                    <small class="text-uppercase text-muted fw-bold" style="font-size: 0.7rem;">${p.category}</small>
                    <small class="text-warning"><i class="fa-solid fa-star"></i> ${p.rating}</small>
                </div>
                <h6 class="card-title text-truncate mb-2">${p.title}</h6>
                <p class="card-text text-muted small flex-grow-1">${p.description.substring(0, 50)}...</p>
                <div class="d-flex justify-content-between align-items-center mt-auto pt-3">
                    <span class="h5 mb-0">${formatINR(p.price)}</span>
                    <button onclick="handleAddToCart(${p.id})" class="btn btn-sm btn-dark px-3">
                        <i class="fa-solid fa-plus me-1"></i>Add
                    </button>                    
                </div>
                <button onclick="goToProduct(${p.id})" class="btn btn-sm btn-outline-warning mt-2">View</button>
            </div>
        </div>
    </div>
`).join('');
}

function goToProduct(id) {
    window.location.href = `pages/product.html?id=${id}`;
} 

// Cart Interaction
function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);

    addToCart(product);  // from cart.js
}

// Filter & Search Logic
function updateDisplay() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCat = document.getElementById('categoryFilter').value;

    const filtered = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm);
        const matchesCat = selectedCat === 'all' || p.category === selectedCat;
        return matchesSearch && matchesCat;
    });

    render(filtered);
}

// Shuffle Helper
function shuffle() {
    // for (let i = products.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [products[i], products[j]] = [products[j], products[i]];
    // }
    products.sort(() => Math.random() - 0.5);
    updateDisplay();
}

// Event Listeners
document.getElementById('searchInput').addEventListener('input', updateDisplay);
document.getElementById('categoryFilter').addEventListener('change', updateDisplay);
document.getElementById('shuffleBtn').addEventListener('click', shuffle);

// Initial Load
loadShop();
updateCartBadge();
