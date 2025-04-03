"use client";

import { GlassmorphismCard } from "@/components/glassmorphism-card";
import { DATA } from "@/data/resume";
import { ResumeCard } from "@/components/resume-card";

export const Education = () => {
  return (
    <section id="education" className="mt-16">
      <GlassmorphismCard className="px-5 py-10">
        <h2 className="mb-3 text-center text-2xl font-bold">Educação</h2>
        <div className="flex min-h-0 flex-wrap gap-3">
          {DATA.education.map((education) => (
            <ResumeCard
              key={education.school}
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
            />
          ))}
        </div>
      </GlassmorphismCard>
    </section>
  );
};
