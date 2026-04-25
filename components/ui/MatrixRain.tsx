"use client";

import { useEffect, useRef, useCallback } from "react";

// ============================================================
// MATRIX RAIN — The Falling Code Effect
// Acepta Bitcoin México | Oracle System v2.0
// ============================================================

interface MatrixRainProps {
  className?: string;
  density?: number;      // Characters per column (default: 20)
  speed?: number;        // Fall speed multiplier (default: 1)
  opacity?: number;      // Base opacity (default: 0.15)
  color?: string;        // Matrix green or custom
}

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/=[]{}";

export default function MatrixRain({
  className = "",
  density = 20,
  speed = 1,
  opacity = 0.12,
  color = "#00FF41",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  const initDrops = useCallback((columns: number) => {
    dropsRef.current = Array.from({ length: columns }, () =>
      Math.random() * -100
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let columns = 0;
    const fontSize = 14;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      initDrops(columns);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      // Fade effect — creates trails
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      ctx.globalAlpha = opacity;

      for (let i = 0; i < dropsRef.current.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = dropsRef.current[i] * fontSize;

        // Leading character is brighter
        ctx.globalAlpha = opacity * 2;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = opacity;

        // Random reset or continue falling
        if (y > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }
        dropsRef.current[i] += speed * (0.5 + Math.random() * 0.5);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [speed, opacity, color, initDrops]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
