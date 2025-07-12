// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    // Initialize contact form
    initializeContactForm();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize scroll animations
    initializeScrollAnimations();
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            handleContactSubmission();
        }
    });
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateContactForm() {
    const requiredFields = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff4757';
    field.style.boxShadow = '0 0 0 3px rgba(255, 71, 87, 0.1)';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#eee';
    field.style.boxShadow = 'none';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function handleContactSubmission() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherAnswer.style.display = 'none';
                    otherIcon.style.transform = 'rotate(0deg)';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
                item.classList.remove('active');
            } else {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
                item.classList.add('active');
            }
        });
    });
}

function initializeScrollAnimations() {
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
    const animatedElements = document.querySelectorAll('.contact-method, .contact-form-container, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for contact page
const contactStyles = `
    .contact-hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 4rem 0;
        text-align: center;
        color: white;
    }
    
    .contact-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .contact-subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
    }
    
    .contact-content {
        padding: 4rem 0;
    }
    
    .contact-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }
    
    .contact-info {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .contact-info h3 {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #333;
    }
    
    .contact-info > p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .contact-methods {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .contact-method {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    
    .contact-method:hover {
        background: rgba(102, 126, 234, 0.05);
        transform: translateX(5px);
    }
    
    .method-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        flex-shrink: 0;
    }
    
    .whatsapp-icon {
        background: linear-gradient(45deg, #25D366, #128C7E) !important;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    }
    
    .whatsapp-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #25D366;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        padding: 0.5rem 0;
    }
    
    .whatsapp-link:hover {
        color: #128C7E;
        transform: translateX(5px);
    }
    
    .whatsapp-link i {
        font-size: 1.2rem;
    }
    
    .method-details h4 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #333;
    }
    
    .method-details p {
        color: #666;
        margin: 0;
        font-size: 0.9rem;
    }
    
    .social-contact {
        border-top: 1px solid #eee;
        padding-top: 2rem;
    }
    
    .social-contact h4 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #333;
    }
    
    .social-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .social-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1rem;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 10px;
        color: #667eea;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .social-link:hover {
        background: #667eea;
        color: white;
        transform: translateX(5px);
    }
    
    .contact-form-container {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .contact-form-container h3 {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: #333;
    }
    
    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
    }
    
    .form-group label {
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 0.8rem;
        border: 2px solid #eee;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .form-group textarea {
        resize: vertical;
        min-height: 120px;
    }
    
    .faq-section {
        padding: 4rem 0;
        background: rgba(255, 255, 255, 0.5);
    }
    
    .faq-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 2rem;
    }
    
    .faq-container h3 {
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 3rem;
        color: #333;
    }
    
    .faq-grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .faq-item {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .faq-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .faq-question:hover {
        background: rgba(102, 126, 234, 0.05);
    }
    
    .faq-question h4 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
    }
    
    .faq-question i {
        color: #667eea;
        transition: transform 0.3s ease;
    }
    
    .faq-answer {
        padding: 0 1.5rem 1.5rem;
        color: #666;
        line-height: 1.6;
    }
    
    .faq-item.active {
        border: 2px solid #667eea;
    }
    
    @media (max-width: 768px) {
        .contact-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .contact-title {
            font-size: 2.5rem;
        }
        
        .contact-method {
            flex-direction: column;
            text-align: center;
        }
        
        .social-links {
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet); 