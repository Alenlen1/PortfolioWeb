import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Contact, Highlights, Navigation, ProjectGallery } from "@/components/portfolio";
import { projects } from "@/data/portfolio";
import { ProjectStack } from "@/components/project-stack";

export function generateStaticParams() { return projects.map(project => ({slug: project.slug})); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return {title: `${project?.name ?? "Project"} — Alen`};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(project => project.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return <><Navigation inner/><main id="home" className="inner-page project-detail"><Link href="/projects" className="text-link"><ArrowLeft size={16}/> All projects</Link><div className="page-heading"><span className="eyebrow">Project 0{index + 1} / {project.category}</span><h1>{project.name}</h1><p>{project.description}</p><ProjectStack items={project.stack}/><a href={project.url} className="pill-button" target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={15}/></a></div><div className="project-facts"><div><span className="eyebrow">Project type</span><p>{project.category}</p></div><div><span className="eyebrow">Status</span><p>{project.status}</p></div><div><span className="eyebrow">Hosting</span><ProjectStack items={project.stack.filter(tech => tech === "Vercel" || tech === "Render")}/></div><div><span className="eyebrow">Technology</span><ProjectStack items={[project.stack[0]]}/></div></div><ProjectGallery project={project} index={index}/><div className="project-overview"><div><span className="eyebrow">Project overview</span><h2>{project.name === "Cashout Tracker" ? <>A personal tool.<br/>A practical purpose.</> : <>An idea brought<br/>to the web.</>}</h2></div><div><p>{project.description}</p><Highlights items={project.highlights}/><a href={project.url} className="text-link" target="_blank" rel="noopener noreferrer">Explore {project.name} <ArrowUpRight size={17}/></a></div></div><Link href={`/projects/${next.slug}`} className="next-project"><span className="eyebrow">Next project</span><span>{next.name}<ArrowRight size={28}/></span></Link></main><Contact/></>;
}
