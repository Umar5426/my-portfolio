import Image from "next/image";
import portrait from "@/assets/profile-img.png";
import { checker, education, experience, profile, projects, skills } from "@/lib/portfolio";
import { ArrowDown, ArrowUpRight } from "./components/icons";
import Motion from "./components/motion";
import Navigation from "./components/navigation";
import { CapabilityIcon, ProjectArtwork, SystemsVisual } from "./components/project-artwork";

const capabilities = [
  {
    icon: "systems",
    title: "Systems & automation",
    text: "Connecting business systems, reducing repetitive work and making operations easier to manage.",
    tools: "Python · API integrations · Reporting",
  },
  {
    icon: "software",
    title: "Software & architecture",
    text: "Building secure applications and scalable backends, from the first prototype to everyday use.",
    tools: "React · Next.js · Node.js · Data",
  },
  {
    icon: "delivery",
    title: "Technical leadership",
    text: "Turning requirements into clear plans and bringing designers, developers and stakeholders together.",
    tools: "Project delivery · Agile · Code review",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section id="home" className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> IT SYSTEMS MANAGER · CHECKER CABS
            </p>
            <h1 id="hero-title">
              Better systems.
              <br />
              <span>Greater impact.</span>
            </h1>
            <p className="hero-description">
              I&apos;m <strong>Umar Khan</strong>, a software engineer and IT Systems Manager in
              Calgary. I build applications, connect systems and turn complex requirements into
              practical solutions.
            </p>
            <div className="hero-links">
              <a className="button button-primary" href="#work">
                Explore my work <ArrowDown />
              </a>
              <a className="text-link" href="/UmarKhanResume.pdf" download>
                My résumé <ArrowUpRight />
              </a>
            </div>
            <div className="hero-proof">
              <strong>
                30<span>+</span>
              </strong>
              <p>
                <b>Hours saved every week</b>
                <span>Software automation at Checker Cabs</span>
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="portrait-frame">
              <div className="portrait-image">
                <Image
                  src={portrait}
                  alt="Umar Khan"
                  fill
                  priority
                  sizes="(max-width: 760px) 90vw, 36vw"
                  className="portrait"
                />
              </div>
              <figcaption>
                <div>
                  <strong>Umar Khan</strong>
                  <span>IT Systems Manager · The Checker Group</span>
                </div>
                <span className="portrait-location">Calgary, AB</span>
              </figcaption>
            </figure>
            <div className="hero-systems">
              <span className="small-label">A CONNECTED APPROACH</span>
              <SystemsVisual />
            </div>
          </div>
        </section>

        <section id="expertise" className="expertise-section" aria-labelledby="expertise-title">
          <div className="container">
            <div className="expertise-heading" data-reveal>
              <p className="eyebrow section-kicker">WHAT I BRING</p>
              <h2 id="expertise-title">
                Technical depth.
                <br className="mobile-break" /> A practical approach.
              </h2>
            </div>
            <div className="capability-grid">
              {capabilities.map((capability) => (
                <article className="capability" key={capability.title} data-reveal>
                  <CapabilityIcon variant={capability.icon} />
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                  <span>{capability.tools}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section container" aria-labelledby="work-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow section-kicker">01 / SELECTED WORK</p>
              <h2 id="work-title">
                Built to solve
                <br />
                <span>real problems.</span>
              </h2>
            </div>
            <p>
              Business applications, intelligent workflows and community projects. A selection of
              the systems I&apos;ve helped deliver.
            </p>
          </div>
          <article className="featured-project" id="e-vouchers" data-reveal>
            <div className="featured-copy">
              <p className="eyebrow">CHECKER CABS / BUSINESS SOFTWARE</p>
              <h3>e-vouchers</h3>
              <p className="project-subtitle">Created for Checker Cabs.</p>
              <p>
                I developed e-vouchers for Checker Cabs, alongside internal applications and
                integrations that support the business.
              </p>
              <p>
                For details about e-vouchers and how to get started, speak with Checker&apos;s sales
                team.
              </p>
              <a className="button button-light" href={`tel:${checker.salesPhone}`}>
                Talk to Checker Sales <ArrowUpRight />
              </a>
              <div className="sales-detail">
                <a href={`tel:${checker.salesPhone}`}>{checker.salesPhoneDisplay}</a>
                <a href={checker.contact} target="_blank" rel="noopener noreferrer">
                  Checker contact page <ArrowUpRight />
                </a>
              </div>
            </div>
            <div className="voucher-scene" aria-hidden="true">
              <div className="voucher-grid" />
              <span className="scene-index">CHECKER CABS</span>
              <div className="voucher-mark">
                <span className="checker-pattern" />
                <span>
                  e-vouchers
                  <span className="voucher-line" />
                </span>
              </div>
              <span className="scene-caption">BUSINESS SOFTWARE / PROJECT ILLUSTRATION</span>
            </div>
          </article>
          <div className="project-collection">
            {projects.map((project) => (
              <article
                className={`project project-${project.style}`}
                key={project.number}
                data-reveal
              >
                <div className={`project-art project-art-${project.style}`}>
                  <ProjectArtwork variant={project.style} />
                </div>
                <div className="project-copy">
                  <p className="eyebrow">
                    {project.number} / {project.category}
                  </p>
                  <h3>{project.name}</h3>
                  <p className="project-organization">
                    {project.organization} <span>{project.period}</span>
                  </p>
                  <p>{project.description}</p>
                  <ul className="tags" aria-label="Project focus">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <a
            className="all-projects text-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            More projects on GitHub <ArrowUpRight />
          </a>
        </section>

        <section id="experience" className="experience-section" aria-labelledby="experience-title">
          <div className="section container">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow section-kicker">02 / EXPERIENCE</p>
                <h2 id="experience-title">
                  Engineering, product
                  <br />
                  and <span>delivery.</span>
                </h2>
              </div>
              <p>
                Experience across operational technology, software architecture and digital
                products.
              </p>
            </div>
            <div className="experience-list">
              {experience.map((job) => (
                <article className="experience-row" key={job.company} data-reveal>
                  <div className="experience-meta">
                    <p>{job.period}</p>
                    <span>{job.location}</span>
                    {job.current && (
                      <span className="current-label">
                        <span className="status-dot" /> CURRENT ROLE
                      </span>
                    )}
                  </div>
                  <div className="experience-content">
                    <h3>{job.role}</h3>
                    <p className="company">
                      {job.company}
                      {job.group && <span> / {job.group}</span>}
                    </p>
                    <ul>
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="section container about-section"
          aria-labelledby="about-title"
        >
          <div className="about-intro" data-reveal>
            <p className="eyebrow section-kicker">03 / ABOUT</p>
            <h2 id="about-title">
              Technology is only
              <br />
              as good as <span>what it enables.</span>
            </h2>
            <p>
              I&apos;m {profile.fullName}, a University of Calgary software engineering graduate and
              IT Systems Manager at Checker Cabs. My background spans product design, software
              development, cybersecurity analysis, DevOps and project management.
            </p>
            <p>
              I work across the whole problem: understanding people&apos;s needs, designing the
              system, coordinating delivery and making sure the result works in practice.
            </p>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <ArrowUpRight />
            </a>
          </div>
          <article className="education-card" data-reveal>
            <div className="education-top">
              <span className="eyebrow">EDUCATION</span>
              <span className="education-year">{education.year}</span>
            </div>
            <CapabilityIcon variant="software" />
            <h3>{education.degree}</h3>
            <p className="education-institution">{education.institution}</p>
            <p>{education.school}</p>
            <p className="education-specialization">{education.specialization}</p>
            <p className="education-location">{education.location}</p>
          </article>
        </section>

        <section className="section container skills-section" aria-labelledby="skills-title">
          <div className="skills-heading" data-reveal>
            <p className="eyebrow section-kicker">04 / TECHNICAL CAPABILITIES</p>
            <h2 id="skills-title">
              The tools behind
              <br />
              <span>the outcomes.</span>
            </h2>
            <p>
              A foundation in engineering, with the range to connect software, operations and
              delivery.
            </p>
            <div className="skill-highlights">
              <span>React / Next.js</span>
              <span>Python / SQL</span>
              <span>AWS / Azure</span>
              <span>Security / DevOps</span>
            </div>
          </div>
          <div className="skills-list">
            {skills.map((skill) => (
              <div className="skill-row" key={skill.title} data-reveal>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container contact-inner" data-reveal>
            <p className="eyebrow">05 / CONTACT</p>
            <div className="contact-heading">
              <h2 id="contact-title">
                Let&apos;s put good
                <br />
                ideas <span>to work.</span>
              </h2>
              <a
                className="contact-arrow"
                href={`mailto:${profile.email}`}
                aria-label="Email Umar Khan"
              >
                <ArrowUpRight />
              </a>
            </div>
            <div className="contact-bottom">
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email} <ArrowUpRight />
              </a>
              <p>
                For e-vouchers enquiries,
                <br />
                <a href={`tel:${checker.salesPhone}`}>
                  contact Checker Sales <ArrowUpRight />
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="footer-name" href="#home">
          Umar Khan <span>Calgary, Alberta · © {new Date().getFullYear()}</span>
        </a>
        <div>
          <a href="/UmarKhanResume.pdf" download>
            Résumé <ArrowUpRight />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight />
          </a>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      <Motion />
    </>
  );
}
