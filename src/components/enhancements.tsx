"use client";

import { useState } from "react";
import { projects, toolkitGroups } from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio";
import { ToolkitIcon } from "@/components/toolkit-icon";

export function TechStack() {
  return (
    <section
      id="techstack"
      className="tech-stack-section dark-section"
      aria-labelledby="techstack-heading"
    >
      <span className="section-watermark" aria-hidden="true">
        TECH STACK
      </span>
      <div className="section-heading">
        <div>
          <span className="eyebrow">What I build with</span>
          <h2 id="techstack-heading">Tech stack & tools</h2>
        </div>
      </div>
      <div className="tech-stack-grid">
        {toolkitGroups.map(({ title, items }) => (
          <article className="tech-stack-card" key={title}>
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item.name} title={item.detail}>
                  <span className={`toolkit-icon icon-${item.icon}`}>
                    <ToolkitIcon name={item.icon} />
                  </span>
                  <span className="toolkit-item-copy">{item.name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectArchive() {
  const [filter, setFilter] = useState("All work");
  const filters = [
    "All work",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filtered = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <>
      <div className="archive-toolbar">
        <div className="archive-filters" aria-label="Filter projects">
          {filters.map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={filter === label ? "active" : ""}
              aria-pressed={filter === label}
            >
              {label}
              {label === "All work" && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <span className="eyebrow" role="status">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <div className="project-list archive-list" key={filter}>
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
          />
        ))}
      </div>
    </>
  );
}
