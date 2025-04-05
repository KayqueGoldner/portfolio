import Image from "next/image";

import { DATA } from "@/data/resume";
import { GlassmorphismCard } from "@/components/glassmorphism-card";

export const Skills = () => {
  return (
    <section id="skills">
      <GlassmorphismCard className="px-5 py-10">
        <h2 className="mb-3 text-center text-2xl font-bold">Habilidades</h2>
        <div className="flex flex-wrap gap-4">
          {DATA.skills.map((skill) => (
            <div
              key={skill.label}
              className="flex items-center gap-2 rounded-md border px-4 py-2 dark:border-neutral-900"
            >
              <Image
                src={skill.icon}
                alt={skill.label}
                width={30}
                height={30}
                className="dark:invert"
              />
              <h3 className="font-medium">{skill.label}</h3>
            </div>
          ))}
        </div>
      </GlassmorphismCard>
    </section>
  );
};
