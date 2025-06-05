// Main JavaScript File for KILT Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const leatherNav = document.querySelector('.leather-nav');
    
    if (mobileMenuBtn && leatherNav) { // Check if elements exist
        mobileMenuBtn.addEventListener('click', function() {
            leatherNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = leatherNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Video Hero Logic
    const heroVideo = document.getElementById('heroVideo');
    const videoBackground = document.querySelector('.video-background');
    // const videoOverlay = document.querySelector('.leather-overlay'); // Overlay CSS is commented out, so this might not be needed.

    if (heroVideo && videoBackground) { // Check if video elements exist
        heroVideo.muted = true; // Try to autoplay muted
        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started successfully
                videoBackground.classList.add('playing');
                console.log("Hero video autoplay started.");
            }).catch(error => {
                // Autoplay was prevented. Video should remain visible for manual playback.
                console.warn("Hero video autoplay was prevented. User can play manually using controls.", error);
                videoBackground.classList.remove('playing');
                // Do NOT hide videoBackground here, so user can use controls.
            });
        }
    }
    
    // Scroll Down Button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) { // Check if element exists
        scrollDownBtn.addEventListener('click', function() {
            window.scrollBy({
                top: window.innerHeight - 100, // Adjust scroll amount as needed
                behavior: 'smooth'
            });
        });
    }
    
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) { // Check if elements exist
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                const targetContent = document.getElementById(tabId);
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                this.classList.add('active');
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (isNaN(target)) return; // Skip if data-count is not a number

            const duration = 2000; // 2 seconds
            let current = 0;
            const increment = target / (duration / 16); // Calculate increment per frame (approx 60fps)
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16); // Run roughly every 16ms
        });
    }
    
    // Intersection Observer for animations (including counter)
    const elementsToObserve = document.querySelectorAll('[data-aos], .about-stats');
    if (elementsToObserve.length > 0) { // Check if elements exist
        const observerOptions = {
            threshold: 0.1 // Trigger when 10% of the element is visible
        };
        
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('about-stats')) {
                        animateCounters(); // Animate counters when about-stats is visible
                    }
                    
                    if (entry.target.hasAttribute('data-aos')) {
                        entry.target.classList.add('aos-animate');
                    }
                    
                    observerInstance.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);
        
        elementsToObserve.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Preloader
    const preloader = document.querySelector('.leather-preloader');
    if (preloader) { // Check if element exists
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500); // Match opacity transition time
            }, 1000); // Delay before starting fade out
        });
    }
    
    // Initialize slider (if it exists)
    if (typeof initSlider === 'function') {
        initSlider();
    }
});

// Slider Functionality (ensure this is robust)
function initSlider() {
    const slider = document.querySelector('.leather-slider');
    const slides = document.querySelectorAll('.leather-slider .slide'); // Be more specific with slide selection
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slider || slides.length === 0 || !prevBtn || !nextBtn) {
        // console.log("Slider elements not found, slider not initialized.");
        return;
    }
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
        slides.forEach((slide, index) => {
            // Adjust transform based on currentIndex for a typical carousel effect
            let offset = index - currentIndex;
            if (offset < -slideCount / 2) offset += slideCount;
            if (offset > slideCount / 2) offset -= slideCount;
            slide.style.transform = `translateX(${offset * 100}%)`;
            // Opacity can also be used for fade effects if preferred over translate
            // slide.style.opacity = (index === currentIndex) ? '1' : '0';
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    let slideInterval = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    updateSlider(); // Initialize slider position
}