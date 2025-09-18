import "@/app/globals.css";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import dynamic from "next/dynamic";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

// const CustomCursor = dynamic(() =>
//   import("@/components/custom-cursor").then((mod) => mod.CustomCursor),
// );

const font = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${DATA.name} - Portfólio`,
  url: DATA.url,
  description: DATA.description,
  author: {
    "@type": "Person",
    name: DATA.name,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} - Portfólio`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name} - Portfólio`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen overflow-y-scroll font-sans antialiased",
          font.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            {children}
            {/* <CustomCursor /> */}
          </TooltipProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
