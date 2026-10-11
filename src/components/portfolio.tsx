"use client";

import Link from "next/link";
import { DeveloperIllustration } from "@/components/developer-illustration";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Facebook, Github, Instagram, Mail, Maximize2, X } from "lucide-react";
import { emailComposeUrl, profile, projects } from "@/data/portfolio";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { ProjectStack } from "@/components/project-stack";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfilePortrait } from "@/components/profile-portrait";
import { HeroGrid } from "@/components/hero-grid";

export function Navigation({ inner = false }: { inner?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      setScrolled(window.scrollY > 40);
      if (!inner) {
        const sections = ["home", "about", "techstack", "projects", "contact"];
        const current = sections.filter(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * .4).at(-1);
        if (current) setActive(current);
      }
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [inner]);
  const section = (id: string) => inner ? `/#${id}` : `#${id}`;
  return <>
    <div ref={progress} className="reading-progress" aria-hidden="true" />
    <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
      <Link href={section("home")} className="brand" aria-label="Alen portfolio home"><span className="brand-mark">a</span><span className="brand-label">{profile.fullName}</span></Link>
      {!inner && <nav className="desktop-navigation" aria-label="Section navigation">{["About", "Tech Stack", "Projects"].map(label => { const id = label.toLowerCase().replaceAll(" ", ""); return <a key={label} href={section(id)} aria-current={active === id ? "location" : undefined}>{label}</a>; })}<a href="#contact" className="nav-contact">Let’s talk <ArrowUpRight size={12}/></a></nav>}
      <ThemeToggle/>
    </header>
  </>;
}

export function SocialLinks({ icons = false }: { icons?: boolean }) {
  const iconSet = [Github, Facebook, Instagram];
  return <div className={icons ? "social-icons" : "social-links"}>
    {profile.socials.map((social, i) => { const Icon = iconSet[i]; return <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} profile`}>{icons ? <Icon size={19} strokeWidth={1.7} /> : social.label}</a>; })}
    {icons && <a href={emailComposeUrl} target="_blank" rel="noopener noreferrer" aria-label={`Send an email to ${profile.fullName}`} title={`Email ${profile.email}`}><Mail size={20} strokeWidth={1.7} /></a>}
  </div>;
}

function TypedRole() {
  const [text, setText] = useState(profile.roles[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let role = 0, position = profile.roles[0].length, deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const value = profile.roles[role];
      position += deleting ? -1 : 1;
      setText(value.slice(0, position));
      let delay = deleting ? 35 : 70;
      if (position === 0) { deleting = false; role = (role + 1) % profile.roles.length; delay = 350; }
      if (!deleting && position === profile.roles[role].length) { deleting = true; delay = 3000; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 3500);
    return () => clearTimeout(timer);
  }, []);
  return <p className="typed-role" aria-label={profile.roles[0]}><span aria-hidden="true">{text}<span className="type-cursor" /></span></p>;
}

const greetings = [
  { text: "Hola", lang: "es" },
  { text: "Bonjour", lang: "fr" },
  { text: "Ciao", lang: "it" },
  { text: "Hallo", lang: "de" },
  { text: "Olá", lang: "pt" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕하세요", lang: "ko" },
  { text: "你好", lang: "zh" },
  { text: "नमस्ते", lang: "hi" },
  { text: "Kumusta", lang: "fil" },
];

function RotatingGreeting() {
  const [greeting, setGreeting] = useState({ index: 0, text: greetings[0].text });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0, position = Array.from(greetings[0].text).length, deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      position += deleting ? -1 : 1;
      setGreeting({ index, text: Array.from(greetings[index].text).slice(0, position).join("") });
      let delay = deleting ? 90 : 150;
      if (position === 0) { deleting = false; index = (index + 1) % greetings.length; delay = 650; }
      if (!deleting && position === Array.from(greetings[index].text).length) { deleting = true; delay = 5000; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 5000);
    return () => clearTimeout(timer);
  }, []);
  return <span className="hero-greeting" aria-hidden="true" lang={greetings[greeting.index].lang}>{greeting.text}</span>;
}

function AnimatedHeroHeading() {
  const container = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const name = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const box = container.current, title = heading.current, label = name.current;
    if (!box || !title || !label) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let previous = { x: label.offsetLeft, y: label.offsetTop };
    let animation: Animation | undefined;
    const sync = () => {
      box.style.height = `${title.getBoundingClientRect().height}px`;
      const next = { x: label.offsetLeft, y: label.offsetTop };
      if (next.x !== previous.x || next.y !== previous.y) {
        const transform = getComputedStyle(label).transform;
        const matrix = transform === "none" ? null : new DOMMatrixReadOnly(transform);
        const x = previous.x - next.x + (matrix?.m41 ?? 0);
        const y = previous.y - next.y + (matrix?.m42 ?? 0);
        animation?.cancel();
        if (!motion.matches) animation = label.animate(
          [{ transform: `translate(${x}px, ${y}px)` }, { transform: "translate(0, 0)" }],
          { duration: 420, easing: "cubic-bezier(.22, 1, .36, 1)" },
        );
      }
      previous = next;
    };
    sync();
    const changes = new MutationObserver(sync);
    changes.observe(title, { childList: true, characterData: true, subtree: true });
    const size = new ResizeObserver(sync);
    size.observe(title);
    return () => { changes.disconnect(); size.disconnect(); animation?.cancel(); };
  }, []);
  return <div className="hero-heading" ref={container}><h1 ref={heading} aria-label={`Hi, I am ${profile.name}.`}><RotatingGreeting /><span ref={name} className="hero-name-line" aria-hidden="true">, I’m <em>{profile.name}.</em></span></h1></div>;
}

export function Hero() {
  const portrait = useRef<HTMLDivElement>(null);
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(y - .5) * -7}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - .5) * 7}deg`);
    event.currentTarget.style.setProperty("--shine-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--shine-y", `${y * 100}%`);
  };
  const reset = () => { portrait.current?.style.setProperty("--tilt-x", "0deg"); portrait.current?.style.setProperty("--tilt-y", "0deg"); };
  return <section id="home" className="hero">
    <HeroGrid />
    <div className="hero-intro"><div className="availability"><span className="status-dot"/> Open to new opportunities</div><SocialLinks icons /><p className="location">{profile.location}</p><AnimatedHeroHeading /><TypedRole /><p className="hero-description"><strong>Building smarter. Designing better.</strong><br/>Digital experiences powered by AI, built for performance.</p><div className="hero-actions"><a href="#projects" className="pill-button">Explore my work <ArrowDown size={14}/></a><Link href="/resume" className="hero-resume-link">Resume <ArrowUpRight size={14} /></Link></div><div className="hero-note"><span>01 — An introduction</span><span>Crafted with intention <span aria-hidden="true">✦</span></span></div></div>
    <div ref={portrait} className="portrait-card" onPointerMove={tilt} onPointerLeave={reset}>
      <div className="portrait-code-label" aria-hidden="true"><span>const developer = &#123;</span><span>&nbsp; curiosity: <b>∞</b>,</span><span>&nbsp; always: <b className="portrait-mood-light">"yearning"</b><b className="portrait-mood-dark">"begging"</b></span><span>&#125;;</span></div>
      <ProfilePortrait/>
      <div className="portrait-top"><span className="eyebrow">Full Stack / AI Web Developer</span><span className="portrait-star" aria-hidden="true">✦</span></div>
    </div>
    <a href="#about" className="scroll-cue"><span className="mouse"><span /></span><span>Scroll down</span><ArrowDown size={12} /></a>
  </section>;
}

export function About() {
  return <section className="about dark-section" id="about">
    <div className="about-layout">
      <div className="about-copy">
        <span className="eyebrow">A little about me</span>
        <h2><strong>Building web apps at speed. Powered by AI, crafted for performance.</strong></h2>
        <p>Independent developer building custom full-stack solutions and responsive digital tools. Focused on turning ideas into clean, functional code.</p>
      </div>
      <DeveloperIllustration />
    </div>
    <div className="about-foot"><a href="#techstack">Explore my toolkit <ArrowDown size={14} /></a></div>
  </section>;
}

export function Highlights({ items }: { items: string[] }) {
  return <div className="highlights"><span className="eyebrow">Highlights</span><ol>{items.map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ol></div>;
}

export function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return <article className={`project-card ${index % 2 ? "reversed" : ""}`}><ProjectGallery project={project} index={index}/><div className="project-copy"><span className="project-number" aria-hidden="true">0{index + 1}</span><span className="eyebrow">{project.category} / {project.status}</span><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3><p>{project.description}</p><Highlights items={project.highlights}/><ProjectStack items={project.stack}/><div className="project-links"><a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={17}/></a><Link className="text-link project-details-link" href={`/projects/${project.slug}`}>Project details <ArrowRight size={16}/></Link></div></div></article>;
}

export function ProjectGallery({ project, index = 0 }: { project: typeof projects[number]; index?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);
  const close = () => { dialog.current?.close(); setExpanded(false); };
  return <div className="project-media"><div className="gallery-stage"><ProjectScreenshot project={project}/><button className="preview-expand" aria-label={`Expand ${project.name} screenshot`} onClick={() => { dialog.current?.showModal(); setExpanded(true); }}><Maximize2 size={16}/><span>Take a closer look</span></button></div><div className="project-caption"><span className="eyebrow">0{index + 1} / Website screenshot</span></div><dialog ref={dialog} className="preview-dialog" aria-label={`${project.name} website screenshot`} onClose={() => setExpanded(false)} onCancel={() => setExpanded(false)} onClick={event => { if (event.target === dialog.current) close(); }}><div className="dialog-heading"><div><span className="eyebrow">Website screenshot</span><h3>{project.name}</h3></div><button aria-label="Close screenshot" onClick={close}><X size={22}/></button></div>{expanded && <ProjectScreenshot project={project} expanded/>}<div className="screenshot-dialog-footer"><span className="eyebrow">Captured from the live website</span><a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={15}/></a></div></dialog></div>;
}

export function Projects() {
  return <section className="projects-section" id="projects"><span className="section-watermark" aria-hidden="true">PROJECTS</span><div className="section-heading"><div><span className="eyebrow">Portfolio showcase</span><h2>Selected projects</h2></div><Link href="/projects" className="text-link">View all projects <ArrowRight size={16}/></Link></div><div className="project-list">{projects.map((project,index) => <ProjectCard key={project.slug} project={project} index={index}/>)}</div></section>;
}

export function Contributions() {
  // Deterministic sample data, not connected to a real GitHub account.
  return <section className="contributions"><div className="section-heading"><div><span className="eyebrow">Coding activity / Demo data</span><h2>GitHub contributions</h2></div><Github size={25} strokeWidth={1.3}/></div><div className="contribution-card"><div className="contribution-summary"><div><span className="eyebrow">An example of a year in code</span><h3>Little by little,<br/><em>a lot gets built.</em></h3></div><div className="contribution-stats"><span><strong>824</strong>Sample contributions</span><span><strong>18 days</strong>Sample longest streak</span><span><strong>64%</strong>Sample active days</span></div></div><div className="heatmap-scroll"><div className="heatmap-months">{["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map(month => <span key={month}>{month}</span>)}</div><div className="heatmap" aria-label="Illustrative contribution heatmap">{Array.from({length: 364}, (_,i) => { const seed = (i * 37 + Math.floor(i / 7) * 17) % 19; return <span key={i} className={`level-${seed < 7 ? 0 : seed < 11 ? 1 : seed < 14 ? 2 : seed < 17 ? 3 : 4}`} />; })}</div></div><div className="heatmap-footer"><span>Placeholder activity · Connect your GitHub to make it yours.</span><div>Less {[0,1,2,3,4].map(i => <span key={i} className={`level-${i}`}/>)} More</div></div></div></section>;
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); timer.current = setTimeout(() => setCopied(false), 2200); } catch { window.location.href = emailComposeUrl; } };
  return <footer className="contact dark-section" id="contact"><span className="section-watermark" aria-hidden="true">CONTACT</span><span className="eyebrow">Have something in mind? / Get in touch</span><div className="contact-center"><h2>Have an idea?<br/><em>Let’s build it.</em><span className="contact-star" aria-hidden="true">✦</span></h2><div className="contact-email"><a href={emailComposeUrl} target="_blank" rel="noopener noreferrer">{profile.email}<ArrowUpRight size={24}/></a><button onClick={copy} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={18}/> : <Copy size={18}/>}</button><span className="copy-feedback" role="status">{copied ? "Copied!" : ""}</span></div><div className="contact-socials"><Link href="/resume">Resume</Link><SocialLinks /></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {profile.name}. Built with codex.</p><a href="#home">Back to top <ArrowUpRight size={13}/></a></div></footer>;
}

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), {threshold: .08});
    const elements = document.querySelectorAll(".project-card, .about h2, .tech-stack-card");
    elements.forEach(el => { el.classList.add("reveal-ready"); observer.observe(el); });
    return () => { observer.disconnect(); elements.forEach(el => el.classList.remove("reveal-ready")); };
  }, []);
  return null;
}
