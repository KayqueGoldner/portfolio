"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface TextEffectProps {
  text: string;
  className?: string;
}

export const TextHoverEffect = ({ text, className }: TextEffectProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 200,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Use a default color for server-side rendering
  const darkModeColor = "#303030";
  const lightModeColor = "#e0e0e0";

  const baseColor = theme === "dark" ? darkModeColor : lightModeColor;

  const darkModeHighlight = (opacity: number) => {
    return `rgba(255, 255, 255, ${opacity})`;
  };
  const lightModeHighlight = (opacity: number) => {
    return `rgba(0, 0, 0, ${opacity})`;
  };
  const getHightlightColor = (opacity: number) => {
    return theme === "dark"
      ? darkModeHighlight(opacity)
      : lightModeHighlight(opacity);
  };

  return (
    <motion.h1
      ref={textRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-max cursor-default text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none",
        className,
      )}
      style={{
        color: baseColor,
      }}
    >
      <span className="relative z-10">
        {text.split("").map((char, index) => {
          const opacity = Math.max(
            0.3,
            1 - Math.abs(index * 15 - mousePosition.x) / 100,
          );

          const highlightColor = getHightlightColor(opacity);

          return (
            <motion.span
              key={index}
              style={{
                display: "inline-block",
                color: mounted && isHovering ? highlightColor : baseColor,
                whiteSpace: "pre",
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </motion.h1>
  );
};
