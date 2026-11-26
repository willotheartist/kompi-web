"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (listener: () => void) => {
  const media = window.matchMedia(reducedQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};
const getReducedMotion = () => window.matchMedia(reducedQuery).matches;
const getServerReducedMotion = () => true;

/** One frame per scroll/pointer update; no permanent animation loop. */
export function HomeMotion() {
  const prefersReducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const [userPaused, setUserPaused] = useState(false);
  const paused = prefersReducedMotion || userPaused;

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".nh");
    if (!root) return;
    root.dataset.motion = paused ? "off" : "on";
    if (paused) return;

    const hero = root.querySelector<HTMLElement>(".nh-hero");
    const reveals = [...root.querySelectorAll<HTMLElement>("[data-home-reveal]")];
    const animated = [...root.querySelectorAll<HTMLElement>("[data-home-animate]")];
    const parallax = [...root.querySelectorAll<HTMLElement>("[data-home-parallax]")];
    const inkHeadings = [...root.querySelectorAll<HTMLElement>("[data-home-ink]")];
    const pointerCards = [...root.querySelectorAll<HTMLElement>("[data-home-tilt]")];
    const desktop = window.matchMedia("(min-width: 761px) and (pointer: fine)");
    let frame = 0;

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("home-await-reveal");
        entry.target.setAttribute("data-home-revealed", "true");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    for (const element of reveals) {
      // Never hide already-visible content during hydration or navigation.
      if (element.getBoundingClientRect().top >= window.innerHeight) element.classList.add("home-await-reveal");
      else element.dataset.homeRevealed = "true";
      observer.observe(element);
    }
    const activityObserver = new IntersectionObserver(entries => {
      for (const entry of entries) entry.target.setAttribute("data-home-inview", String(entry.isIntersecting));
    }, { rootMargin: "80px" });
    animated.forEach(element => activityObserver.observe(element));

    const draw = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const y = window.scrollY;
      const pageHeight = Math.max(1, document.documentElement.scrollHeight - viewport);
      root.style.setProperty("--page-progress", String(Math.min(1, y / pageHeight)));
      if (hero) {
        const progress = Math.min(1, Math.max(0, y / hero.offsetHeight));
        hero.style.setProperty("--hero-travel", `${progress * (desktop.matches ? 150 : 35)}px`);
        hero.style.setProperty("--hero-scale", String(1.025 + progress * (desktop.matches ? 0.09 : 0.025)));
        hero.style.setProperty("--copy-travel", `${progress * -60}px`);
        hero.style.setProperty("--copy-opacity", String(Math.max(0, 1 - progress * 1.6)));
      }
      for (const element of parallax) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) continue;
        const progress = (viewport / 2 - rect.top - rect.height / 2) / (viewport + rect.height);
        element.style.setProperty("--scene-travel", `${progress * (desktop.matches ? 95 : 30)}px`);
      }
      for (const heading of inkHeadings) {
        const rect = heading.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) continue;
        const progress = Math.max(0, Math.min(1, (viewport * 0.82 - rect.top) / (viewport * 0.55)));
        heading.style.setProperty("--ink-first", `${(1 - Math.min(1, progress * 2)) * 100}%`);
        heading.style.setProperty("--ink-second", `${(1 - Math.max(0, progress * 2 - 1)) * 100}%`);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(draw); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    draw();

    const pointerCleanups = pointerCards.map(card => {
      let pointerFrame = 0;
      const move = (event: PointerEvent) => {
        if (!desktop.matches || event.pointerType !== "mouse") return;
        const rect = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        pointerFrame = window.requestAnimationFrame(() => {
          card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
          card.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
          card.style.setProperty("--spot-x", `${x * 100}%`);
          card.style.setProperty("--spot-y", `${y * 100}%`);
          pointerFrame = 0;
        });
      };
      const reset = () => {
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      };
      card.addEventListener("pointermove", move, { passive: true });
      card.addEventListener("pointerleave", reset);
      return () => {
        reset();
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", reset);
        card.style.removeProperty("--spot-x");
        card.style.removeProperty("--spot-y");
      };
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      activityObserver.disconnect();
      pointerCleanups.forEach(cleanup => cleanup());
      reveals.forEach(element => element.classList.remove("home-await-reveal"));
      animated.forEach(element => element.removeAttribute("data-home-inview"));
      root.style.removeProperty("--page-progress");
    };
  }, [paused]);

  return <>
    <div className="nh-scroll-progress" aria-hidden="true"/>
    {!prefersReducedMotion && <button className="nh-motion-toggle" type="button" onClick={() => setUserPaused(value => !value)} aria-label={userPaused ? "Play page animations" : "Pause page animations"}>{userPaused ? <Play size={13}/> : <Pause size={13}/>}<span>{userPaused ? "Play motion" : "Pause motion"}</span></button>}
  </>;
}
