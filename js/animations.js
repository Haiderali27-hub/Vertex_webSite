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

document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (!isMobile) {
        // Only run animations on desktop
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideRightElements = document.querySelectorAll('.slide-in-right');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.3 });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
        
        slideRightElements.forEach(element => {
            fadeObserver.observe(element);
        });
        
        // Stats counter animation
        const statElements = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const speed = 2000 / countTo;
                    
                    function updateCount() {
                        if (count < countTo) {
                            count++;
                            target.textContent = count;
                            requestAnimationFrame(updateCount);
                        }
                    }
                    
                    updateCount();
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.7 });
        
        statElements.forEach(element => {
            statsObserver.observe(element);
        });
    } else {
        // For mobile: show elements immediately without animations
        document.querySelectorAll('.fade-in, .slide-in-right').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        
        // For stats, set final numbers immediately
        document.querySelectorAll('.stat-number').forEach(el => {
            el.textContent = el.getAttribute('data-count');
        });
    }
    
    // Enhanced Services Card Staggered Animation
    const enhancedServiceCards = document.querySelectorAll('.service-card-advanced');
    
    enhancedServiceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Service Tech Sphere Animation
    const techDots = document.querySelectorAll('.tech-dot');
    techDots.forEach((dot, index) => {
        dot.addEventListener('mouseenter', function() {
            dot.style.transform = 'scale(1.2)';
            dot.style.backgroundColor = 'rgba(255, 0, 53, 0.2)';
            dot.style.zIndex = '10';
        });
        
        dot.addEventListener('mouseleave', function() {
            dot.style.transform = '';
            dot.style.backgroundColor = '';
            dot.style.zIndex = '';
        });
    });
});

// Advanced Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedScrollAnimations();
    initParallaxElements();
    initScrollTimeline();
    initMagneticElements();
});

// Advanced scroll-triggered animations
function initAdvancedScrollAnimations() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        
        // Slide-up animation observer
        const slideUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up-active');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Slide-in-left animation observer
        const slideLeftObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-left-active');
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        // Slide-in-right animation observer
        const slideRightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-right-active');
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        // Scale-in animation observer
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scale-in-active');
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -20px 0px'
        });

        // Stagger animation observer
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('stagger-active');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Apply animations to elements
        document.querySelectorAll('.animate-slide-up').forEach(el => {
            slideUpObserver.observe(el);
        });

        document.querySelectorAll('.animate-slide-left').forEach(el => {
            slideLeftObserver.observe(el);
        });

        document.querySelectorAll('.animate-slide-right').forEach(el => {
            slideRightObserver.observe(el);
        });

        document.querySelectorAll('.animate-scale').forEach(el => {
            scaleObserver.observe(el);
        });

        document.querySelectorAll('.animate-stagger').forEach(el => {
            staggerObserver.observe(el);
        });
    }
}

// Parallax scrolling effects
function initParallaxElements() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Background parallax for sections
    const parallaxSections = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const speed = 0.3;
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = scrollTop * speed;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
}

// Scroll timeline with progress indicator
function initScrollTimeline() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollHeight) * 100;
        progressBarFill.style.width = `${scrollProgress}%`;
    });
    
    // Section progress indicators
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-section');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-section');
            }
        });
    });
}

// Magnetic elements that follow cursor
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Particle System
function initParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 100);
    }
}

// Enhanced scroll effects with mouse movement
function initMouseFollowEffects() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Apply subtle mouse-following effect to floating shapes
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Apply parallax effect to section backgrounds
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.01;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                
                section.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
            }
        });
    });
}

// Smooth scrolling enhancements
function initSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
    // Only run advanced animations on desktop
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initParticleSystem();
        initMouseFollowEffects();
    }
    
    initSmoothScrolling();
    
    // Add loading completion effect
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.2;
        const duration = 3 + (index % 3);
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
    });
}

// Text reveal animation
function initTextRevealAnimation() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                entry.target.innerHTML = '';
                
                [...text].forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.animationDelay = `${index * 0.03}s`;
                    span.classList.add('char-reveal');
                    entry.target.appendChild(span);
                });
                
                entry.target.classList.add('text-reveal-active');
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => textObserver.observe(el));
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initFloatingElements();
    initTextRevealAnimation();
});