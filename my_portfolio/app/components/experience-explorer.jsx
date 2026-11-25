"use client";

import Link from "next/link";
import { useState } from "react";
import { education, experience, leadership, skills } from "@/lib/portfolio";

export default function ExperienceExplorer() {
  const [view, setView] = useState("Industry");
  const roles = view === "Industry" ? experience : leadership;
  return (
    <div className="experience-explorer">
      <div className="experience-main">
        <fieldset className="filter-row">
          <legend className="sr-only">Choose experience type</legend>
          {["Industry", "Leadership & projects"].map((item) => (
            <button
              className="filter-chip"
              type="button"
              key={item}
              aria-pressed={view === item}
              onClick={() => setView(item)}
            >
              {item}
            </button>
          ))}
        </fieldset>
        <p className="results-line" role="status">
          {roles.length} {view === "Industry" ? "industry roles" : "leadership and project roles"}.
          Open a role to read more.
        </p>
        <div className="role-list" key={view}>
          {roles.map((role) => (
            <details className="role-card" key={role.company} open={role.current || undefined}>
              <summary>
                <span className="role-period">{role.period}</span>
                <span>
                  <span className="role-title">{role.role}</span>
                  <span className="role-company">{role.company}</span>
                </span>
                <span className="role-expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="role-description">
                <p>
                  {role.location}
                  {role.current ? " · Current role" : ""}
                </p>
                <ul>
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
        <section className="skills-panel">
          <p className="page-kicker">Technical capabilities</p>
          <h2>The tools behind the work.</h2>
          {skills.map((skill) => (
            <details className="skill-disclosure" key={skill.title}>
              <summary>{skill.title}</summary>
              <p>{skill.text}</p>
            </details>
          ))}
        </section>
      </div>
      <aside className="experience-sidebar">
        <div className="education-panel">
          <p className="page-kicker">Education</p>
          <h2>{education.degree}</h2>
          <p>{education.institution}</p>
          <p>{education.school}</p>
          <p>{education.specialization}</p>
          <span className="education-pill">
            {education.year} · {education.location}
          </span>
        </div>
        <div className="resume-panel">
          <h2>The full picture.</h2>
          <p>Download my résumé for a concise overview of my background.</p>
          <a className="page-button primary" href="/UmarKhanResume.pdf" download>
            Download résumé
          </a>
          <Link className="case-link" href="/projects">
            See the projects
          </Link>
        </div>
      </aside>
    </div>
  );
}
