"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { DATA } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { BackgroundIconsEffect } from "@/components/background-icons-effect";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  useEffect(() => {
    // Simulate loading time with progress updates
    const totalTime = 1500; // 1.5 seconds total loading time
    const intervalTime = 150; // Update every 150ms
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const loadingTexts = [
      "Initializing",
      "Loading components",
      "Fetching projects",
      "Compiling skills",
      "Rendering portfolio",
      "Almost ready",
    ];

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setLoadingProgress(progress);

      // Update loading text periodically
      const textIndex = Math.min(
        Math.floor((currentStep / steps) * loadingTexts.length),
        loadingTexts.length - 1,
      );
      setLoadingText(loadingTexts[textIndex]);

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className="bg-background relative flex h-dvh w-full items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Code brackets animation */}
            <motion.div
              className="relative text-4xl font-bold"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.2,
              }}
            >
              <span className="text-primary">&lt;</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  repeatType: "reverse",
                }}
                className="text-foreground mx-1"
              >
                {DATA.initials}
              </motion.span>
              <span className="text-primary">/&gt;</span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 space-y-2">
              <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                <motion.div
                  className="bg-primary h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>{loadingText}</span>
                <span>{loadingProgress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.main
          key="content"
          className="relative mx-auto flex min-h-dvh max-w-4xl flex-col gap-10 pt-6 pb-12 sm:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <BackgroundIconsEffect />
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <section id="contact">
            <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
              <div className="space-y-5">
                <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                  Contato
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Entre em contato
                </h2>
                <div>
                  <Link href={DATA.contact.social.LinkedIn.url} target="_blank">
                    <Button variant="link" className="text-base">
                      <FaLinkedin className="size-5" />
                      LinkedIn
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
