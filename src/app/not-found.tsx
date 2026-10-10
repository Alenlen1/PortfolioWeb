import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">404 / A little off the beaten path</span><h1>Nothing here.<br/><em>Plenty elsewhere.</em></h1><p>This page may have moved, or the link took a wrong turn. Let’s get you back to something good.</p><div><Link href="/" className="pill-button"><ArrowLeft size={15}/> Back home</Link><Link href="/projects" className="text-link">Explore the work <ArrowUpRight size={15}/></Link></div><span className="not-found-star" aria-hidden="true">✦</span></main>;
}
