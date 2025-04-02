"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  // Initialize isFixed to false (will show in hero initially)
  const [isFixed, setIsFixed] = useState(false);
  // Initialize mounted to true to ensure initial render
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Ensure we're running on the client
    if (typeof window === "undefined") return;

    // Mark component as mounted
    setMounted(true);

    const handleScroll = () => {
      // Get the hero section height to determine when to fix the navbar
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        // Add some offset to make the transition happen after scrolling past the hero description
        const scrollThreshold = heroHeight - 100;

        if (window.scrollY > scrollThreshold) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check - run immediately and then again after a delay
    handleScroll();

    // Run again after a delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      handleScroll();
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Always render the component, even during hydration
  return (
    <div
      className={cn(
        "pointer-events-none z-30 mx-auto flex h-14 origin-bottom transition-all duration-300",
        isFixed ? "fixed inset-x-0 bottom-0 mb-4" : "relative mt-8",
      )}
    >
      {isFixed && (
        <div className="bg-background dark:bg-background fixed inset-x-0 bottom-0 h-16 w-full to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"></div>
      )}
      <Dock
        className={cn(
          "bg-background pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
          !isFixed && "h-full w-max",
        )}
      >
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(DATA.contact.social)
          .filter(([, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12",
                    )}
                    target="_blank"
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize">{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
