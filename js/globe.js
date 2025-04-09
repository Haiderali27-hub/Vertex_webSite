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
  vantaEffect = VANTA.GLOBE({
    el: "#home",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x10b981, // Changed to emerald green
    backgroundColor: 0x0a0a0a,
    size: 1.20,
    speed: 0.8,
    points: 0,
    maxDistance: 0,
    spacing: 0
  });

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
  }
});

// Clean up resources when page is unloaded
window.addEventListener('beforeunload', () => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }
});