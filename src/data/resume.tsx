import { HomeIcon } from "lucide-react";
import { FaGithub, FaLinkedin, FaRegEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const DATA = {
  name: "Kayque Goldner",
  initials: "KG",
  url: "https://google.com", // TODO: change to portfolio URL
  location: "Espírito Santo, BR",
  description: "Desenvolvedor Web.",
  summary:
    "Desenvolvedor Web dedicado a criar aplicações acessíveis, altamente otimizadas e escaláveis, focando na experiência do usuário e nas melhores práticas de desenvolvimento.",
  avatarUrl: "/me.jpg",
  skills: [
    { icon: "/icons/react-original.svg", label: "React" },
    { icon: "/icons/nextjs-plain.svg", label: "Next.js" },
    { icon: "/icons/typescript-plain.svg", label: "TypeScript" },
    { icon: "/icons/javascript-plain.svg", label: "JavaScript" },
    { icon: "/icons/html5-plain.svg", label: "HTML" },
    { icon: "/icons/css3-plain.svg", label: "CSS" },
    { icon: "/icons/tailwindcss-original.svg", label: "TailwindCSS" },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/KayqueGoldner",
        icon: FaGithub,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kayque-goldner/",
        icon: FaLinkedin,

        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:example@mail.com",
        icon: MdEmail,

        navbar: false,
      },
    },
  },
  education: [
    {
      school: "Danki Code",
      href: "https://cursos.dankicode.com/",
      degree: "Front End",
      logoUrl: "/logos/danki-code-logo.svg",
    },
    {
      school: "FreeCodeCamp",
      href: "https://www.freecodecamp.org/",
      degree: "Full Stack",
      logoUrl: "/logos/free-code-camp-logo.jpg",
    },
    {
      school: "Code With Antonio",
      href: "https://www.codewithantonio.com/",
      degree: "Full Stack",
      logoUrl: "/logos/code-with-antonio-logo.webp",
    },
  ],
  projects: [
    {
      title: "Tvflix",
      href: "https://tvflix-kayquegoldner.vercel.app/",
      dates: "2024",
      active: true,
      description: "Aplicativo de filmes",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://tvflix-kayquegoldner.vercel.app/",
          icon: <FaRegEye className="size-4" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/KayqueGoldner/tvflix",
          icon: <FaGithub className="size-4" />,
        },
      ],
      image: "/projects/tvflix.png",
      video: "",
    },
    {
      title: "Weatherio",
      href: "https://weatherio-kayquegoldner.vercel.app/",
      dates: "2023",
      active: true,
      description: "Aplicativo de clima",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://weatherio-kayquegoldner.vercel.app/",
          icon: <FaRegEye className="size-4" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/KayqueGoldner/weatherio",
          icon: <FaGithub className="size-4" />,
        },
      ],
      image: "/projects/weatherio.png",
      video: "",
    },
    {
      title: "Pixstock",
      href: "https://pixstock-projeto.netlify.app/",
      dates: "2023",
      active: true,
      description: "Aplicativo de imagens e vídeos",
      technologies: ["React", "JavaScript", "CSS"],
      links: [
        {
          type: "Website",
          href: "https://pixstock-projeto.netlify.app/",
          icon: <FaRegEye className="size-4" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/KayqueGoldner/pixstock",
          icon: <FaGithub className="size-4" />,
        },
      ],
      image: "/projects/pixstock.png",
      video: "",
    },
    {
      title: "Jira Clone",
      href: "https://jira-clone-nextjs-navy.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "Um aplicativo Jira Clone totalmente funcional criado com Next.js e TypeScript, projetado para otimizar o gerenciamento de projetos e a colaboração em equipe.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Shadcn UI",
        "Hono",
        "Appwrite",
      ],
      links: [
        {
          type: "Website",
          href: "https://jira-clone-nextjs-navy.vercel.app/",
          icon: <FaRegEye className="size-4" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/KayqueGoldner/jira-clone-nextjs",
          icon: <FaGithub className="size-4" />,
        },
      ],
      image: "/projects/jira-clone.png",
      video: "",
    },
    {
      title: "Serviço De Notificações",
      href: "https://notification-service-nextjs.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "SaaS Next.js moderno para notificações de eventos em tempo real",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Shadcn UI",
        "Hono",
        "Prisma",
        "TanStack Query",
        "Stripe",
        "Clerk",
      ],
      links: [
        {
          type: "Website",
          href: "https://notification-service-nextjs.vercel.app/",
          icon: <FaRegEye className="size-4" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/KayqueGoldner/notification-service-nextjs",
          icon: <FaGithub className="size-4" />,
        },
      ],
      image: "/projects/notification-service.png",
      video: "",
    },
    {
      title: "Editor De Vídeo Landing Page",
      href: "https://xora-ai-video-editor-project.netlify.app/",
      dates: "2025",
      active: true,
      description:
        "Uma landing page projetada para mostrar o projeto AI Video Editor, com foco na simplicidade e eficiência",
      technologies: ["React", "JavaScript", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://xora-ai-video-editor-project.netlify.app/",
          icon: <FaRegEye className="size-4" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/KayqueGoldner/xora-ai-video-editor-landing-page",
          icon: <FaGithub className="size-4" />,
        },
      ],
      image: "/projects/xora-ai-video-editor.png",
      video: "",
    },
  ],
} as const;
