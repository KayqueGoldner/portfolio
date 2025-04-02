"use client";

import { DATA } from "@/data/resume";
import { TextHoverEffect } from "@/components/text-hover-effect";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import Navbar from "@/components/navbar";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const triggerScrollEvent = () => {
      window.dispatchEvent(new Event("scroll"));
    };

    triggerScrollEvent();

    const timer1 = setTimeout(triggerScrollEvent, 200);
    const timer2 = setTimeout(triggerScrollEvent, 500);
    const timer3 = setTimeout(triggerScrollEvent, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="mx-auto w-full space-y-8">
        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-1 flex-col gap-3">
            <TextHoverEffect
              text={DATA.name}
              className="mx-auto text-5xl sm:text-7xl xl:text-8xl/none"
            />
            <div className="w-full pt-10 text-center">
              <AnimatedGradientText
                className="mx-auto w-max text-center md:text-xl"
                colorFrom="#454545"
                colorTo="#f1f1f1"
              >
                {DATA.description}
              </AnimatedGradientText>
            </div>

            <div className="mx-auto w-full max-w-2xl">
              <Navbar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
