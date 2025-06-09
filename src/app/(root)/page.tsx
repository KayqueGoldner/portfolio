"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Hero } from "@/components/sections/hero";
import { BackgroundIconsEffect } from "@/components/background-icons-effect";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { LoadingPage } from "@/components/loading-page";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingPage onLoaded={() => setIsLoading(false)} />
      ) : (
        <motion.main
          key="content"
          className="relative mx-auto flex min-h-dvh max-w-4xl flex-col gap-10 px-4 pt-6 pb-12 sm:py-24"
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
          <Contact />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
