import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import PageShell from "../../components/page-shell";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  return {
    title: `${project?.name || "Project"} | Umar Khan`,
    description: project?.summary,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) notFound();
  const related = caseStudies.filter((item) => item.slug !== slug).slice(0, 2);
  return (
    <PageShell label={project.name}>
      <Link className="case-link" href="/projects">
        All projects
      </Link>
      <header className="page-heading case-heading">
        <p className="page-kicker">
          {project.category} / {project.organization}
        </p>
        <h1>{project.name}</h1>
        <p>{project.summary}</p>
      </header>
      <dl className="project-facts">
        <div>
          <dt>Role / focus</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Period</dt>
          <dd>{project.period}</dd>
        </div>
        <div>
          <dt>Area</dt>
          <dd>{project.type}</dd>
        </div>
      </dl>
      <div className="case-detail-grid">
        <section className="case-narrative">
          <h2>The context</h2>
          <p>{project.context}</p>
          <h2>The work</h2>
          <p>{project.contribution}</p>
          <h2>The approach</h2>
          <ol className="focus-list">
            {project.focus.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </section>
        <aside className="project-sidebar">
          <h2>Tools & focus</h2>
          <ul className="tech-tags">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <h2>Explore the workflow</h2>
          <p>Open each stage for a closer look.</p>
          {project.flow.map((step, index) => (
            <details className="workflow-step" key={step}>
              <summary>{step}</summary>
              <p>{project.focus[index]}</p>
            </details>
          ))}
          {project.link && (
            <a
              className="page-button"
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.link.label}
            </a>
          )}
        </aside>
      </div>
      <section className="reflection">
        <p className="page-kicker">What matters</p>
        <h2>A note on the work.</h2>
        <p>{project.reflection}</p>
      </section>
      <section className="related-projects">
        <h2>Keep exploring</h2>
        <div>
          {related.map((item) => (
            <Link href={`/projects/${item.slug}`} key={item.slug}>
              <span className="page-kicker">{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
