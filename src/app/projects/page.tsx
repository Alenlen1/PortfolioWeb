import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Contact, Navigation } from "@/components/portfolio";
import { ProjectArchive } from "@/components/enhancements";

export const metadata = { title: "Projects — Alen" };
export default function ProjectsPage() {
  return <><Navigation inner /><main id="home" className="inner-page"><Link href="/" className="text-link"><ArrowLeft size={16}/> Back home</Link><div className="page-heading"><span className="eyebrow">The project archive</span><h1>Things I’ve <em>built.</em></h1><p>From evacuation navigation to career preparation and a personal tracking tool — a collection of projects you can explore on the web.</p></div><ProjectArchive /></main><Contact /></>;
}
