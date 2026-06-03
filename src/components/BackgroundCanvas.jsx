import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isLowPerfDevice = window.matchMedia("(max-width: 900px)").matches || window.matchMedia("(pointer: coarse)").matches || prefersReducedMotion;

    const particles = [];
    const particleCount = Math.min(isLowPerfDevice ? 32 : 60, Math.floor((width * height) / (isLowPerfDevice ? 32000 : 25000)));
    
    const mouse = {
      x: null,
      y: null,
      radius: isLowPerfDevice ? 100 : 120,
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.8;
        this.vx = (Math.random() - 0.5) * (isLowPerfDevice ? 0.26 : 0.35);
        this.vy = (Math.random() - 0.5) * (isLowPerfDevice ? 0.26 : 0.35);
        this.baseColor = Math.random() > 0.5 ? "rgba(0, 245, 255, 0.4)" : "rgba(189, 0, 255, 0.4)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 0.6;
            this.y += (dy / distance) * force * 0.6;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        if (!isLowPerfDevice) {
          ctx.shadowColor = this.baseColor;
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        if (!isLowPerfDevice) ctx.shadowBlur = 0;
      }
    }

    // Populate particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles with lines
    function drawLines() {
      if (isLowPerfDevice) return;
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.baseColor.replace("0.4", String(alpha)));
            grad.addColorStop(1, p2.baseColor.replace("0.4", String(alpha)));
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    let frameCounter = 0;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "rgba(7, 10, 19, 0.05)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      if (!isLowPerfDevice || frameCounter % 2 === 0) {
        drawLines();
      }
      frameCounter += 1;

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Event listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isLowPerfDevice = window.matchMedia("(max-width: 900px)").matches || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      particles.length = 0;
      const newCount = Math.min(isLowPerfDevice ? 35 : 65, Math.floor((width * height) / (isLowPerfDevice ? 32000 : 25000)));
      mouse.radius = isLowPerfDevice ? 100 : 120;
      for (let i = 0; i < newCount; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
