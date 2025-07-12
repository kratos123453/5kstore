// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeRotatingCards();
    initializeAnimations();
    initializeMobileMenu();
    initializeFIFACategories();
});

// FIFA-Style Category Selection
function initializeFIFACategories() {
    const fifaCards = document.querySelectorAll('.fifa-category-card');
    
    fifaCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent event bubbling
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.getAttribute('data-category');
            const categoryName = this.querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Add glow effect
            this.style.boxShadow = `
                0 20px 40px rgba(139, 92, 246, 0.5),
                0 0 0 2px rgba(139, 92, 246, 0.8),
                0 0 40px rgba(139, 92, 246, 0.6)
            `;
            
            // Show selection feedback
            showToast(`Entering ${categoryName} Mode!`, 'success');
            
            // Navigate to shop page with category parameter
            setTimeout(() => {
                window.location.href = `shop.html?category=${category}`;
            }, 800);
        });
        
        // Add hover sound effect simulation (visual feedback)
        card.addEventListener('mouseenter', function() {
            // Add subtle glow on hover
            this.style.boxShadow = `
                0 20px 40px rgba(139, 92, 246, 0.3),
                0 0 0 1px rgba(139, 92, 246, 0.5),
                0 0 30px rgba(139, 92, 246, 0.4)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset glow effect
            this.style.boxShadow = '';
        });
    });
}

// Rotating product cards functionality
function initializeRotatingCards() {
    const productCards = document.querySelectorAll('.product-card.rotating');
    
    productCards.forEach(card => {
        // Start rotation on page load (handled by CSS)
        
        // Pause rotation on hover
        card.addEventListener('mouseenter', function() {
            const productImage = this.querySelector('.product-image');
            if (productImage) {
                productImage.style.animationPlayState = 'paused';
            }
        });
        
        // Resume rotation when mouse leaves
        card.addEventListener('mouseleave', function() {
            const productImage = this.querySelector('.product-image');
            if (productImage) {
                productImage.style.animationPlayState = 'running';
            }
        });
        
        // Stop rotation permanently when clicked
        card.addEventListener('click', function() {
            const productImage = this.querySelector('.product-image');
            if (productImage) {
                productImage.style.animation = 'none';
            }
            this.classList.remove('rotating');
            
            // Add a subtle bounce effect
            this.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = 'none';
            }, 600);
            
            // Show success message
            showToast('Product selected!', 'success');
        });
    });
}

// Animation initializations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Floating elements animation
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach(item => {
        const speed = parseFloat(item.dataset.speed) || 1;
        item.style.animationDuration = `${6 / speed}s`;
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            this.classList.toggle('active');
            
            // Animate menu icon
            const icon = this.querySelector('i');
            if (nav.classList.contains('mobile-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add icon based on type
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    toast.insertBefore(icon, toast.firstChild);
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Category card click handlers
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h4').textContent;
        showToast(`Browsing ${categoryName} category!`, 'success');
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav.mobile-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        gap: 1rem;
    }
    
    .mobile-menu-btn.active {
        color: #8b5cf6;
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const nav = document.querySelector('.nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (nav && nav.classList.contains('mobile-active')) {
            nav.classList.remove('mobile-active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll-based animations can be added here
}, 10));

// Initialize tooltips for better UX
function initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.9rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (this.tooltip && this.tooltip.parentNode) {
                        this.tooltip.parentNode.removeChild(this.tooltip);
                    }
                }, 300);
            }
        });
    });
}

// Initialize tooltips when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTooltips); 