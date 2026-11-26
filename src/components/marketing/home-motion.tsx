"use client";
import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-home-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("home-await-reveal");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("home-await-reveal");
      observer.observe(element);
    });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("home-await-reveal")); };
  }, []);
  return null;
}
