import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

import { DATA } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { BackgroundIconsEffect } from "@/components/background-icons-effect";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-10">
      <BackgroundIconsEffect />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
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
