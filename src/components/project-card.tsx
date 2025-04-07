import { GlassmorphismCard } from "@/components/glassmorphism-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <GlassmorphismCard className="p-0">
      <div
        className={
          "flex h-full flex-col gap-2 overflow-hidden p-3 transition-all duration-300 ease-out hover:shadow-lg"
        }
      >
        <div className="p-0 pb-2">
          <div className="flex items-center justify-between gap-5">
            <h1 className="mt-1 text-lg font-bold">{title}</h1>
            <time className="font-sans text-xs font-semibold">{dates}</time>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {tags?.map((tag) => (
                  <Badge
                    className="px-1.5 py-0.5 text-xs"
                    variant="secondary"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <Link
          href={href || "#"}
          className={cn(
            "block cursor-pointer overflow-hidden rounded-lg",
            className,
          )}
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-top"
            />
          )}
        </Link>
        <div className="p-0 py-1">
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="border-t p-0 pt-2">
          {links && links.length > 0 && (
            <div className="flex flex-row flex-wrap items-start gap-1">
              {links?.map((link, idx) => (
                <Button
                  key={idx}
                  className="h-auto px-2 py-1.5"
                  disabled={!link?.href}
                  asChild={!!link?.href}
                >
                  <Link
                    href={link?.href}
                    target="_blank"
                    className="flex gap-2 text-xs font-semibold"
                    data-cursor-stick
                  >
                    {link.icon}
                    {link.type}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlassmorphismCard>
  );
}
