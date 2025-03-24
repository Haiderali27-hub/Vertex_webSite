// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initPageTransitions();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
    initScrollHeader();
    initScrollToTop();
});

// Page Transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                pageTransition.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 700);
            }
        });
    });

    // Page load animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });

    // Add animation classes to elements that should animate on scroll
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.service-card').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.project-card').forEach(el => el.classList.add('slide-in-right'));
    document.querySelectorAll('.stat-item').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.about-text p').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.contact-info, .contact-form').forEach(el => el.classList.add('fade-in'));
}

// Initialize counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // Update every 16ms
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    entry.target.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Scroll Header
function initScrollHeader() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const scrollLine = document.querySelector('.scroll-line');
    
    if (scrollToTopBtn && scrollLine) {
        // Show/hide scroll button based on scroll position and update progress
        window.addEventListener('scroll', () => {
            // Calculate scroll progress
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const scrollProgress = (scrolled / windowHeight) * 100;
            
            // Update scroll line height based on scroll progress
            scrollLine.style.height = `${scrollProgress}%`;
            
            // Show/hide the scroll button
            if (scrolled > 200) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add cursor interaction for better integration with site design
        scrollToTopBtn.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
            }
        });
        
        scrollToTopBtn.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
        
        // Trigger initial scroll event to set correct state
        window.dispatchEvent(new Event('scroll'));
    }
} 