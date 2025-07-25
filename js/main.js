// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initPageTransitions();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
    initScrollHeader();
    initScrollToTop();
    initTeamModal();
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
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    console.log('Mobile menu init:', { menuToggle, navLinks, mobileOverlay }); // Debug log
    
    if (menuToggle && navLinks) {
        // Toggle menu function
        function toggleMenu() {
            const isActive = menuToggle.classList.contains('active');
            console.log('Toggle menu called, isActive:', isActive); // Debug log
            
            if (isActive) {
                // Close menu
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            } else {
                // Open menu
                menuToggle.classList.add('active');
                navLinks.classList.add('active');
                if (mobileOverlay) mobileOverlay.classList.add('active');
                body.classList.add('menu-open');
            }
        }
        
        // Menu toggle click with touch support
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Menu toggle clicked'); // Debug log
            toggleMenu();
        });
        
        // Add touch support for mobile
        menuToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('Menu toggle touched'); // Debug log
            toggleMenu();
        });
        
        // Overlay click to close menu
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', toggleMenu);
        }
        
        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && menuToggle.classList.contains('active')) {
                toggleMenu();
            }
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

// Team Member Modal
function initTeamModal() {
    const modal = document.getElementById('teamModal');
    const closeBtn = modal.querySelector('.close-modal');
    const teamMembers = document.querySelectorAll('.team-member');
    
    // Team member data
    const teamData = {
        'asad-ullah': {
          name: 'Asad Ullah',
          position: 'CEO & Founder',
          bio: 'Visionary leader with 15+ years of experience in tech innovation...',
          image: './src/images/popup_team/asad.jpg',
          social: {
            linkedin: 'https://www.linkedin.com/in/asad-ullah-qadir-32081b172/',
            github: 'https://github.com/Asadullahqadir-1',
            portfolio: 'https://asadullahqadir-1.github.io/portfolio_website/#portfolio'
          }
        },
        'muhammad-haider': {
          name: 'Muhammad Haider',
          position: 'CTO',
          bio: 'Tech innovator specializing in AI and ML...',
          image: './src/images/popup_team/haider.jpg',
          social: {
            linkedin: 'https://www.linkedin.com/in/mhaiderali2710/',
            github: 'https://github.com/Haiderali27-hub',
            portfolio: 'https://haiderali27-hub.github.io/my-portfolio/'
          }
        },
        'ghulam-mustafa': {
          name: 'Ghulam Mustafa',
          position: 'Lead Developer',
          bio: 'Full-stack expert with a passion for scalable solutions...',
          image: './src/images/popup_team/gm.png',
          social: {
            linkedin: 'https://www.linkedin.com/in/ghulammustafa06/',
            github: 'https://github.com/mustafaghulam',
            portfolio: 'https://mustafaghulam.com'
          }
        },
        'zohaib-iqbal': {
          name: 'Zohaib Iqbal',
          position: 'UI/UX Designer',
          bio: 'Creative designer focused on exceptional UX...',
          image: './src/images/popup_team/zohaib.jpg',
          social: {
            linkedin: 'https://www.linkedin.com/in/zohaib-iqbal-a490332a9/',
            github: 'https://github.com/Zohaibiqbal797',
            portfolio: 'https://zohaibiqbal.com'
          }
        }
      };
      
    teamMembers.forEach(member => {
        member.addEventListener('click', (e) => {
            e.preventDefault(); // ✅ This stops the scroll-to-top behavior
    
            const memberId = member.getAttribute('data-member');
            const data = teamData[memberId];
            
            // Update modal content
            modal.querySelector('.modal-image img').src = data.image;
            modal.querySelector('.modal-name').textContent = data.name;
            modal.querySelector('.modal-position').textContent = data.position;
            modal.querySelector('.modal-bio').textContent = data.bio;
    
            // Update social links
            const socialLinks = modal.querySelectorAll('.modal-social-link');
            socialLinks[0].href = data.social.linkedin;
            socialLinks[1].href = data.social.github;
            socialLinks[2].href = data.social.portfolio;
    
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
} 