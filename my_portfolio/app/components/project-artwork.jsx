export function Rosette() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="m50 4 9 12 14-3 3 14 13 6-5 14 10 11-12 9 1 15-15 1-8 13-13-7-13 7-8-13-15-1 1-15L6 58l10-11-5-14 13-6 3-14 14 3Z"
        fill="currentColor"
      />
      <circle cx="50" cy="49" r="26" stroke="var(--page)" />
      <path d="m50 28 4 16 17 5-17 4-4 17-4-17-17-4 17-5Z" fill="var(--page)" />
    </svg>
  );
}

export function ProjectArtwork({ variant }) {
  return (
    <div className={`artwork artwork-${variant}`} aria-hidden="true">
      {variant === "documents" ? (
        <>
          <div className="document-sheet document-sheet-back">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="document-sheet">
            <span className="document-mark">a.</span>
            <div className="document-line" />
            <div className="document-line" />
            <div className="document-line short" />
            <span className="document-stamp">✳</span>
          </div>
          <span className="artwork-flourish">
            a little order,
            <br />
            <em>a lot of possibility.</em>
          </span>
        </>
      ) : variant === "community" ? (
        <>
          <div className="community-arch">
            <span className="community-sun">✺</span>
            <span className="community-title">
              room
              <br />
              for <em>good.</em>
            </span>
            <div className="community-hills" />
          </div>
          <div className="community-flower">✳</div>
        </>
      ) : (
        <>
          <div className="dashboard-window">
            <div className="dashboard-top">
              <span />
              <span />
              <span />
            </div>
            <div className="dashboard-body">
              <span className="dashboard-avatar">uk</span>
              <div className="dashboard-lines">
                <i />
                <i />
              </div>
              <div className="dashboard-chart">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="dashboard-rows">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <span className="dashboard-seal">
            people,
            <br />
            <em>connected.</em>
          </span>
        </>
      )}
    </div>
  );
}
