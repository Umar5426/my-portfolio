"use client";

import { useRef, useState } from "react";
import { profile } from "@/lib/portfolio";

const initial = { name: "", email: "", topic: "Project collaboration", message: "" };

export default function ContactForm() {
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState("");
  const form = useRef(null);
  const preview = useRef(null);

  function update(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
    setErrors({ ...errors, [name]: undefined });
    setDraft(null);
    setStatus("");
  }

  function prepare(event) {
    event.preventDefault();
    const next = {};
    if (!fields.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      next.email = "Please enter a valid email address.";
    if (fields.message.trim().length < 20)
      next.message = "Please include at least 20 characters about your enquiry.";
    setErrors(next);
    if (Object.keys(next).length) {
      setDraft(null);
      setStatus("Please check the highlighted fields.");
      form.current?.elements.namedItem(Object.keys(next)[0])?.focus();
      return;
    }
    const subject = `${fields.topic} — ${fields.name.trim()}`;
    const body = `Hello Umar,\n\n${fields.message.trim()}\n\n${fields.name.trim()}\nReply to: ${fields.email.trim()}`;
    setDraft({ subject, body });
    setStatus(
      "Your email draft is ready. Review it below, then open your email app or copy the message.",
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(
        `To: ${profile.email}\nSubject: ${draft.subject}\n\n${draft.body}`,
      );
      setStatus("Message copied. Paste it into your email app to send it.");
    } catch {
      preview.current?.focus();
      preview.current?.select();
      setStatus(
        "Automatic copying is unavailable. The draft is selected so you can copy it manually.",
      );
    }
  }

  return (
    <section className="contact-form-panel" aria-labelledby="message-title">
      <h2 id="message-title">What are you working on?</h2>
      <p className="form-intro">
        Prepare an email, review it, then send it from your email app. All fields are required.
      </p>
      <form ref={form} onSubmit={prepare} noValidate>
        <div className="form-pair">
          {[
            ["name", "Your name", "text", "name"],
            ["email", "Your email", "email", "email"],
          ].map(([name, label, type, complete]) => (
            <div className="form-field" key={name}>
              <label htmlFor={`contact-${name}`}>{label}</label>
              <input
                id={`contact-${name}`}
                name={name}
                type={type}
                autoComplete={complete}
                value={fields[name]}
                onChange={update}
                required
                maxLength={name === "name" ? 100 : 254}
                aria-invalid={Boolean(errors[name])}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
              {errors[name] && (
                <p className="field-error" id={`${name}-error`}>
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="form-field">
          <label htmlFor="contact-topic">What is it about?</label>
          <select id="contact-topic" name="topic" value={fields.topic} onChange={update} required>
            {[
              "Project collaboration",
              "Technical discussion",
              "Community work",
              "Other enquiry",
            ].map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            value={fields.message}
            onChange={update}
            required
            minLength={20}
            maxLength={1500}
            placeholder="A little context, what you need and what a useful outcome would look like…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error message-hint" : "message-hint"}
          />
          <div className="message-hint" id="message-hint">
            <span>Minimum 20 characters</span>
            <span>{fields.message.length}/1500</span>
          </div>
          {errors.message && (
            <p className="field-error" id="message-error">
              {errors.message}
            </p>
          )}
        </div>
        <div className="form-actions">
          <button type="submit" className="page-button primary">
            Prepare email
          </button>
          <button
            type="button"
            className="plain-button"
            onClick={() => {
              setFields(initial);
              setErrors({});
              setDraft(null);
              setStatus("Form cleared.");
            }}
          >
            Clear form
          </button>
        </div>
      </form>
      <p className="form-status" role="status">
        {status}
      </p>
      {draft && (
        <section className="email-preview" aria-labelledby="draft-title">
          <h3 id="draft-title">Review your email</h3>
          <p>To: {profile.email}</p>
          <label htmlFor="email-draft">Email draft</label>
          <textarea
            ref={preview}
            id="email-draft"
            readOnly
            rows={9}
            value={`Subject: ${draft.subject}\n\n${draft.body}`}
          />
          <div className="form-actions">
            <a
              className="page-button primary"
              href={`mailto:${profile.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}
            >
              Open email app
            </a>
            <button type="button" className="page-button" onClick={copy}>
              Copy message
            </button>
          </div>
          <p className="draft-note">
            No message has been sent. Send the email from your email app when you’re ready.
          </p>
        </section>
      )}
    </section>
  );
}
