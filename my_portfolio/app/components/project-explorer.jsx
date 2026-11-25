"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { caseStudies } from "@/lib/case-studies";
import { CapabilityIcon } from "./project-artwork";

const categories = ["All", "Systems", "Software", "Community", "Research"];
const storageKey = "portfolio-saved-projects";

export default function ProjectExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(stored))
        setSaved(stored.filter((slug) => caseStudies.some((project) => project.slug === slug)));
    } catch {
      /* Browsing still works when storage is unavailable. */
    }
  }, []);

  function toggleSaved(project) {
    const next = saved.includes(project.slug)
      ? saved.filter((slug) => slug !== project.slug)
      : [...saved, project.slug];
    setSaved(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotice(
        `${project.name} ${next.includes(project.slug) ? "saved" : "removed from saved projects"}.`,
      );
    } catch {
      setNotice(
        "Your selection is available for this visit. This browser could not save it for later.",
      );
    }
  }

  function reset() {
    setQuery("");
    setCategory("All");
    setSavedOnly(false);
  }
  const search = query.trim().toLowerCase();
  const visible = caseStudies.filter(
    (project) =>
      (category === "All" || project.category === category) &&
      (!savedOnly || saved.includes(project.slug)) &&
      `${project.name} ${project.summary} ${project.organization} ${project.technologies.join(" ")}`
        .toLowerCase()
        .includes(search),
  );

  return (
    <section aria-label="Project explorer">
      <div className="explorer-toolbar">
        <div className="search-field">
          <label htmlFor="project-search">Find a project</label>
          <input
            id="project-search"
            type="search"
            placeholder="Search projects, tools or organizations"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button
          className="page-button saved-filter"
          type="button"
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly(!savedOnly)}
        >
          Saved projects <span>{saved.length}</span>
        </button>
      </div>
      <fieldset className="filter-row">
        <legend className="sr-only">Filter projects by category</legend>
        {categories.map((item) => (
          <button
            key={item}
            className="filter-chip"
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </fieldset>
      <div className="results-line">
        <p role="status">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
          {savedOnly ? " in your saved list" : " to explore"}
        </p>
        {(query || category !== "All" || savedOnly) && (
          <button type="button" className="plain-button" onClick={reset}>
            Clear filters
          </button>
        )}
      </div>
      <p className="sr-only" role="status">
        {notice}
      </p>
      <div className="case-grid">
        {visible.map((project) => (
          <article
            className={`case-card category-${project.category.toLowerCase()}`}
            key={project.slug}
          >
            <div className="case-art">
              <div className="case-art-top">
                <CapabilityIcon variant={project.icon} />
                <span>{project.type}</span>
              </div>
              <ol className="mini-flow">
                {project.flow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <span className="art-caption">Project overview</span>
            </div>
            <div className="case-body">
              <div className="case-meta">
                <span>{project.category}</span>
                <span>{project.period}</span>
              </div>
              <h2>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </h2>
              <p className="case-org">{project.organization}</p>
              <p>{project.summary}</p>
              <ul className="tech-tags" aria-label="Technologies and focus">
                {project.technologies.slice(0, 3).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="case-actions">
                <Link className="case-link" href={`/projects/${project.slug}`}>
                  Explore project<span className="sr-only">: {project.name}</span>
                </Link>
                <button
                  type="button"
                  className="save-button"
                  aria-pressed={saved.includes(project.slug)}
                  aria-label={`${saved.includes(project.slug) ? "Unsave" : "Save"} ${project.name}`}
                  onClick={() => toggleSaved(project)}
                >
                  {saved.includes(project.slug) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <h2>No projects found</h2>
          <p>Try a different search or category, or clear your filters to see all projects.</p>
          <button type="button" className="page-button primary" onClick={reset}>
            Show all projects
          </button>
        </div>
      )}
    </section>
  );
}
