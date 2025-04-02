import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { DATA } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { BackgroundIconsEffect } from "@/components/background-icons-effect";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-10">
      <BackgroundIconsEffect />
      <Hero />
      <section id="about">
        <h2 className="text-xl font-bold">Sobre</h2>
        <p className="prose dark:prose-invert text-muted-foreground max-w-full font-sans text-base text-pretty">
          {DATA.summary}
        </p>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Educação</h2>
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
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Habilidades</h2>
          <div className="flex flex-wrap gap-3">
            {DATA.skills.map((skill) => (
              <div
                key={skill.label}
                className="flex items-center gap-1 rounded-md border border-neutral-300 px-4 py-2 shadow-sm dark:border-neutral-900"
              >
                <Image
                  src={skill.icon}
                  alt={skill.label}
                  width={20}
                  height={20}
                  className="dark:invert"
                />
                <h3 className="font-medium">{skill.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="w-full space-y-12 py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                Meus Projetos
              </div>
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
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA.projects.map((project) => (
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
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <div className="space-y-5">
            <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
              Contato
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Entre em contato
            </h2>
            <div>
              <Link href={DATA.contact.social.LinkedIn.url} target="_blank">
                <Button variant="link" className="text-base">
                  <FaLinkedin className="size-5" />
                  LinkedIn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
