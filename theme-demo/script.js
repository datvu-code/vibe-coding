// ========================================
// Carousel Functionality
// ========================================

const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const carouselArrows = document.querySelectorAll('.carousel-arrow');
let currentSlide = 0;
const totalSlides = carouselIndicators.length;

function updateCarousel(index) {
    carouselIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Carousel navigation
carouselArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => {
        if (index === 0) {
            // Previous button
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        } else {
            // Next button
            currentSlide = (currentSlide + 1) % totalSlides;
        }
        updateCarousel(currentSlide);
    });
});

// Auto-advance carousel every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel(currentSlide);
}, 5000);

// ========================================
// Tab Functionality
// ========================================

const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// ========================================
// Smooth Scrolling
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// Navbar Scroll Behavior
// ========================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// ========================================
// Scroll Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const animatedElements = document.querySelectorAll(`
    .product-card,
    .product-card-small,
    .review-card,
    .collection-showcase-card,
    .trust-card
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// ========================================
// Product Card Hover Effects
// ========================================

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// Newsletter Form Handler
// ========================================

const newsletterInput = document.querySelector('.footer-email-input');
const newsletterButton = document.querySelector('.footer-subscribe-btn');

if (newsletterButton && newsletterInput) {
    newsletterButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = newsletterInput.value.trim();
        
        if (email && validateEmail(email)) {
            // Show success message
            showNotification('Cảm ơn bạn đã đăng ký nhận tin!', 'success');
            newsletterInput.value = '';
        } else {
            showNotification('Vui lòng nhập địa chỉ email hợp lệ.', 'error');
        }
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Horizontal Scroll Enhancement
// ========================================

const scrollContainers = document.querySelectorAll('.usp-scroll-container, .reviews-scroll-wrapper');

scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    // Set initial cursor
    container.style.cursor = 'grab';
});

// ========================================
// Image Lazy Loading Enhancement
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Performance Monitoring
// ========================================

// Log page load performance
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`%c⚡ Page Load Time: ${pageLoadTime}ms`, 'color: #10b981; font-weight: bold;');
});

// ========================================
// Console Welcome Message
// ========================================

console.log(
    '%c🎨 Ecommerce Theme Demo',
    'color: #072835; font-size: 20px; font-weight: bold; padding: 10px;'
);
console.log(
    '%cBuilt with modern web technologies and optimized for performance',
    'color: #6b7280; font-size: 12px; padding: 5px;'
);
console.log(
    '%c💡 Tip: Open DevTools to see performance metrics',
    'color: #3b82f6; font-size: 12px; padding: 5px;'
);

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✅ Theme initialized successfully', 'color: #10b981; font-weight: bold;');
});
