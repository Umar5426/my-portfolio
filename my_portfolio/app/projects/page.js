import PageShell from "../components/page-shell";
import ProjectExplorer from "../components/project-explorer";

export const metadata = {
  title: "Projects | Umar Khan",
  description: "Explore software, systems, community and academic projects by Umar Khan.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageShell label="Projects">
      <header className="page-heading">
        <p className="page-kicker">Selected work</p>
        <h1>
          Different challenges.
          <br />
          <span>Practical solutions.</span>
        </h1>
        <p>
          Business software, community applications and academic experiments. Explore the work, the
          thinking behind it and the tools that bring it together.
        </p>
      </header>
      <ProjectExplorer />
      <aside className="page-callout">
        <div>
          <p className="page-kicker">A shared starting point</p>
          <h2>Have a problem worth solving?</h2>
          <p>Let’s talk about the people, systems and requirements behind it.</p>
        </div>
        <a className="page-button primary" href="/contact">
          Start a conversation
        </a>
      </aside>
    </PageShell>
  );
}
