import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/portfolio";
import { emailComposeUrl, profile, projects, toolkitGroups } from "@/data/portfolio";
import { PrintResume } from "@/components/print-resume";

export const metadata = { title: "Resume | Alen Amarante" };

export default function ResumePage() {
  const github = profile.socials.find(social => social.label === "GitHub");
  return <>
    <Navigation inner />
    <main className="inner-page resume-page">
      <div className="resume-toolbar">
        <Link className="text-link" href="/"><ArrowLeft size={16} /> Back home</Link>
        <PrintResume />
      </div>
      <article className="resume-paper">
        <span className="eyebrow">Resume</span>
        <h1>{profile.fullName}</h1>
        <p className="resume-role">{profile.roles.join(" / ")}</p>
        <p>{profile.location}<br /><a href={emailComposeUrl} target="_blank" rel="noopener noreferrer">{profile.email}</a></p>
        {github && <p><a href={github.href} target="_blank" rel="noopener noreferrer">github.com/Alenlen1</a></p>}
        <section>
          <h2>Profile</h2>
          <p><strong>Building web apps at speed. Powered by AI, crafted for performance.</strong></p>
          <p>Independent developer building custom full-stack solutions and responsive digital tools. Focused on turning ideas into clean, functional code.</p>
        </section>
        <section>
          <h2>Projects</h2>
          {projects.map(project => <div className="resume-experience" key={project.slug}>
            <div><h3>{project.name}</h3><span>{project.category}</span></div>
            <p>{project.description}</p>
            <ul className="resume-project-highlights">{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            <p className="resume-project-stack"><strong>Stack &amp; tools:</strong> {project.stack.join(", ")}</p>
            <a className="resume-project-url" href={project.url} target="_blank" rel="noopener noreferrer">{project.url.replace("https://", "").replace(/\/$/, "")}</a>
          </div>)}
        </section>
        <section>
          <h2>Tech stack &amp; tools</h2>
          {toolkitGroups.map(group => <p key={group.title}><strong>{group.title}:</strong> {group.items.map(item => item.name).join(", ")}</p>)}
        </section>
      </article>
    </main>
  </>;
}
