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