// About page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
});

function initializeAboutPage() {
    // Initialize animated statistics
    initializeStats();
    
    // Add scroll animations
    initializeScrollAnimations();
}

function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateNumber(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
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
    const animatedElements = document.querySelectorAll('.about-section, .mission-card, .team-member, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for about page
const aboutStyles = `
    .about-hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 4rem 0;
        text-align: center;
        color: white;
    }
    
    .about-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .about-subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
    }
    
    .about-content {
        padding: 4rem 0;
    }
    
    .about-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }
    
    .about-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
        margin-bottom: 4rem;
        padding: 2rem 0;
    }
    
    .about-text h3 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #333;
    }
    
    .about-text p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #666;
        margin-bottom: 1rem;
    }
    
    .about-image {
        width: 200px;
        height: 200px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 4rem;
        margin: 0 auto;
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    .mission-section {
        text-align: center;
        margin-bottom: 4rem;
    }
    
    .mission-section h3 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: #333;
    }
    
    .mission-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    
    .mission-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .mission-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .mission-card i {
        font-size: 3rem;
        color: #667eea;
        margin-bottom: 1rem;
    }
    
    .mission-card h4 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #333;
    }
    
    .mission-card p {
        color: #666;
        line-height: 1.6;
    }
    
    .team-section {
        text-align: center;
        margin-bottom: 4rem;
    }
    
    .team-section h3 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: #333;
    }
    
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .team-member {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .team-member:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }
    
    .member-avatar {
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2.5rem;
        margin: 0 auto 1.5rem;
        transition: all 0.3s ease;
    }
    
    .team-member:hover .member-avatar {
        transform: scale(1.1);
    }
    
    .team-member h4 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    .member-role {
        color: #667eea;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    
    .member-bio {
        color: #666;
        line-height: 1.6;
    }
    
    .stats-section {
        text-align: center;
    }
    
    .stats-section h3 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: #333;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
    }
    
    .stat-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }
    
    .stat-number {
        font-size: 3rem;
        font-weight: 700;
        color: #667eea;
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        color: #666;
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
        .about-section {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
        }
        
        .about-title {
            font-size: 2.5rem;
        }
        
        .mission-grid,
        .team-grid,
        .stats-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = aboutStyles;
document.head.appendChild(styleSheet); 
 