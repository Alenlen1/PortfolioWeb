import {
  About,
  Contact,
  Hero,
  Navigation,
  Projects,
  ScrollReveal,
} from "@/components/portfolio";
import { TechStack } from "@/components/enhancements";
import { ContributionSection } from "@/components/contribution-section";

export const revalidate = 3600;

export default function Home() {
  const activityEndDate = new Date().toISOString().slice(0, 10);
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <ContributionSection endDate={activityEndDate} />
      </main>
      <Contact />
      <ScrollReveal />
    </>
  );
}
