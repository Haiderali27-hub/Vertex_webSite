document.addEventListener('DOMContentLoaded', () => {
    // Parallax elements
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    // Fade-in elements that appear on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Track scroll position
    let lastScrollTop = 0;
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };
    
    // Handle scroll events
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // Parallax effect
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.2;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Fade-in effect for elements as they enter viewport
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            } else if (scrollDirection === 'up') {
                element.classList.remove('visible');
            }
        });
        
        // Update last scroll position
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    
    // Initialize floating particles
    const initParticles = () => {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position, size and animation delay
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize animations
    handleScroll();
    initParticles();
});
