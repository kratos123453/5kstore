// Universal Cart Logic for 5k Store
// Works across all pages, persists in localStorage, updates cart count in header

// --- Cart Data Management ---
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        return [];
    }
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// --- Cart Count in Header ---
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count > 0 ? count : '';
    });
}

// --- Add to Cart (for shop page) ---
window.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    // Event delegation for Add to Cart buttons (shop page and homepage)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;
        const card = btn.closest('.product-card');
        let id = btn.getAttribute('data-product');
        if (!id && card) id = card.getAttribute('data-product');
        const name = card?.querySelector('h4')?.textContent;
        const price = card?.querySelector('.price')?.textContent;
        if (!id || !name || !price) return;
        let cart = getCart();
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        setCart(cart);
        showToast(`${name} added to cart!`, 'success');
        renderCartPage(); // If on cart page, update instantly
    });
    renderCartPage();
});

// --- Cart Page Rendering ---
function renderCartPage() {
    const cartList = document.getElementById('cartItemsList');
    const emptySection = document.getElementById('emptyCartSection');
    const summary = document.getElementById('cartSummary');
    const totalEl = document.getElementById('cartTotal');
    if (!cartList || !emptySection || !summary || !totalEl) return;
    let cart = getCart();
    if (!cart.length) {
        cartList.innerHTML = '';
        emptySection.style.display = '';
        summary.style.display = 'none';
        return;
    }
    emptySection.style.display = 'none';
    summary.style.display = '';
    let total = 0;
    cartList.innerHTML = cart.map(item => {
        const priceNum = parseFloat(item.price.replace('₦',''));
        const itemTotal = priceNum * item.quantity;
        total += itemTotal;
        return `<div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <span class="cart-item-icon"><i class="fas fa-box"></i></span>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${formatNaira(item.price)}</p>
                </div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="changeQty('${item.id}', -1)"><i class="fas fa-minus"></i></button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQty('${item.id}', 1)"><i class="fas fa-plus"></i></button>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>`;
    }).join('');
    totalEl.textContent = formatNaira(total);
}

// --- Cart Actions ---
window.changeQty = function(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    setCart(cart);
    renderCartPage();
};
window.removeFromCart = function(id) {
    let cart = getCart().filter(i => i.id !== id);
    setCart(cart);
    renderCartPage();
};

// --- Toast Notification (simple) ---
function showToast(msg, type='success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;top:30px;right:30px;background:#8b5cf6;color:#fff;padding:1rem 2rem;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,0.12);opacity:0;transition:opacity 0.3s';
    document.body.appendChild(toast);
    setTimeout(()=>{toast.style.opacity='1';},10);
    setTimeout(()=>{toast.style.opacity='0';setTimeout(()=>toast.remove(),300);},2000);
}

// --- Live cart sync across tabs ---
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCount();
        renderCartPage();
    }
});

// Utility: Clear all items from cart and refresh UI
window.clearCartAndRefresh = function() {
    clearCart();
    if (typeof renderCartPage === 'function') renderCartPage();
    showToast('Cart cleared!', 'success');
};

function formatNaira(amount) {
    return '₦' + Number(amount).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2});
} 