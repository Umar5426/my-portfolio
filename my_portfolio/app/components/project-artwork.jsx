export function CapabilityIcon({ variant }) {
  return (
    <svg
      className="capability-icon"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {variant === "systems" ? (
        <>
          <rect x="3" y="3" width="9" height="9" rx="2" />
          <rect x="20" y="20" width="9" height="9" rx="2" />
          <path d="M12 7h9a4 4 0 0 1 4 4v9M7 12v9a4 4 0 0 0 4 4h9" />
        </>
      ) : variant === "software" ? (
        <>
          <rect x="3" y="5" width="26" height="22" rx="3" />
          <path d="M3 11h26m-18 5-4 3 4 3m10-6 4 3-4 3m-3-7-4 10" />
        </>
      ) : (
        <>
          <path d="M5 7h22M5 16h22M5 25h22" />
          <circle cx="12" cy="7" r="3" fill="var(--card)" />
          <circle cx="22" cy="16" r="3" fill="var(--card)" />
          <circle cx="10" cy="25" r="3" fill="var(--card)" />
        </>
      )}
    </svg>
  );
}

export function SystemsVisual() {
  return (
    <div className="systems-visual" aria-hidden="true">
      <svg viewBox="0 0 420 70" fill="none" aria-hidden="true">
        <path d="M60 35h300" className="system-line" />
        <path d="M60 35h300" className="system-flow" />
        <circle cx="60" cy="35" r="8" />
        <circle cx="210" cy="35" r="8" />
        <circle cx="360" cy="35" r="8" />
      </svg>
      <div className="system-labels">
        <span>Systems</span>
        <span>Software</span>
        <span>People</span>
      </div>
    </div>
  );
}

const workflows = {
  documents: {
    label: "DOCUMENT INTELLIGENCE",
    steps: ["Source documents", "Approved templates", "Standardized output"],
    note: "Software architecture · Automated ML pipeline",
  },
  community: {
    label: "COMMUNITY APPLICATION",
    steps: ["User needs", "Web application", "Public APIs"],
    note: "Design · React development · Integration",
  },
  dashboard: {
    label: "EMPLOYEE MANAGEMENT",
    steps: ["Web & mobile", "Access control", "Employee data"],
    note: "Next.js · React Native · Role-based access",
  },
};

export function ProjectArtwork({ variant }) {
  const workflow = workflows[variant];
  return (
    <div className="project-diagram" aria-hidden="true">
      <span className="diagram-label">{workflow.label}</span>
      <div className="diagram-steps">
        {workflow.steps.map((step, index) => (
          <div className="diagram-step" key={step}>
            <span className="diagram-node">0{index + 1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
      <div className="diagram-bottom">
        <span>{workflow.note}</span>
        <span>ILLUSTRATIVE OVERVIEW</span>
      </div>
    </div>
  );
}
