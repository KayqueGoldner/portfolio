"use client";

import React from "react";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
}: ResumeCardProps) => {
  return (
    <Link href={href || "#"} className="block cursor-pointer" target="_blank">
      <Card className="bg-transparent py-1.5 shadow-none" data-cursor-stick>
        <CardContent className="group/resumeCard flex grow items-center gap-4 pr-10 pl-3">
          <div className="flex-none">
            <Image
              src={logoUrl}
              alt={altText}
              className="size-12 rounded-full bg-black object-contain p-0 dark:bg-black"
              width={196}
              height={196}
            />
          </div>
          <div className="space-y-1">
            <CardTitle className="inline-flex items-center justify-center text-sm leading-none font-semibold whitespace-nowrap sm:text-base">
              {title}
              <ChevronRightIcon className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover/resumeCard:translate-x-1 group-hover/resumeCard:opacity-100" />
            </CardTitle>
            {subtitle && <div className="font-sans text-sm">{subtitle}</div>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
