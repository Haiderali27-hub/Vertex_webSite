/**
 * Components Loader
 * This script handles the loading of reusable components like header, footer, etc.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load all components with the data-component attribute
    loadComponents();
    
    // Initialize the scroll-to-top functionality if it exists
    initScrollToTop();
});

/**
 * Loads HTML components into elements with data-component attribute
 */
function loadComponents() {
    const componentElements = document.querySelectorAll('[data-component]');
    
    componentElements.forEach(element => {
        const componentName = element.getAttribute('data-component');
        
        fetch(`components/${componentName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load component: ${componentName}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                
                // If this is a header, initialize menu toggle functionality
                if (componentName === 'header') {
                    initMenuToggle();
                }
            })
            .catch(error => {
                console.error(error);
                element.innerHTML = `<div style="color: red;">Error loading component: ${componentName}</div>`;
            });
    });
}

/**
 * Initializes the mobile menu toggle
 */
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

/**
 * Initializes the scroll-to-top functionality
 */
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        const scrollLine = document.querySelector('.scroll-line');
        let isActive = false;
        
        // Function to update scroll indicator
        function updateScrollIndicator() {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const scrollLineHeight = Math.min(scrollPercent * 100, 100);
            
            if (scrollLine) {
                scrollLine.style.height = `${scrollLineHeight}%`;
            }
            
            // Show/hide scroll to top button based on scroll position
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
                
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
                    if (!isActive) {
                        scrollToTopBtn.classList.add('active');
                        isActive = true;
                    }
                } else {
                    if (isActive) {
                        scrollToTopBtn.classList.remove('active');
                        isActive = false;
                    }
                }
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
        
        // Initialize scroll indicator
        window.addEventListener('scroll', updateScrollIndicator);
        updateScrollIndicator();
        
        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
