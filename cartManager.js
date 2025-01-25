class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.initializeElements();
        this.updateDisplay();
    }

    initializeElements() {
        this.cartItems = document.querySelector('.cart-items');
        this.subtotalElement = document.querySelector('#subtotal');
        this.totalElement = document.querySelector('#total');
        this.bindEvents();
    }

    bindEvents() {
        // Quantity controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('qty-btn')) {
                const itemId = e.target.closest('.cart-item').dataset.id;
                const change = e.target.textContent === '+' ? 1 : -1;
                this.updateQuantity(itemId, change);
            }
        });

        // Remove buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const itemId = e.target.closest('.cart-item').dataset.id;
                this.removeItem(itemId);
            }
        });

        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.handleCheckout());
        }
    }

    updateQuantity(itemId, change) {
        const item = this.cart.find(item => item.id === parseInt(itemId));
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
            this.updateDisplay();
            this.saveCart();
        }
    }

    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== parseInt(itemId));
        this.updateDisplay();
        this.saveCart();
    }

    updateDisplay() {
        if (!this.cartItems) return;

        this.cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity">
                        <button class="qty-btn">-</button>
                        <input type="number" value="${item.quantity}" min="1" readonly>
                        <button class="qty-btn">+</button>
                    </div>
                </div>
                <button class="remove-btn">Remove</button>
            </div>
        `).join('');

        this.updateTotals();
    }

    updateTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 150 ? 0 : 5;
        const total = subtotal + shipping;

        if (this.subtotalElement) {
            this.subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        }
        
        const shippingElement = document.querySelector('#shipping');
        if (shippingElement) {
            shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        }
        
        if (this.totalElement) {
            this.totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    handleCheckout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Add checkout logic here
        alert('Proceeding to checkout...');
    }
}
