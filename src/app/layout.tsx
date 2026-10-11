import type { Metadata } from "next";
import "./globals.css";
import "./enhancements.css";
import "./project-screenshots.css";
import "./theme.css";
import "./contribution-skyline.css";
import "./section-layout.css";
import "./responsive.css";

const themeScript = `(function(){var t;try{t=localStorage.getItem("portfolio-theme")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t})()`;

export const metadata: Metadata = {
  title: "Alen Amarante | Full Stack & AI Web Developer",
  description:
    "Alen Amarante's portfolio of custom full-stack web apps and responsive digital tools. Powered by AI, crafted for performance.",
  icons: { icon: { url: "/icon.svg", type: "image/svg+xml" } },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Grammarly can inject attributes on body before React hydrates.
  // Limit suppression to this element so child mismatches remain visible.
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
