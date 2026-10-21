import Image from "next/image";
import portrait from "@/assets/profile-img.png";
import { checker, experience, profile, projects, skills } from "@/lib/portfolio";
import { ArrowDown, ArrowUpRight } from "./components/icons";
import Navigation from "./components/navigation";

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
            <div className="eyebrow">
              <span className="status-dot" /> IT SYSTEMS MANAGER · CHECKER CABS
            </div>
            <h1 id="hero-title">
              Systems that
              <br />
              move things
              <br />
              <em>forward.</em>
              <span className="hero-period">↗</span>
            </h1>
            <p className="hero-description">
              I&apos;m Umar, an IT Systems Manager and software developer in Calgary. I connect
              technology with the people and businesses that use it.
            </p>
            <div className="hero-links">
              <a className="button button-dark" href="#work">
                Explore my work <ArrowDown />
              </a>
              <a className="text-link" href="#about">
                A little about me <ArrowUpRight />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="location-mark" aria-hidden="true">
                ⊕
              </span>{" "}
              BASED IN CALGARY, ALBERTA <span className="hero-footnote-line" />
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <Image
                src={portrait}
                alt="Umar Khan"
                fill
                priority
                sizes="(max-width: 760px) 85vw, 38vw"
                className="portrait"
              />
              <div className="portrait-shade" />
              <div className="portrait-caption">
                <span>MUHAMMED UMAR KHAN</span>
                <span>CALGARY, CA</span>
              </div>
            </div>
            <div className="current-role">
              <span className="role-symbol" aria-hidden="true">
                ↗
              </span>
              <div>
                <span className="small-label">CURRENTLY AT</span>
                <strong>Checker Cabs</strong>
                <span>IT Systems Manager</span>
              </div>
              <span className="status-dot" />
            </div>
            <span className="portrait-side-note">BUILDING WITH PURPOSE. ALWAYS LEARNING.</span>
          </div>
        </section>

        <div className="focus-strip">
          <div className="container focus-inner">
            <span>IT SYSTEMS</span>
            <span className="strip-star">✳</span>
            <span>SOFTWARE DEVELOPMENT</span>
            <span className="strip-star">✳</span>
            <span>PRODUCT THINKING</span>
            <span className="strip-star">✳</span>
            <span>CALGARY → EVERYWHERE</span>
          </div>
        </div>

        <section id="work" className="section container" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-kicker">01 / SELECTED WORK</span>
              <h2 id="work-title">
                Ideas, made
                <br />
                <em>real.</em>
              </h2>
            </div>
            <p>
              Business software and personal experiments.
              <br />A selection of things I&apos;ve built.
            </p>
          </div>
          <article className="featured-project" id="e-vouchers">
            <div className="featured-copy">
              <div className="project-topline">
                <span className="project-number">01</span>
                <span className="pill">FEATURED PROJECT</span>
              </div>
              <span className="small-label">CHECKER CABS · BUSINESS SOFTWARE</span>
              <h3>
                e-vouchers<span className="accent-dot">.</span>
              </h3>
              <p>
                I created e-vouchers for Checker Cabs, bringing my software development work into
                the business where I manage IT systems.
              </p>
              <p className="featured-secondary">
                Interested in e-vouchers for your business? Checker&apos;s sales department can
                share more and help you get started.
              </p>
              <a className="button button-lime" href={`tel:${checker.salesPhone}`}>
                Talk to Checker Sales <ArrowUpRight />
              </a>
              <div className="sales-detail">
                <a href={`tel:${checker.salesPhone}`}>{checker.salesPhoneDisplay}</a>
                <span>·</span>
                <a href={checker.contact} target="_blank" rel="noopener noreferrer">
                  Contact Checker <ArrowUpRight />
                </a>
              </div>
            </div>
            <div
              className="voucher-scene"
              role="img"
              aria-label="Decorative concept illustration for the e-vouchers project. Not an actual or redeemable voucher."
            >
              <div className="scene-grid" />
              <span className="scene-index">CHECKER CABS / E-VOUCHERS</span>
              <div className="voucher-card voucher-card-back" />
              <div className="voucher-card">
                <div className="voucher-brand">
                  <span className="checker-pattern" />
                  <span>
                    CHECKER
                    <br />
                    CABS
                  </span>
                  <span className="voucher-arrow">↗</span>
                </div>
                <div className="voucher-title">
                  Good things.
                  <br />
                  <em>In motion.</em>
                </div>
                <div className="voucher-divider" />
                <div className="voucher-bottom">
                  <span>e-vouchers</span>
                  <span className="voucher-bars" />
                </div>
              </div>
              <span className="scene-caption">PROJECT ILLUSTRATION · NOT A REDEEMABLE VOUCHER</span>
              <span className="scene-orbit" />
            </div>
          </article>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project" key={project.number}>
                <a
                  className={`project-image ${project.style}`}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.linkLabel}: ${project.title}`}
                >
                  <div className="project-browser">
                    <div className="browser-bar">
                      <i />
                      <i />
                      <i />
                      <span>{project.title}</span>
                    </div>
                    <div className="project-screenshot">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 760px) 90vw, 45vw"
                      />
                    </div>
                  </div>
                  <span className="project-open">
                    <ArrowUpRight />
                  </span>
                </a>
                <div className="project-heading">
                  <div>
                    <span className="small-label">
                      {project.number} / {project.category}
                    </span>
                    <h3>
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    </h3>
                  </div>
                  <ArrowUpRight />
                </div>
                <p>{project.description}</p>
                <ul className="tags" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <a
            className="all-projects"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            More projects & experiments on GitHub <ArrowUpRight />
          </a>
        </section>

        <section id="experience" className="experience-section" aria-labelledby="experience-title">
          <div className="container section">
            <div className="section-heading">
              <div>
                <span className="eyebrow section-kicker">02 / EXPERIENCE</span>
                <h2 id="experience-title">
                  Different places.
                  <br />
                  <em>One curious mind.</em>
                </h2>
              </div>
              <p>
                From media and product experiences in Dubai
                <br />
                to systems and software in Calgary.
              </p>
            </div>
            <div className="experience-list">
              {experience.map((job, index) => (
                <article
                  className={`experience-row ${job.current ? "current" : ""}`}
                  key={job.company}
                >
                  <div className="experience-period">
                    {job.current && <span className="status-dot" />}
                    {job.period}
                  </div>
                  <div className="experience-content">
                    <h3>{job.role}</h3>
                    <span className="company">{job.company}</span>
                    <p>{job.description}</p>
                  </div>
                  <div className="experience-location">
                    <span>{job.location}</span>
                    <span className="experience-index">0{index + 1}</span>
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
          <div className="about-intro">
            <span className="eyebrow section-kicker">03 / THE PERSON BEHIND THE WORK</span>
            <h2 id="about-title">
              A builder.
              <br />A problem solver.
              <br />
              <em>Always curious.</em>
            </h2>
            <div className="about-signature">
              Umar<span>↗</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              Good technology starts with understanding the people who need it.
            </p>
            <p>
              I&apos;m {profile.fullName}, based in {profile.location}. My background brings
              together software engineering, product experience and hands-on IT systems management.
            </p>
            <p>
              Today, I work as {profile.title} at {profile.company}, where I also created
              e-vouchers. Earlier internships at MBC Shahid and Al Arabiya shaped how I approach
              interfaces, products and the systems behind them.
            </p>
            <p>
              I enjoy working across the whole problem: understanding what&apos;s needed, building
              something useful and making it clearer along the way.
            </p>
            <div className="skills-list">
              {skills.map((skill) => (
                <div key={skill.title}>
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                </div>
              ))}
            </div>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <ArrowUpRight />
            </a>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact-top">
              <span className="eyebrow section-kicker">04 / LET&apos;S CONNECT</span>
              <span>CALGARY, ALBERTA · CANADA</span>
            </div>
            <div className="contact-heading">
              <h2 id="contact-title">
                Have something
                <br />
                <em>in mind?</em>
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
                For e-vouchers enquiries,{" "}
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
          Umar Khan<span>© {new Date().getFullYear()}</span>
        </a>
        <div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight />
          </a>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
