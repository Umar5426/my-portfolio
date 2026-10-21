import Image from "next/image";
import portrait from "@/assets/profile-img.png";
import { checker, education, experience, profile, projects, skills } from "@/lib/portfolio";
import { ArrowDown, ArrowUpRight } from "./components/icons";
import Navigation from "./components/navigation";
import { ProjectArtwork, Rosette } from "./components/project-artwork";

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
            <p className="hero-prelude">A little curiosity. A lot of purpose.</p>
            <h1 id="hero-title">
              Good systems.
              <br />
              <em>Human touch.</em>
            </h1>
            <p className="hero-description">
              I&apos;m <strong>Umar Khan</strong>, a software engineer and IT Systems Manager in
              Calgary. I bring people, products and technology together to make everyday work a
              little better.
            </p>
            <div className="hero-links">
              <a className="button button-red" href="#work">
                Step inside my work <ArrowDown />
              </a>
              <a className="text-link" href="/UmarKhanResume.pdf" download>
                My résumé <ArrowUpRight />
              </a>
            </div>
            <div className="hero-note">
              <span aria-hidden="true">✳</span>
              <p>
                Currently building useful things at
                <br />
                <strong>Checker Cabs · The Checker Group</strong>
              </p>
            </div>
          </div>
          <div className="hero-gallery">
            <div className="gallery-wall" aria-hidden="true" />
            <figure className="portrait-frame">
              <div className="portrait-mat">
                <Image
                  src={portrait}
                  alt="Umar Khan"
                  fill
                  priority
                  sizes="(max-width: 760px) 67vw, 26vw"
                  className="portrait"
                />
              </div>
              <figcaption>
                Umar Khan <span>Calgary, Alberta</span>
              </figcaption>
            </figure>
            <figure className="interior-frame">
              <Image
                src="/images/study-editorial.webp"
                alt="Decorative editorial study with oxblood velvet, warm wood, art and brass accents"
                fill
                sizes="(max-width: 760px) 70vw, 27vw"
                className="interior-image"
              />
              <figcaption aria-hidden="true">Make room for good ideas.</figcaption>
            </figure>
            <div className="gallery-seal">
              <Rosette />
              <span>
                ENGINEER
                <br />
                BY TRAINING.
                <br />
                <em>Builder at heart.</em>
              </span>
            </div>
            <span className="gallery-caption">A PERSONAL COLLECTION OF WORK & IDEAS / CALGARY</span>
          </div>
        </section>
        <div className="ribbon">
          <div className="container ribbon-inner">
            <span>Systems with substance</span>
            <i aria-hidden="true">✳</i>
            <span>Software with purpose</span>
            <i aria-hidden="true">✳</i>
            <span>People at the centre</span>
          </div>
        </div>
        <section id="work" className="section container" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow section-kicker">01 / A COLLECTION OF WORK</p>
              <h2 id="work-title">
                Made to be <em>useful.</em>
                <br />
                Built to be <em>used.</em>
              </h2>
            </div>
            <p>
              A few things I&apos;ve helped bring to life.
              <br />
              From everyday operations to ideas
              <br className="desktop-break" /> with a bigger purpose.
            </p>
          </div>
          <article className="featured-project" id="e-vouchers">
            <div className="featured-copy">
              <p className="eyebrow">01 / CHECKER CABS</p>
              <span className="project-type">BUSINESS SOFTWARE</span>
              <h3>
                A better way
                <br />
                to <em>go places.</em>
              </h3>
              <p className="project-name">e-vouchers by Umar Khan</p>
              <p>
                I created e-vouchers for Checker Cabs, alongside my work developing internal
                applications and connecting the systems behind the business.
              </p>
              <p>
                Want to find out more? Checker&apos;s sales team can help with e-voucher enquiries.
              </p>
              <a className="button button-gold" href={`tel:${checker.salesPhone}`}>
                Talk to Checker Sales <ArrowUpRight />
              </a>
              <div className="sales-detail">
                <a href={`tel:${checker.salesPhone}`}>{checker.salesPhoneDisplay}</a>
                <span aria-hidden="true">·</span>
                <a href={checker.contact} target="_blank" rel="noopener noreferrer">
                  Checker contact page <ArrowUpRight />
                </a>
              </div>
            </div>
            <div
              className="voucher-scene"
              role="img"
              aria-label="Decorative concept illustration for the e-vouchers project. Not an actual or redeemable voucher."
            >
              <span className="scene-corner" aria-hidden="true">
                ✳
              </span>
              <span className="scene-index">A CHECKER CABS PROJECT</span>
              <div className="voucher-shadow" />
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
                  <span>CALGARY, AB</span>
                </div>
              </div>
              <span className="scene-caption">PROJECT ILLUSTRATION / NOT A REDEEMABLE VOUCHER</span>
            </div>
          </article>
          <div className="project-collection">
            {projects.map((project) => (
              <article className={`project project-${project.style}`} key={project.number}>
                <div className={`project-art project-art-${project.style}`}>
                  <ProjectArtwork variant={project.style} />
                  <span className="art-label">
                    {project.organization}
                    <br />
                    {project.period}
                  </span>
                </div>
                <div className="project-copy">
                  <p className="eyebrow">
                    {project.number} / {project.category}
                  </p>
                  <h3>{project.title}</h3>
                  <p className="project-name">{project.name}</p>
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
            The experiments continue on GitHub <ArrowUpRight />
          </a>
        </section>
        <section className="impact-section" aria-label="Impact at Checker Cabs">
          <div className="container impact-inner">
            <span className="impact-ornament" aria-hidden="true">
              ✺
            </span>
            <p className="impact-number">
              30<span>+</span>
            </p>
            <div className="impact-copy">
              <h2>
                Hours given back.
                <br />
                <em>Every week.</em>
              </h2>
              <p>
                Over 30 hours of weekly workload saved through software automation and scripting at
                Checker Cabs.
              </p>
            </div>
            <p className="impact-aside">
              Less repetition.
              <br />
              More room for
              <br />
              <em>what matters.</em>
            </p>
          </div>
        </section>
        <section
          id="experience"
          className="section container experience-section"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow section-kicker">02 / THE PATH SO FAR</p>
              <h2 id="experience-title">
                A career built
                <br />
                on <em>curiosity.</em>
              </h2>
            </div>
            <p>
              Systems, architecture, product and software.
              <br />A growing collection of perspectives.
            </p>
          </div>
          <div className="experience-list">
            {experience.map((job, index) => (
              <article className="experience-row" key={job.company}>
                <div className="experience-meta">
                  <span className="experience-index">0{index + 1}</span>
                  <p>{job.period}</p>
                  <span>{job.location}</span>
                  {job.current && (
                    <span className="current-label">
                      <span className="status-dot" /> CURRENT CHAPTER
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
        </section>
        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="container about-inner">
            <div className="about-intro">
              <p className="eyebrow section-kicker">03 / THE PERSON BEHIND THE WORK</p>
              <h2 id="about-title">
                Technical mind.
                <br />
                <em>People first.</em>
              </h2>
              <p className="about-lead">Good technology begins with paying attention.</p>
              <p>
                I&apos;m {profile.fullName}, a University of Calgary software engineering graduate
                and IT Systems Manager at Checker Cabs. My work brings together product design,
                software development, cybersecurity analysis, DevOps and project delivery.
              </p>
              <p>
                I enjoy the whole process: listening to people, making sense of the problem,
                building the right system and seeing it become part of someone&apos;s everyday work.
              </p>
              <div className="signature">
                Umar<span aria-hidden="true">✳</span>
              </div>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                A little more on LinkedIn <ArrowUpRight />
              </a>
            </div>
            <div className="education-wrap">
              <span className="education-pin" aria-hidden="true" />
              <article className="education-card">
                <div className="education-top">
                  <span className="eyebrow">EDUCATION</span>
                  <Rosette />
                </div>
                <p className="education-year">{education.year}</p>
                <h3>{education.degree}</h3>
                <p className="education-institution">{education.institution}</p>
                <p>{education.school}</p>
                <div className="education-rule" />
                <p className="education-specialization">{education.specialization}</p>
                <p className="education-location">{education.location}</p>
              </article>
              <p className="education-footnote">
                A foundation in engineering.
                <br />
                <em>A lifelong appetite for learning.</em>
              </p>
            </div>
          </div>
        </section>
        <section className="section container skills-section" aria-labelledby="skills-title">
          <div className="skills-heading">
            <p className="eyebrow section-kicker">04 / THE TOOLKIT</p>
            <h2 id="skills-title">
              A well-stocked
              <br />
              <em>set of skills.</em>
            </h2>
            <p>From the first conversation to the final release.</p>
          </div>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <div className="skill-row" key={skill.title}>
                <span className="skill-index">0{index + 1}</span>
                <div>
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <p className="eyebrow">05 / THERE&apos;S ALWAYS ROOM FOR A CONVERSATION</p>
            <div className="contact-heading">
              <h2 id="contact-title">
                Come with an idea.
                <br />
                <em>Let&apos;s make it something.</em>
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
                E-vouchers enquiries?
                <br />
                <a href={`tel:${checker.salesPhone}`}>
                  Contact Checker Sales <ArrowUpRight />
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="footer-name" href="#home">
          Umar Khan <span>CALGARY, AB · © {new Date().getFullYear()}</span>
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
    </>
  );
}
