"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  // Increase stiffness for the ring to make it follow more closely
  const ringSpringX = useSpring(cursorX, { damping: 10, stiffness: 200 });
  const ringSpringY = useSpring(cursorY, { damping: 10, stiffness: 200 });

  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stickyElement, setStickyElement] = useState<HTMLElement | null>(null);
  const [stickyRect, setStickyRect] = useState<DOMRect | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const rafRef = useRef<number | null>(null);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // detect mobile devices
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

    const updatePosition = (e: MouseEvent) => {
      // Set position directly without requestAnimationFrame for faster response
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        window.getComputedStyle(target).cursor === "pointer";

      // Check if it's an element with data-cursor-stick attribute
      const stickyTarget = target.hasAttribute("data-cursor-stick")
        ? target
        : target.closest("[data-cursor-stick]");

      if (stickyTarget) {
        if (exitTimerRef.current) {
          clearTimeout(exitTimerRef.current);
          exitTimerRef.current = null;
        }
        setIsExiting(false);
        setStickyElement(stickyTarget as HTMLElement);
        setStickyRect(stickyTarget.getBoundingClientRect());
      } else if (stickyElement && !isExiting) {
        // Start exit animation
        setIsExiting(true);

        // Clear sticky element after animation completes
        exitTimerRef.current = setTimeout(() => {
          setStickyElement(null);
          setStickyRect(null);
          setIsExiting(false);
        }, 400); // Match this with the animation duration
      }

      setIsPointer(!!isClickable);
    };

    // Handle scroll event to reset sticky cursor
    const handleScroll = () => {
      if (stickyElement || isExiting) {
        if (exitTimerRef.current) {
          clearTimeout(exitTimerRef.current);
          exitTimerRef.current = null;
        }

        // Reset sticky states immediately
        setStickyElement(null);
        setStickyRect(null);
        setIsExiting(false);
        setIsPointer(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setStickyElement(null);
      setStickyRect(null);
      setIsExiting(false);
    };

    document.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [cursorX, cursorY, stickyElement, isExiting]);

  if (!isMounted || isMobile) return null;

  return (
    <>
      {/* Only apply cursor: none on client-side to prevent hydration mismatch */}
      {isMounted && !isMobile && (
        <style jsx global>{`
          html,
          body,
          * {
            cursor: none !important;
          }

          /* Fix for specific elements that might still show the default cursor */
          a,
          button,
          [role="button"],
          input,
          select,
          textarea,
          [type="button"],
          [type="submit"],
          [type="reset"],
          [class*="cursor-pointer"] {
            cursor: none !important;
          }
        `}</style>
      )}

      {/* Main cursor dot - using direct position values instead of springs */}
      <motion.div
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-100",
          isVisible ? "opacity-100" : "opacity-0",
          stickyElement ? "opacity-70" : "",
        )}
        style={{
          x: cursorX,
          y: cursorY,
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 70%, transparent 100%)",
          boxShadow: "0 0 10px 2px hsl(var(--primary)/0.3)",
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 400,
            mass: 0.3,
          },
        }}
      />

      {/* Cursor ring - either follows cursor or sticks to element */}
      <AnimatePresence mode="sync">
        {!stickyElement && !isExiting ? (
          <motion.div
            key="normal-ring"
            className={cn(
              "pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-100",
              isVisible ? "opacity-100" : "opacity-0",
            )}
            style={{
              x: ringSpringX,
              y: ringSpringY,
              border: isPointer
                ? "2px solid hsl(var(--primary))"
                : "1px solid hsl(var(--primary))",
              boxShadow: isPointer
                ? "0 0 15px 2px hsl(var(--primary)/0.2)"
                : "0 0 10px 1px hsl(var(--primary)/0.1)",
            }}
            animate={{
              scale: isClicking ? 0.9 : 1,
              width: isPointer ? 48 : 32,
              height: isPointer ? 48 : 32,
            }}
            transition={{
              scale: {
                type: "spring",
                damping: 20,
                stiffness: 200,
                mass: 0.8,
              },
              width: {
                type: "spring",
                damping: 15,
                stiffness: 300,
              },
              height: {
                type: "spring",
                damping: 15,
                stiffness: 300,
              },
            }}
          />
        ) : isExiting ? (
          <motion.div
            key="exiting-ring"
            className="border-primary pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-opacity duration-100"
            initial={{
              width: stickyRect?.width ?? 32,
              height: stickyRect?.height ?? 32,
              borderRadius: stickyElement
                ? window.getComputedStyle(stickyElement).borderRadius
                : "0.25rem",
              opacity: 0.5,
              scale: 1,
            }}
            animate={{
              width: 32,
              height: 32,
              borderRadius: "9999px",
              opacity: 0.5,
              scale: 1,
            }}
            style={{
              x: ringSpringX,
              y: ringSpringY,
            }}
            exit={{ opacity: 0 }}
            transition={{
              width: { type: "spring", damping: 15, stiffness: 200 },
              height: { type: "spring", damping: 15, stiffness: 200 },
              borderRadius: { type: "spring", damping: 15, stiffness: 200 },
              opacity: { duration: 0.1 },
              scale: { type: "spring", damping: 15, stiffness: 200 },
            }}
          />
        ) : (
          <motion.div
            key="sticky-ring"
            className="pointer-events-none fixed z-[9999] rounded-[inherit] transition-opacity duration-100"
            style={{
              top: stickyRect?.top ?? 0,
              left: stickyRect?.left ?? 0,
              width: stickyRect?.width ?? 32,
              height: stickyRect?.height ?? 32,
              border: "2px solid hsl(var(--primary))",
              boxShadow: "0 0 15px 2px hsl(var(--primary)/0.2)",
              borderRadius: stickyElement
                ? window.getComputedStyle(stickyElement).borderRadius
                : "0.25rem",
              opacity: 1,
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: isClicking ? 0.98 : 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              scale: {
                type: "spring",
                damping: 20,
                stiffness: 300,
              },
              opacity: {
                duration: 0.1,
              },
            }}
          />
        )}
      </AnimatePresence>

      {/* Decorative particles that follow the cursor */}
      {isPointer && !isExiting && isVisible && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9998]"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-primary/30 absolute rounded-full"
              initial={{
                width: 4,
                height: 4,
                x: 0,
                y: 0,
                opacity: 0.7,
              }}
              animate={{
                x: Math.sin(i * (Math.PI / 3)) * 20,
                y: Math.cos(i * (Math.PI / 3)) * 20,
                opacity: 0,
                scale: 1.5,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.2,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
}
