// Custom Cursor JS - ENABLED

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Check if device is touch-only
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        return;
    }
    
    // Initial positioning to avoid flash
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
    
    // Set cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        // Make cursor visible after first move
        if (cursor.style.opacity === '0') {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        }
        
        // Position the cursor elements
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Follower has slightly delayed movement for trailing effect
        setTimeout(() => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }, 70);
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .project-card, .social-icon, input, textarea, .nav-link, .menu-toggle, .team-member, .service-card-advanced, .contact-info-item, .project-card-3d');
    
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
            
            // Special effects for different types of elements
            if (el.tagName === 'A' || el.classList.contains('btn')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
                cursor.style.backgroundColor = '#ff0030';
            } else if (el.classList.contains('service-card') || el.classList.contains('project-card') || el.classList.contains('project-card-3d') || el.classList.contains('service-card-advanced')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = '#ff0030';
                cursor.style.backgroundColor = '#ff0030';
            } else if (el.classList.contains('team-member')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.4)';
                cursor.style.backgroundColor = '#ff0030';
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
                cursorFollower.style.opacity = '0';
            } else if (el.classList.contains('nav-link') || el.classList.contains('menu-toggle')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.1)';
                cursor.style.backgroundColor = '#ff0030';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = '#ff0030';
            cursorFollower.style.opacity = '1';
            cursor.style.backgroundColor = '#ff0030';
        });
    });
    
    // Cursor click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    // Enhanced cursor effects for mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('mouseenter', () => {
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                cursor.style.backgroundColor = '#ff0030';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursorFollower.style.borderColor = '#ff0030';
            }
        });
        
        menuToggle.addEventListener('mouseleave', () => {
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = '#ff0030';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.borderColor = '#ff0030';
            }
        });
    }
    
    // Enhanced cursor effects for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursor.style.backgroundColor = '#ff0030';
                cursorFollower.style.borderColor = '#ff0030';
            }
        });
    });
    
    // Special cursor effects for project buttons
    const projectButtons = document.querySelectorAll('.project-btn');
    projectButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
                cursor.style.backgroundColor = '#fff';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.6)';
                cursorFollower.style.borderColor = '#ff0030';
                cursorFollower.style.backgroundColor = 'rgba(255, 0, 48, 0.2)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = '#ff0030';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'transparent';
            }
        });
    });
    
    // Special effects for service CTAs
    const serviceCTAs = document.querySelectorAll('.service-cta');
    serviceCTAs.forEach(cta => {
        cta.addEventListener('mouseenter', () => {
            if (cursor && cursorFollower) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = '#ff0030';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.4)';
                cursorFollower.style.borderColor = '#ff0030';
            }
        });
    });
});