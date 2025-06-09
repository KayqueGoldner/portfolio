import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";

export const Contact = () => {
  return (
    <section id="contact">
      <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Entre em contato
          </h2>
          <div>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              data-particles
            >
              <Button variant="link" className="text-base">
                <FaLinkedin className="size-5" />
                LinkedIn
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
