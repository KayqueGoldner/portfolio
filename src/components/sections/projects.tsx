"use client";

import { MasonryGrid } from "@/components/masonry-grid";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export const Projects = () => {
  return (
    <section id="projects">
      <div className="w-full space-y-12 py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
              Veja o meu trabalho mais recente
            </h2>
            <p className="text-muted-foreground md:text-lg/tight lg:text-base/tight xl:text-lg/tight">
              Trabalhei em uma variedade de projetos, desde sites simples até
              aplicações web mais complexas. Aqui estão alguns dos meus
              favoritos.
            </p>
          </div>
        </div>
        <div>
          <MasonryGrid
            items={DATA.projects}
            columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
            gap={4}
            className="w-full"
            getItemId={(project) => project.title}
            renderItem={(project) => (
              <ProjectCard
                key={project.title}
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
};
