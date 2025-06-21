// 3D tech globe animation
document.addEventListener('DOMContentLoaded', function() {
    const canvasHero = document.getElementById('heroGlobeCanvas');
    
    // Only proceed if canvas exists
    if (canvasHero) {
        const sceneHero = new THREE.Scene();
        const cameraHero = new THREE.PerspectiveCamera(75, canvasHero.clientWidth / canvasHero.clientHeight, 0.1, 1000);
        cameraHero.position.z = 2.8;

        const rendererHero = new THREE.WebGLRenderer({ 
            canvas: canvasHero, 
            alpha: true,
            antialias: true
        });
        rendererHero.setSize(canvasHero.clientWidth, canvasHero.clientHeight);
        rendererHero.setPixelRatio(window.devicePixelRatio);

        const geometryHero = new THREE.SphereGeometry(1, 48, 48);
        
        const wireMaterialHero = new THREE.LineBasicMaterial({ 
            color: 0x10b981, // Matching emerald green color
            transparent: true,
            opacity: 0.6 // Increased opacity slightly for better visibility
        });
        
        const wireframeHero = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometryHero),
            wireMaterialHero
        );
        
        sceneHero.add(wireframeHero);

        function animateHero() {
            requestAnimationFrame(animateHero);
            wireframeHero.rotation.y += 0.002;
            rendererHero.render(sceneHero, cameraHero);
        }

        animateHero();

        window.addEventListener('resize', () => {
            cameraHero.aspect = canvasHero.clientWidth / canvasHero.clientHeight;
            cameraHero.updateProjectionMatrix();
            rendererHero.setSize(canvasHero.clientWidth, canvasHero.clientHeight);
        });
    }
});

// Globe animation controller
let vantaEffect = null;

function initGlobeAnimation() {
    // Only initialize on desktop (> 768px)
    if (window.innerWidth > 768) {
        vantaEffect = VANTA.GLOBE({
            el: "#home",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xff0035, // Bright red color
            backgroundColor: 0x111115,
            size: 1.00,
            speed: 1.50,
            points: 0,
            maxDistance: 0,
        });

        // Add pulsing red background glow
        const homeSection = document.getElementById('home');
        if (homeSection) {
            // Add radial gradient background
            homeSection.style.position = 'relative';
            homeSection.style.overflow = 'hidden';
            
            // Create glow element
            const glowElement = document.createElement('div');
            glowElement.className = 'background-glow';
            homeSection.appendChild(glowElement);

            // Add the CSS for the glow animation
            const style = document.createElement('style');
            style.textContent = `
                .background-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(255,0,53,0.2) 0%, rgba(17,17,21,0) 70%);
                    z-index: 0;
                    animation: glowPulse 4s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes glowPulse {
                    0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
                    100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }


  // Scroll-based interactivity
  window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const homeSection = document.getElementById('home');
      const homeSectionHeight = homeSection.offsetHeight;
      
      if (scrollPosition <= homeSectionHeight && vantaEffect) {
          const speedFactor = 1 - (scrollPosition / (homeSectionHeight * 1.2));
          vantaEffect.setOptions({
              speed: Math.max(0.3, speedFactor * 1.0),
              size: 1.20 + (scrollPosition / homeSectionHeight * 0.2)
          });
      }
  });
}

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const homeSection = document.getElementById('home');
  if (homeSection) {
    initGlobeAnimation();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && vantaEffect) {
            vantaEffect.destroy();
            vantaEffect = null;
        } else if (window.innerWidth > 768 && !vantaEffect) {
            initGlobeAnimation();
        }
    });
  }
});

// Clean up resources when page is unloaded
window.addEventListener('beforeunload', () => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }
});