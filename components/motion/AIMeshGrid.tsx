"use client";

import React, { useEffect, useRef } from "react";

interface AIMeshGridProps {
  className?: string;
}

export const AIMeshGrid: React.FC<AIMeshGridProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse Coordinates relative to container
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Grid Node Mesh Setup
    const gridSize = 60;
    const cols = Math.ceil(width / gridSize) + 1;
    const rows = Math.ceil(height / gridSize) + 1;

    interface Node {
      x: number;
      y: number;
      pulse: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        nodes.push({
          x: c * gridSize,
          y: r * gridSize,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    }

    // Floating Data Packets
    interface Packet {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
    }

    const packets: Packet[] = [];
    for (let i = 0; i < 18; i++) {
      const col = Math.floor(Math.random() * (cols - 1));
      const row = Math.floor(Math.random() * (rows - 1));
      packets.push({
        x: col * gridSize,
        y: row * gridSize,
        targetX: (col + (Math.random() > 0.5 ? 1 : -1)) * gridSize,
        targetY: (row + (Math.random() > 0.5 ? 1 : -1)) * gridSize,
        progress: 0,
        speed: 0.012 + Math.random() * 0.02,
      });
    }

    // Render Loop with Theme Adaptation
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLightMode = document.documentElement.classList.contains("light");
      const gridLineColor = isLightMode ? "rgba(231, 45, 49, 0.16)" : "rgba(231, 45, 49, 0.11)";
      const nodeColor = isLightMode ? "rgba(231, 45, 49, 0.4)" : "rgba(231, 45, 49, 0.25)";

      // Draw Grid Lines
      ctx.strokeStyle = gridLineColor;
      ctx.lineWidth = isLightMode ? 1 : 0.8;

      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        ctx.moveTo(c * gridSize, 0);
        ctx.lineTo(c * gridSize, height);
      }
      for (let r = 0; r < rows; r++) {
        ctx.moveTo(0, r * gridSize);
        ctx.lineTo(width, r * gridSize);
      }
      ctx.stroke();

      // Update & Draw Neural Nodes
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
        const opacity = (isLightMode ? 0.25 : 0.15) + Math.sin(node.pulse) * 0.12;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseGlow = Math.max(0, 1 - dist / 180);

        ctx.fillStyle = isLightMode
          ? `rgba(231, 45, 49, ${Math.min(1, opacity + mouseGlow * 0.85)})`
          : `rgba(231, 45, 49, ${Math.min(1, opacity + mouseGlow * 0.75)})`;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8 + mouseGlow * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Laser tendrils connecting mouse to nearby nodes
        if (dist < 150) {
          ctx.strokeStyle = `rgba(231, 45, 49, ${0.45 * (1 - dist / 150)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      // Update & Draw Animated Data Packets
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.x = pkt.targetX;
          pkt.y = pkt.targetY;

          const col = Math.round(pkt.x / gridSize);
          const row = Math.round(pkt.y / gridSize);
          const dir = Math.random();
          let nextCol = col;
          let nextRow = row;

          if (dir < 0.25 && col < cols - 1) nextCol = col + 1;
          else if (dir < 0.5 && col > 0) nextCol = col - 1;
          else if (dir < 0.75 && row < rows - 1) nextRow = row + 1;
          else if (row > 0) nextRow = row - 1;

          pkt.targetX = nextCol * gridSize;
          pkt.targetY = nextRow * gridSize;
        }

        const currentX = pkt.x + (pkt.targetX - pkt.x) * pkt.progress;
        const currentY = pkt.y + (pkt.targetY - pkt.y) * pkt.progress;

        ctx.fillStyle = "#E72D31";
        ctx.shadowColor = "#E72D31";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full opacity-90" />
    </div>
  );
};

export default AIMeshGrid;
