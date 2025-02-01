"use client";

import React from "react";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Card className="flex items-center gap-4 px-5 py-3">
        <div className="flex-none">
          <Image
            src={logoUrl}
            alt={altText}
            className="size-14 rounded-full border bg-black object-contain p-0 dark:bg-black"
            width={196}
            height={196}
          />
        </div>
        <div className="group grow flex-col items-center">
          <CardHeader className="w-max space-y-1 p-0">
            <CardTitle className="inline-flex items-center justify-center text-sm font-semibold leading-none sm:text-base">
              {title}
              <ChevronRightIcon className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
            </CardTitle>
            {subtitle && <div className="font-sans text-sm">{subtitle}</div>}
          </CardHeader>
        </div>
      </Card>
    </Link>
  );
};
