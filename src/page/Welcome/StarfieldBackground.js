import { useEffect, useRef } from 'react';

/**
 * Animated Galaxy Starfield Background
 * Creates a dynamic starfield effect with stars moving towards the viewer
 */
const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let stars = [];
    let staticStars = [];
    const numStars = 700; // Increased count
    const numStaticStars = 400; // Increased count
    let animationId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Moving Star class
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width - canvas.width / 2;
        this.y = Math.random() * canvas.height - canvas.height / 2;
        this.z = Math.random() * canvas.width;
        this.pz = this.z;
        this.baseSize = Math.random() * 0.5 + 0.3; // Tiny: 0.3-0.8
      }

      update() {
        this.z = this.z - 3;

        if (this.z < 1) {
          this.reset();
          this.z = canvas.width;
          this.pz = this.z;
        }
      }

      draw() {
        const sx = (this.x / this.z) * canvas.width + canvas.width / 2;
        const sy = (this.y / this.z) * canvas.height + canvas.height / 2;

        const r = (1 - this.z / canvas.width) * 1 + this.baseSize; // Tiny: max 2

        const px = (this.x / this.pz) * canvas.width + canvas.width / 2;
        const py = (this.y / this.pz) * canvas.height + canvas.height / 2;

        this.pz = this.z;

        // Draw star trail
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);

        const depth = this.z / canvas.width;
        const alpha = Math.min(1 - depth + 0.3, 1);

        if (depth < 0.3) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.8})`;
        } else if (depth < 0.6) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.8})`;
        } else {
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.8})`;
        }

        ctx.lineWidth = r;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw star glow - tiny
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.fill();

        // Draw bright center - tiny dot
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha + 0.5, 1)})`;
        ctx.fill();
      }
    }

    // Static Star class (twinkling background stars)
    class StaticStar {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 0.5 + 0.2; // Tiny: 0.2-0.7
        this.alpha = Math.random() * 0.6 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      draw() {
        this.twinklePhase += this.twinkleSpeed;
        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
        const currentAlpha = this.alpha * twinkle;

        // Draw star
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();

        // Draw subtle glow - tiny
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 1.2);
        gradient.addColorStop(0, `rgba(200, 220, 255, ${currentAlpha * 0.2})`);
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize moving stars
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    // Initialize static stars
    for (let i = 0; i < numStaticStars; i++) {
      staticStars.push(new StaticStar());
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 12, 27, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static stars first (background layer)
      staticStars.forEach(star => star.draw());

      // Draw moving stars (foreground layer)
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarfieldBackground;
