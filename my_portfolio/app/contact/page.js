import { profile } from "@/lib/portfolio";
import ContactForm from "../components/contact-form";
import PageShell from "../components/page-shell";

export const metadata = {
  title: "Contact | Umar Khan",
  description:
    "Start a conversation with Umar Khan about software, systems or community technology.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell label="Contact">
      <header className="page-heading">
        <p className="page-kicker">Start a conversation</p>
        <h1>
          Good work starts
          <br />
          <span>with a conversation.</span>
        </h1>
        <p>
          Have a software challenge, a systems question or a community project in mind? Tell me a
          little about it.
        </p>
      </header>
      <div className="contact-page-grid">
        <ContactForm />
        <aside className="contact-sidebar">
          <div>
            <p className="page-kicker">Based in</p>
            <h2>{profile.location}</h2>
            <p>Software engineering, operational systems and technical delivery.</p>
          </div>
          <div>
            <h2>Connect directly</h2>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <details className="contact-faq">
            <summary>Looking for Checker e-vouchers?</summary>
            <p>
              For e-vouchers enquiries and business arrangements, please contact{" "}
              <a
                href="https://www.thecheckergroup.com/contact/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Checker’s sales team
              </a>
              .
            </p>
          </details>
          <details className="contact-faq">
            <summary>How does this contact form work?</summary>
            <p>
              It prepares an email for you to review. Open it in your email app, or copy the message
              and send it to the address above. Preparing a draft does not send a message.
            </p>
          </details>
        </aside>
      </div>
    </PageShell>
  );
}
