"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { DATA } from "@/data/resume";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

interface LoadingPageProps {
  onLoaded: () => void;
}

export const LoadingPage = ({ onLoaded }: LoadingPageProps) => {
  const [mounted, setMounted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [waveKey, setWaveKey] = useState(0);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const totalTime = 5000;
    const intervalTime = 150;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setLoadingProgress(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => onLoaded(), 500);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const handleWaveComplete = () => {
    setWaveKey((prevKey) => prevKey + 1);
  };

  const waveGradientColor = (opacity: number) => {
    const currentTheme = resolvedTheme || "light";

    return currentTheme === "dark"
      ? `rgba(200, 200, 200, ${opacity})`
      : `rgba(0, 0, 0, ${opacity + 0.05})`;
  };

  if (!mounted) return null;

  return (
    <motion.div
      key="loading"
      className="bg-background relative flex h-dvh w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        key={`wave-${waveKey}`}
        className="absolute top-0 h-60 w-full blur-xl"
        initial={{ y: "-100%" }}
        animate={{ y: "100vh" }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
        onAnimationComplete={handleWaveComplete}
        style={{
          background: `linear-gradient(to top, ${waveGradientColor(0.02)}, ${waveGradientColor(0.01)})`,
          maskImage: `linear-gradient(to top, ${waveGradientColor(1)} 30%, ${waveGradientColor(1)})`,
          WebkitMaskImage: `linear-gradient(to top, ${waveGradientColor(1)} 30%, ${waveGradientColor(1)})`,
        }}
      />

      <div className="relative z-10">
        <AnimatedGradientText
          className="mx-auto w-max text-center text-5xl font-bold"
          colorFrom="#454545"
          colorTo="#f1f1f1"
          speed={2}
        >
          {DATA.initials}
        </AnimatedGradientText>
      </div>
    </motion.div>
  );
};

/* 
  <div className="flex opacity-30">
    {DATA.name.split("").map((char, index) => (
      <span
        key={index}
        className={cn(
          "text-5xl font-bold tracking-tight sm:text-7xl xl:text-8xl/none",
          char === "<" || char === "/" || char === ">"
            ? "text-primary"
            : "text-foreground",
        )}
      >
        {char}
      </span>
    ))}
  </div>

  <motion.div
    ref={textRef}
    className="absolute inset-0 flex overflow-hidden"
    initial={{ width: "0%" }}
    animate={{ width: `${loadingProgress}%` }}
    transition={{ duration: 0.3 }}
  >
    {DATA.name.split("").map((char, index) => (
      <span
        key={index}
        className={cn(
          "text-5xl font-bold tracking-tight sm:text-7xl xl:text-8xl/none",
          char === "<" || char === "/" || char === ">"
            ? "text-primary"
            : "text-foreground",
        )}
      >
        {char}
      </span>
    ))}
  </motion.div>
*/
