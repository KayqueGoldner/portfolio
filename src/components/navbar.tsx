"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollThreshold = heroHeight - 100;

        if (window.scrollY > scrollThreshold) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    const timer = setTimeout(() => {
      handleScroll();
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const isFirefox =
    typeof navigator !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("firefox");

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
                  data-cursor-stick
                >
                  <item.icon />
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
                    data-cursor-stick
                  >
                    <social.icon />
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
              {isFirefox ? (
                <ModeToggle />
              ) : (
                <AnimatedThemeToggler
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "size-12",
                  )}
                />
              )}
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
