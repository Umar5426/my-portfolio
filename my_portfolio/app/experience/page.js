import ExperienceExplorer from "../components/experience-explorer";
import PageShell from "../components/page-shell";

export const metadata = {
  title: "Experience | Umar Khan",
  description: "Industry experience, community leadership and technical skills.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <PageShell label="Experience">
      <header className="page-heading">
        <p className="page-kicker">Experience & capabilities</p>
        <h1>
          Connecting the work.
          <br />
          <span>And the people.</span>
        </h1>
        <p>
          My experience spans operational systems, software architecture, product engineering and
          community technology. Explore the roles and the capabilities behind them.
        </p>
      </header>
      <ExperienceExplorer />
    </PageShell>
  );
}
