import Link from "next/link";
import { profile } from "@/lib/portfolio";
import Navigation from "./navigation";

export default function PageShell({ children, label }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="interior container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{label}</span>
        </nav>
        {children}
      </main>
      <footer className="container site-footer interior-footer">
        <Link className="footer-name" href="/">
          Umar Khan<span>Systems. Software. Delivery.</span>
        </Link>
        <div>
          <Link href="/projects">Projects</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/contact">Contact</Link>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
