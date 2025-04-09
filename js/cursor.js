// Custom Cursor JS - DISABLED

document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor functionality disabled
    
    // Original code commented out below
    /*
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
    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .project-card, .social-icon, input, textarea, .nav-link, .menu-toggle');
    
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
            
            // Special effects for different types of elements
            if (el.tagName === 'A' || el.classList.contains('btn')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
            } else if (el.classList.contains('service-card') || el.classList.contains('project-card')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = 'var(--primary-color)';
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
                cursorFollower.style.opacity = '0';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary-color)';
            cursorFollower.style.opacity = '1';
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
    */
});