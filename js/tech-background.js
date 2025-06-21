// Particle network animation
// This creates connecting dots and lines that look like a network/data visualization

class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particleCount = 100;
        this.particles = [];
        this.maxDistance = 120;
        this.colors = ['#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#e74c3c'];
        
        this.init();
    }
    
    init() {
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.7';
        document.querySelector('.hero-section').appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.createParticles();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for(let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25,
                radius: Math.random() * 2 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Move particles
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if(p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            // Draw particles
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // Connect particles with lines
            for(let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if(distance < this.maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255,255,255,${1 - distance/this.maxDistance})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the particle network when the page loads
window.addEventListener('load', () => {
    new ParticleNetwork();
});