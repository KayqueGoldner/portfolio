"use client";

import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBorderRef = useRef<HTMLDivElement>(null);

  const isOverBox = useRef(false);
  const stuckElementRef = useRef<HTMLElement | null>(null);

  const mousePosRef = useRef({ x: 0, y: 0 });
  const cursorBorderPos = useRef({ x: 0, y: 0 });
  const particleInterval = useRef<NodeJS.Timeout | null>(null);
  const particleAngle = useRef(-Math.PI / 2);
  const particlesActive = useRef(false);

  const animationFrameRef = useRef<number | null>(null);
  const animationLoopRef = useRef<number | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
        ),
      );
      setIsMobile(mobile || window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const updateCursorPosition = () => {
      if (!cursorRef.current || !cursorBorderRef.current) return;

      cursorRef.current.style.left = `${mousePosRef.current.x}px`;
      cursorRef.current.style.top = `${mousePosRef.current.y}px`;

      if (!isOverBox.current) {
        cursorBorderPos.current = {
          x: lerp(cursorBorderPos.current.x, mousePosRef.current.x, 0.2),
          y: lerp(cursorBorderPos.current.y, mousePosRef.current.y, 0.2),
        };

        cursorBorderRef.current.style.left = `${cursorBorderPos.current.x}px`;
        cursorBorderRef.current.style.top = `${cursorBorderPos.current.y}px`;
      }

      animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
    };

    const updateStuckPosition = () => {
      if (
        isOverBox.current &&
        stuckElementRef.current &&
        cursorBorderRef.current
      ) {
        const rect = stuckElementRef.current.getBoundingClientRect();
        const borderRadius = getComputedStyle(
          stuckElementRef.current,
        ).borderRadius;

        cursorBorderRef.current.style.left = `${rect.left + rect.width / 2}px`;
        cursorBorderRef.current.style.top = `${rect.top + rect.height / 2}px`;
        cursorBorderRef.current.style.width = `${rect.width}px`;
        cursorBorderRef.current.style.height = `${rect.height}px`;
        cursorBorderRef.current.style.borderRadius = borderRadius;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.matches !== "function") return;

      if (target.matches("[data-cursor-stick]")) {
        isOverBox.current = true;
        stuckElementRef.current = target;
        updateStuckPosition();
      }

      if (target.matches("[data-particles]")) {
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
        if (cursorBorderRef.current) {
          cursorBorderRef.current.style.width = "50px";
          cursorBorderRef.current.style.height = "50px";
          cursorBorderRef.current.style.opacity = "0.5";
        }
        startParticles();
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.matches !== "function") return;

      if (target.matches("[data-cursor-stick]")) {
        isOverBox.current = false;
        stuckElementRef.current = null;

        if (cursorBorderRef.current) {
          cursorBorderRef.current.style.width = "38px";
          cursorBorderRef.current.style.height = "38px";
          cursorBorderRef.current.style.borderRadius = "50%";

          cursorBorderRef.current.style.left = `${cursorBorderPos.current.x}px`;
          cursorBorderRef.current.style.top = `${cursorBorderPos.current.y}px`;
        }
      }

      if (target.matches("[data-particles]")) {
        if (cursorRef.current) cursorRef.current.style.opacity = "0.6";
        if (cursorBorderRef.current) {
          cursorBorderRef.current.style.width = "38px";
          cursorBorderRef.current.style.height = "38px";
          cursorBorderRef.current.style.opacity = "1";
        }
        stopParticles();
      }
    };

    const startParticles = () => {
      if (particlesActive.current) return;
      particlesActive.current = true;

      particleInterval.current = setInterval(() => {
        createParticle(particleAngle.current);
        const angleStep = Math.PI / 3;
        particleAngle.current -= angleStep;
        if (particleAngle.current < -Math.PI * 2) {
          particleAngle.current += Math.PI * 2;
        }
      }, 200);
    };

    const stopParticles = () => {
      if (particleInterval.current) {
        clearInterval(particleInterval.current);
        particleInterval.current = null;
      }
      particleAngle.current = -Math.PI / 2;
      particlesActive.current = false;
    };

    const createParticle = (angle: number) => {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const { x, y } = mousePosRef.current;
      const offset = 8;
      const originX = x + Math.cos(angle) * offset;
      const originY = y + Math.sin(angle) * offset;

      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;

      const travelDistance = 20;

      particle.animate(
        [
          { transform: `translate(-50%, -50%) translate(0, 0)`, opacity: 0.5 },
          {
            transform: `translate(-50%, -50%) translate(${Math.cos(angle) * travelDistance}px, ${Math.sin(angle) * travelDistance}px)`,
            opacity: 0,
          },
        ],
        {
          duration: 2000,
          easing: "ease-out",
          fill: "forwards",
        },
      );

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1600);
    };

    const animationLoop = () => {
      updateStuckPosition();
      animationLoopRef.current = requestAnimationFrame(animationLoop);
    };

    cursorBorderPos.current = { ...mousePosRef.current };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
    animationLoopRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (animationLoopRef.current) {
        cancelAnimationFrame(animationLoopRef.current);
      }
      stopParticles();
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={cursorBorderRef} className="cursor-border"></div>
    </>
  );
};
