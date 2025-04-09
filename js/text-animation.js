// Text animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    // Text split animation for the title and subtitle
    const animatedTitle = document.querySelector('.animated-title');
    const animatedSubtitle = document.querySelector('.animated-subtitle');
    
    if (animatedTitle && animatedSubtitle) {
        // Split title text into individual letters for animation
        const titleText = animatedTitle.textContent;
        let titleHTML = '';
        
        // Create spans for each letter with staggered delays
        [...titleText].forEach((letter, i) => {
            titleHTML += `<span class="letter" style="animation-delay: ${0.05 * i}s">${letter === ' ' ? '&nbsp;' : letter}</span>`;
        });
        
        animatedTitle.innerHTML = titleHTML;
        
        // Interactive hover effect for the text
        const letters = document.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.addEventListener('mouseover', () => {
                letter.style.color = getRandomColor();
                letter.style.transform = 'translateY(-10px) rotate(' + (Math.random() * 10 - 5) + 'deg)';
            });
            
            letter.addEventListener('mouseout', () => {
                letter.style.color = '';
                letter.style.transform = '';
            });
        });
        
        // Connect text animation with globe movement
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.addEventListener('mousemove', (e) => {
                // Calculate mouse position as percentage of screen
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                // Get slight movement based on mouse position
                const moveX = (mouseX - 0.5) * 10;
                const moveY = (mouseY - 0.5) * 5;
                
                // Apply subtle parallax effect to text
                animatedTitle.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
                animatedSubtitle.style.transform = `translateX(${moveX * 0.7}px) translateY(${moveY * 0.7}px)`;
            });
            
            // Reset transforms when mouse leaves the section
            homeSection.addEventListener('mouseleave', () => {
                animatedTitle.style.transform = '';
                animatedSubtitle.style.transform = '';
            });
        }
    }
    
    // Text glitch effect on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const homeHeight = document.getElementById('home')?.offsetHeight || 0;
        
        // Only apply effects when within the home section viewport
        if (scrollTop <= homeHeight) {
            // Calculate how far through the section we've scrolled (0-1)
            const scrollProgress = scrollTop / homeHeight;
            
            // Apply "glitch" effect to title as user scrolls
            if (animatedTitle && scrollProgress > 0.1 && scrollProgress < 0.9) {
                // Occasionally add a glitch effect
                if (Math.random() > 0.92) {
                    applyGlitchEffect(animatedTitle);
                    setTimeout(() => {
                        removeGlitchEffect(animatedTitle);
                    }, 200);
                }
            }
        }
        
        lastScrollTop = scrollTop;
    });
});

// Helper function to get random color in brand palette
function getRandomColor() {
    // Array of colors in brand palette
    const colors = [
        '#ff0035',  // Primary red
        '#ff3357',  // Light red
        '#ff6680',  // Lighter red
        '#ffffff',  // White
        '#f8f8f8'   // Off-white
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Apply temporary glitch effect to an element
function applyGlitchEffect(element) {
    element.classList.add('glitch-effect');
    element.style.textShadow = `
        2px 0 0 rgba(255, 0, 53, 0.7),
        -2px 0 0 rgba(0, 255, 255, 0.7)
    `;
    element.style.letterSpacing = `${(Math.random() * 3) - 1}px`;
}

// Remove glitch effect
function removeGlitchEffect(element) {
    element.classList.remove('glitch-effect');
    element.style.textShadow = '';
    element.style.letterSpacing = '';
}