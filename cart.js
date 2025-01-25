// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

// Initialize cart when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    attachEventListeners();
    updateCartDisplay();
});

function initializeCart() {
    updateCartBadge();
    if (document.querySelector('.mini-cart-items')) {
        updateCartDisplay();
    }
}

function attachEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            const card = e.target.closest('.product-card');
            const product = {
                id: Date.now(),
                name: card.querySelector('h3').textContent,
                price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
                image: card.querySelector('img').src,
                quantity: 1
            };
            addToCart(product);
        });
    });

    // Cart toggle
    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');

    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
                cartSidebar.classList.remove('active');
            }
        });
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity++;
        showNotification(`Added another ${product.name} (Total: ${existingItem.quantity})`);
    } else {
        cart.push(product);
        showNotification(`${product.name} added to cart!`);
    }
    
    saveCart();
    updateCartDisplay();
    updateCartBadge();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            showNotification(`${item.name} quantity updated to ${newQuantity}`);
            saveCart();
            updateCartDisplay();
            updateCartBadge();
        } else {
            removeFromCart(id);
        }
    }
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cart.splice(itemIndex, 1);
        showNotification(`${item.name} removed from cart`);
        saveCart();
        updateCartDisplay();
        updateCartBadge();
    }
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.mini-cart-items');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i>🛒</i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="mini-cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="qty-btn minus" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn" title="Remove item">×</button>
        </div>
    `).join('');

    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.classList.toggle('active', totalItems > 0);
    }
}

function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="notification-icon">🛍️</i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
