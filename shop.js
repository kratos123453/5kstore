// Add CSS for shop page
const shopStyles = `
    .shop-header {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        padding: 4rem 0;
        text-align: center;
        color: #2c2c2c;
        position: relative;
        overflow: hidden;
    }
    
    .shop-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%238b5cf6" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%238b5cf6" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%238b5cf6" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.5;
    }
    
    .shop-header h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        position: relative;
        z-index: 2;
    }
    
    .shop-header p {
        font-size: 1.1rem;
        color: #64748b;
        position: relative;
        z-index: 2;
    }
    
    .shop-content {
        padding: 3rem 0;
        background: #ffffff;
    }
    
    .shop-layout {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 3rem;
        align-items: start;
    }
    
    .filters-sidebar {
        background: #f8fafc;
        border-radius: 20px;
        padding: 2rem;
        position: sticky;
        top: 100px;
        height: fit-content;
        border: 1px solid #e2e8f0;
    }
    
    .filter-section {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .filter-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .filter-section h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #2c2c2c;
        margin-bottom: 1rem;
    }
    
    .filter-options {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .filter-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .filter-option:hover {
        background: #e2e8f0;
    }
    
    .filter-option input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #8b5cf6;
        cursor: pointer;
    }
    
    .filter-option span {
        color: #2c2c2c;
        font-weight: 500;
    }
    
    .price-range {
        padding: 0 0.5rem;
    }
    
    .price-range input[type="range"] {
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: #e2e8f0;
        outline: none;
        -webkit-appearance: none;
    }
    
    .price-range input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #8b5cf6;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
    }
    
    .price-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #64748b;
    }
    
    .clear-filters-btn {
        width: 100%;
        background: #ef4444;
        color: white;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .clear-filters-btn:hover {
        background: #dc2626;
        transform: translateY(-2px);
    }
    
    .products-section {
        flex: 1;
    }
    
    .products-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1rem 0;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .products-count {
        font-weight: 600;
        color: #2c2c2c;
    }
    
    .products-count span {
        color: #8b5cf6;
    }
    
    .products-sort select {
        padding: 0.5rem 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: white;
        color: #2c2c2c;
        font-weight: 500;
        cursor: pointer;
    }
    
    .product-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #ef4444;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .product-badge.sale {
        background: #10b981;
    }
    
    .product-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #64748b;
    }
    
    .product-meta span {
        background: #f1f5f9;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        font-weight: 500;
    }
    
    .load-more-container {
        text-align: center;
        margin-top: 3rem;
    }
    
    @media (max-width: 1024px) {
        .shop-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .filters-sidebar {
            position: static;
            order: 2;
        }
        
        .products-section {
            order: 1;
        }
    }
    
    @media (max-width: 768px) {
        .shop-header h1 {
            font-size: 2rem;
        }
        
        .products-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = shopStyles;
document.head.appendChild(styleSheet);

// Shop functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
});

function initializeShop() {
    // Initialize filters
    initializeFilters();
    
    // Initialize price range
    initializePriceRange();
    
    // Initialize sorting
    initializeSorting();
    
    // Initialize load more
    initializeLoadMore();
    
    // Check for category parameter in URL
    checkCategoryParameter();
}

function initializeFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    clearFiltersBtn.addEventListener('click', clearAllFilters);
}

function initializePriceRange() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    priceRange.addEventListener('input', function() {
        priceValue.textContent = '$' + this.value;
        filterProducts();
    });
}

function initializeSorting() {
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', sortProducts);
}

function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', loadMoreProducts);
}

function checkCategoryParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // Pre-select the category filter
        const categoryCheckbox = document.querySelector(`input[value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            filterProducts();
        }
    }
}

function filterProducts() {
    const products = document.querySelectorAll('.product-card');
    const selectedCategories = getSelectedCategories();
    const selectedBrands = getSelectedBrands();
    const selectedRatings = getSelectedRatings();
    const maxPrice = parseFloat(document.getElementById('priceRange').value);
    
    let visibleCount = 0;
    
    products.forEach(product => {
        const category = product.dataset.category;
        const brand = product.dataset.brand;
        const rating = product.dataset.rating;
        const price = parseFloat(product.dataset.price);
        
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(brand);
        const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(rating);
        const priceMatch = price <= maxPrice;
        
        if (categoryMatch && brandMatch && ratingMatch && priceMatch) {
            product.style.display = 'block';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    updateProductCount(visibleCount);
}

function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('input[value="clothing"], input[value="electronics"], input[value="home"], input[value="sports"]');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
}

function getSelectedBrands() {
    const checkboxes = document.querySelectorAll('input[value="premium"], input[value="budget"], input[value="eco"], input[value="trending"]');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
}

function getSelectedRatings() {
    const checkboxes = document.querySelectorAll('input[value="5-star"], input[value="4-star"], input[value="3-star"]');
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
}

function clearAllFilters() {
    // Clear checkboxes
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    priceRange.value = 200;
    document.getElementById('priceValue').textContent = '$200';
    
    // Reset sorting
    document.getElementById('sortSelect').value = 'newest';
    
    // Show all products
    filterProducts();
    sortProducts();
}

function updateProductCount(count) {
    const productCount = document.getElementById('productCount');
    productCount.textContent = count;
}

function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    const productsGrid = document.getElementById('productsGrid');
    const products = Array.from(productsGrid.children);
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        const nameA = a.querySelector('h4').textContent;
        const nameB = b.querySelector('h4').textContent;
        const ratingA = getRatingValue(a.dataset.rating);
        const ratingB = getRatingValue(b.dataset.rating);
        
        switch(sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'name':
                return nameA.localeCompare(nameB);
            case 'rating':
                return ratingB - ratingA;
            default:
                return 0;
        }
    });
    
    // Re-append sorted products
    products.forEach(product => productsGrid.appendChild(product));
}

function getRatingValue(rating) {
    switch(rating) {
        case '5-star': return 5;
        case '4-star': return 4;
        case '3-star': return 3;
        default: return 0;
    }
}

function loadMoreProducts() {
    // This would typically load more products from a server
    // For now, we'll just show a message
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const originalText = loadMoreBtn.innerHTML;
    
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        loadMoreBtn.innerHTML = originalText;
        loadMoreBtn.disabled = false;
        
        // Show a notification
        showNotification('More products loaded!', 'success');
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#8b5cf6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
} 