// Animation Functions for KILT Website

// Scroll Reveal Animation
function initScrollReveal() {
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.leather-card', { interval: 200 });
    scrollReveal.reveal('.about-content', { origin: 'left' });
    scrollReveal.reveal('.about-image', { origin: 'right', delay: 400 });
    scrollReveal.reveal('.section-title', { origin: 'top' });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animate');
                entry.target.classList.add('animate__animated', `animate__${animation}`);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Hover animations for leather elements
function initHoverAnimations() {
    const leatherCards = document.querySelectorAll('.leather-card');
    const leatherButtons = document.querySelectorAll('.leather-button, .leather-button-outline');
    
    leatherCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const stitching = card.querySelector('.card-stitching');
            stitching.style.animation = 'stitchAnimation 2s linear infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            const stitching = card.querySelector('.card-stitching');
            stitching.style.animation = 'none';
        });
    });
    
    leatherButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all animations
function initAnimations() {
    initScrollReveal();
    animateOnScroll();
    initHoverAnimations();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', initAnimations);