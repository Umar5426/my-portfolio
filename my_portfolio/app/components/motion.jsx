"use client";

import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...document.querySelectorAll("[data-reveal]")];
    let observer;

    function reset() {
      observer?.disconnect();
      for (const element of elements) element.classList.remove("reveal-pending");
    }

    function observe() {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.remove("reveal-pending");
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08 },
      );
      for (const element of elements) {
        // Content stays visible until JavaScript is ready, including without JS.
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("reveal-pending");
          observer.observe(element);
        }
      }
    }

    observe();
    preference.addEventListener("change", observe);
    return () => {
      preference.removeEventListener("change", observe);
      reset();
    };
  }, []);
  return null;
}
