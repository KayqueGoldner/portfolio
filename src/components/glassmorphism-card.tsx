"use client";

import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/magicui/magic-card";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassmorphismCard = ({
  children,
  className,
}: GlassmorphismCardProps) => {
  const { theme } = useTheme();

  return (
    <MagicCard
      className={cn(
        "bg-background/10 rounded-xl p-6 backdrop-blur-xl",
        className,
      )}
      gradientColor={theme === "dark" ? "#262626" : "#ffffff"}
    >
      {children}
    </MagicCard>
  );
};
