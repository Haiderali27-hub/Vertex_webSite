/**
 * Component Loader
 * A simple script to load components directly in HTML without need for complex frameworks
 */

document.addEventListener('DOMContentLoaded', function() {
    // No need to fetch external components since they're already embedded in the HTML
    // This script just initializes functionality for components
    
    // Initialize menu toggle for header
    initMenuToggle();
});

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
