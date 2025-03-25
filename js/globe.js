// 3D tech globe animation
document.addEventListener('DOMContentLoaded', function() {
    const canvasHero = document.getElementById('heroGlobeCanvas');
    
    // Only proceed if canvas exists
    if (canvasHero) {
        const sceneHero = new THREE.Scene();
        const cameraHero = new THREE.PerspectiveCamera(75, canvasHero.clientWidth / canvasHero.clientHeight, 0.1, 1000);
        cameraHero.position.z = 2.8;

        const rendererHero = new THREE.WebGLRenderer({ canvas: canvasHero, alpha: true });
        rendererHero.setSize(canvasHero.clientWidth, canvasHero.clientHeight);
        rendererHero.setPixelRatio(window.devicePixelRatio);

        const geometryHero = new THREE.SphereGeometry(1, 10, 10);
        const glowMaterialHero = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color('#ff0035') },
                pointSize: { value: 3.0 }
            },
            vertexShader: `
                uniform float pointSize;
                void main() {
                    gl_PointSize = pointSize;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                void main() {
                    float strength = 1.0 - length(gl_PointCoord - vec2(0.5));
                    strength = pow(strength, 3.0);
                    gl_FragColor = vec4(color * strength, strength);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const pointsHero = new THREE.Points(geometryHero, glowMaterialHero);
        sceneHero.add(pointsHero);

        const wireMaterialHero = new THREE.LineBasicMaterial({ color: 0xff0035, transparent: true, opacity: 0.1 });
        const wireframeHero = new THREE.LineSegments(new THREE.WireframeGeometry(geometryHero), wireMaterialHero);
        sceneHero.add(wireframeHero);

        function animateHero() {
            requestAnimationFrame(animateHero);
            pointsHero.rotation.y += 0.002;
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
  // Initialize VANTA globe with brand colors
  vantaEffect = VANTA.GLOBE({
    el: "#home",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xff0035, // Using the primary color from your site (red)
    backgroundColor: 0x0a0a0a, // Matching your site's background
    size: 1.20,
    speed: 1.00,
    points: 15.00,
    maxDistance: 25.00,
    spacing: 15.00
  });

  // Add scroll-based interactivity
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const homeSection = document.getElementById('home');
    const homeSectionHeight = homeSection.offsetHeight;
    
    // Only adjust effect if user is in the home section viewport
    if (scrollPosition <= homeSectionHeight) {
      // Adjust speed based on scroll position - slows down as you scroll away
      if (vantaEffect) {
        const speedFactor = 1 - (scrollPosition / (homeSectionHeight * 1.2));
        vantaEffect.options.speed = Math.max(0.3, speedFactor * 1.0);
        
        // Create slight parallax effect by adjusting size
        vantaEffect.options.size = 1.20 + (scrollPosition / homeSectionHeight * 0.2);
        
        // Update the effect with new options
        vantaEffect.setOptions(vantaEffect.options);
      }
    }
  });

  // Add mouse move interactivity to enhance the 3D feel
  homeSection.addEventListener('mousemove', (event) => {
    if (vantaEffect) {
      const mouseX = event.clientX / window.innerWidth;
      const mouseY = event.clientY / window.innerHeight;
      
      // Subtle shift in colors based on mouse position
      const hue = mouseX * 20; // Small color variation
      vantaEffect.options.color = adjustHue(0xff0035, hue);
      
      // Update the effect with new options
      vantaEffect.setOptions(vantaEffect.options);
    }
  });
}

// Helper function to adjust color hue slightly
function adjustHue(hexColor, degrees) {
  // Convert hex to RGB
  let r = (hexColor >> 16) & 255;
  let g = (hexColor >> 8) & 255;
  let b = hexColor & 255;
  
  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Adjust hue
  h = (h * 360 + degrees) % 360;
  h /= 360;

  // Convert back to RGB
  let r1, g1, b1;

  if (s === 0) {
    r1 = g1 = b1 = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r1 = hue2rgb(p, q, h + 1/3);
    g1 = hue2rgb(p, q, h);
    b1 = hue2rgb(p, q, h - 1/3);
  }

  // Convert back to hex
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  const hexValue = parseInt(`${toHex(r1)}${toHex(g1)}${toHex(b1)}`, 16);
  return hexValue;
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