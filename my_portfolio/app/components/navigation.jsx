"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useSyncExternalStore } from "react";
import { ArrowUpRight } from "./icons";

const navigation = [
  ["Expertise", "/#expertise"],
  ["Work", "/projects"],
  ["Experience", "/experience"],
  ["About", "/#about"],
];

function subscribeTheme(callback) {
  window.addEventListener("portfolio-theme-change", callback);
  return () => window.removeEventListener("portfolio-theme-change", callback);
}

function readTheme() {
  return document.documentElement.dataset.theme === "dark";
}

function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeTheme, readTheme, () => false);
  function toggleTheme() {
    const nextTheme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      /* The toggle also works without storage. */
    }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      title={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        ) : (
          <path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z" />
        )}
      </svg>
    </button>
  );
}

export default function Navigation() {
  const menu = useRef(null);
  const pathname = usePathname();
  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }
  return (
    <header className={`site-header${pathname !== "/" ? " interior-header" : ""}`}>
      <div className="container nav-inner">
        <Link className="wordmark" href="/" aria-label="Umar Khan, home">
          <span className="monogram">
            uk<span>.</span>
          </span>
          <span>
            Umar Khan<span className="wordmark-caption">Systems. Software. Delivery.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link className="nav-contact" href="/contact">
            Let&apos;s talk <ArrowUpRight />
          </Link>
          <details
            className="mobile-menu"
            ref={menu}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                closeMenu();
                menu.current?.querySelector("summary")?.focus();
              }
            }}
          >
            <summary aria-label="Toggle navigation">
              <span />
              <span />
            </summary>
            <nav
              aria-label="Mobile navigation"
              onClick={closeMenu}
              onKeyUp={(event) => {
                if (event.key === "Enter") closeMenu();
              }}
            >
              {navigation.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
              <Link href="/contact">Contact</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
