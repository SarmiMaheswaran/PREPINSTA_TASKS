const products = [
    { id: 1, name: "Laptop", price: 999.99, category: "electronics", image: "https://m.media-amazon.com/images/I/617Ykb5YvLL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 2, name: "Smartphone", price: 499.99, category: "electronics", image: "https://m.media-amazon.com/images/I/81dT7CUY6GL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 3, name: "T-shirt", price: 19.99, category: "clothing", image: "https://m.media-amazon.com/images/I/61H3ILz2x4L._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 4, name: "Blender", price: 29.99, category: "home", image: "https://m.media-amazon.com/images/I/61Nl-Xv22qL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 5, name: "Coffee Maker", price: 49.99, category: "home", image: "https://m.media-amazon.com/images/I/61iKvcMlvgL._AC_UY327_FMwebp_QL65_.jpg" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
    document.querySelector('.cart-icon').addEventListener('click', toggleCart);
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            loadProducts(category);
        });
    });
});

function loadProducts(category) {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';

    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsSection.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    const cartCountSpan = document.getElementById('cart-count');

    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.product.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <span>${item.product.name} x ${item.quantity}</span>
            <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    totalPriceSpan.textContent = total.toFixed(2);
    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.toggle('visible');
}
