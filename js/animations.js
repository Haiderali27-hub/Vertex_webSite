// Animations JS

document.addEventListener('DOMContentLoaded', () => {
    initGlitchEffect();
    initScrollEffects();
    initHoverEffects();
});

// Glitch Effect for headings
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Trigger glitch effect at random intervals
        setInterval(() => {
            element.classList.add('active');
            
            setTimeout(() => {
                element.classList.remove('active');
            }, 200);
        }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds
    });
}

// Parallax Scroll Effects
function initScrollEffects() {
    // Add smooth parallax effect to sections
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for hero section
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
        
        // Subtle parallax for section backgrounds
        document.querySelectorAll('section').forEach(section => {
            const offset = section.offsetTop;
            const parallaxFactor = 0.1;
            
            if (scrollY > offset - window.innerHeight && scrollY < offset + section.offsetHeight) {
                const yPos = (scrollY - offset) * parallaxFactor;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
    
    // Add scroll indicator to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<div class="scroll-arrow"></div>';
        hero.appendChild(scrollIndicator);
        
        scrollIndicator.addEventListener('click', () => {
            const services = document.querySelector('#services');
            if (services) {
                services.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Hover effects for interactive elements
function initHoverEffects() {
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsapFallback(card, { y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.3)', duration: 0.3 });
        });
        
        card.addEventListener('mouseleave', () => {
            gsapFallback(card, { y: 0, boxShadow: '0 10px 20px rgba(0,0,0,0.2)', duration: 0.3 });
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const image = card.querySelector('.project-img');
        
        card.addEventListener('mouseenter', () => {
            gsapFallback(card, { y: -10, duration: 0.3 });
            if (image) {
                gsapFallback(image, { scale: 1.05, duration: 0.5 });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsapFallback(card, { y: 0, duration: 0.3 });
            if (image) {
                gsapFallback(image, { scale: 1, duration: 0.5 });
            }
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsapFallback(btn, { y: -3, duration: 0.2 });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsapFallback(btn, { y: 0, duration: 0.2 });
        });
    });
}

// Simple fallback for GSAP if not available
function gsapFallback(element, props) {
    // Check if GSAP is available
    if (window.gsap) {
        window.gsap.to(element, props);
        return;
    }
    
    // Fallback to basic CSS transitions
    const duration = (props.duration || 0.3) + 's';
    
    // Apply styles
    if (props.y !== undefined) {
        element.style.transform = props.y ? `translateY(${props.y}px)` : '';
    }
    
    if (props.scale !== undefined) {
        element.style.transform = props.scale ? `scale(${props.scale})` : '';
    }
    
    if (props.boxShadow !== undefined) {
        element.style.boxShadow = props.boxShadow || '';
    }
    
    // Ensure smooth transition
    element.style.transition = `transform ${duration} ease, box-shadow ${duration} ease`;
}

// Add CSS for scroll indicator
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 50px;
            cursor: pointer;
            z-index: 10;
        }
        
        .scroll-arrow {
            position: relative;
            width: 20px;
            height: 20px;
            border-right: 2px solid var(--primary-color);
            border-bottom: 2px solid var(--primary-color);
            transform: rotate(45deg);
            animation: scrollArrow 2s infinite;
            margin: 0 auto;
        }
        
        @keyframes scrollArrow {
            0% {
                transform: rotate(45deg) translate(0, 0);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: rotate(45deg) translate(10px, 10px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}); 