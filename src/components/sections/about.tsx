import { DATA } from "@/data/resume";
import { GlassmorphismCard } from "@/components/glassmorphism-card";

export const About = () => {
  return (
    <section id="about" className="mt-16">
      <GlassmorphismCard className="px-5 py-10">
        <h2 className="mb-3 text-center text-2xl font-bold">Sobre Mim</h2>
        <p className="prose dark:prose-invert text-muted-foreground max-w-full text-center font-sans text-base text-pretty">
          {DATA.summary}
        </p>
      </GlassmorphismCard>
    </section>
  );
};
