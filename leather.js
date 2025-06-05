// Leather-specific Effects and Animations

// Leather Texture Initialization
function initLeatherTextures() {
    // Add leather texture to elements with leather class
    const leatherElements = document.querySelectorAll('.leather-texture');
    
    leatherElements.forEach(element => {
        element.style.backgroundImage = 'url(images/leather-texture.jpg)';
        element.style.backgroundSize = 'cover';
        element.style.position = 'relative';
        
        // Add stitching effect
        const stitching = document.createElement('div');
        stitching.className = 'leather-stitching';
        element.appendChild(stitching);
    });
}

// Leather Binding Effect for Sections
function addLeatherBinding() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const binding = document.createElement('div');
        binding.className = 'leather-binding';
        
        if (section.classList.contains('dark-section')) {
            binding.style.backgroundColor = 'var(--leather-dark)';
        } else {
            binding.style.backgroundColor = 'var(--leather-medium)';
        }
        
        section.appendChild(binding);
    });
}

// Animate Leather Stitching
function animateStitching() {
    const stitchingElements = document.querySelectorAll('.leather-stitch, .card-stitching');
    
    stitchingElements.forEach(stitch => {
        stitch.style.animation = 'stitchAnimation 3s linear infinite';
    });
}

// Initialize all leather effects
function initLeatherEffects() {
    initLeatherTextures();
    addLeatherBinding();
    animateStitching();
    
    // Add leather hover effect to navigation
    const navItems = document.querySelectorAll('.leather-nav a');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.color = 'var(--gold-accent)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.color = 'var(--text-light)';
            }
        });
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', initLeatherEffects);