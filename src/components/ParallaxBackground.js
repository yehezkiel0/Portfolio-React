import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const ParallaxBackground = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme() || { theme: "light" };

  useEffect(() => {
    if (!containerRef.current) return;

    // Create canvas elements for parallax effect
    const container = containerRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions and append to container
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    // Remove any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(canvas);

    // Create particles
    const particles = [];
    const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive particle count
    const isDarkTheme = theme === "dark";

    // Particle properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation variables
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse movement for interactive effect
    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Calculate distance from mouse for interactive effect
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        // Apply subtle influence based on mouse position
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.speedX += dx * force * 0.01;
          particle.speedY += dy * force * 0.01;
        }

        // Apply speed limits
        particle.speedX = Math.max(-1, Math.min(1, particle.speedX));
        particle.speedY = Math.max(-1, Math.min(1, particle.speedY));

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const color = isDarkTheme
          ? `rgba(255, 255, 255, ${particle.opacity * 0.5})`
          : `rgba(0, 0, 0, ${particle.opacity * 0.3})`;
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw connections between close particles
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only connect nearby particles
          if (distance < 100) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const opacity = (1 - distance / 100) * 0.15;
            ctx.strokeStyle = isDarkTheme
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`;
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParallaxBackground;
