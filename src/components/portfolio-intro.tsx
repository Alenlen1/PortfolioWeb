"use client";

import { useEffect, useRef } from "react";
import { HeroGrid } from "@/components/hero-grid";

export function PortfolioIntro() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elapsed = Number(root.current?.getAnimations()[0]?.currentTime ?? 0);
    if (motion.matches || elapsed > 1150) return;
    let flight: Animation | undefined;
    let labelReveal: Animation | undefined;
    let destination: HTMLElement | null = null;
    let originalOpacity = "";
    const restore = () => {
      if (destination) destination.style.opacity = originalOpacity;
    };
    const cancel = () => {
      window.clearTimeout(timer);
      flight?.cancel();
      labelReveal?.cancel();
      restore();
      if (root.current) root.current.style.visibility = "hidden";
    };
    const timer = window.setTimeout(
      () => {
        const logo = mark.current;
        destination = document.querySelector<HTMLElement>(
          ".site-header .brand-mark",
        );
        if (!logo || !destination || motion.matches || window.scrollY > 40)
          return;
        const start = logo.getBoundingClientRect();
        const end = destination.getBoundingClientRect();
        const appearance = getComputedStyle(destination);
        const scale = end.width / start.width;
        const x = end.left + end.width / 2 - start.left - start.width / 2;
        const y = end.top + end.height / 2 - start.top - start.height / 2;
        const initialFont = parseFloat(getComputedStyle(logo).fontSize);
        const finalFont = parseFloat(appearance.fontSize) / scale;
        // A gentle arc starts upward, then settles precisely onto the brand.
        const frames = [0, 0.25, 0.5, 0.75, 1].map((t) => {
          const arcX = 2 * (1 - t) * t * x * 0.2 + t * t * x;
          const arcY = 2 * (1 - t) * t * y * 0.8 + t * t * y;
          return {
            offset: t,
            transform: `translate(${arcX}px, ${arcY}px) scale(${Math.pow(scale, t)})`,
            fontSize: `${initialFont + (finalFont - initialFont) * t}px`,
            paddingRight: `${(parseFloat(appearance.paddingRight) / scale) * t}px`,
            paddingBottom: `${(parseFloat(appearance.paddingBottom) / scale) * t}px`,
            ...(t === 1
              ? { lineHeight: appearance.lineHeight, boxShadow: "none" }
              : {}),
          };
        });
        originalOpacity = destination.style.opacity;
        destination.style.opacity = "0";
        root.current?.classList.add("intro-flying");
        flight = logo.animate(frames, {
          duration: 850,
          easing: "cubic-bezier(.6, 0, .25, 1)",
          fill: "forwards",
        });
        flight.onfinish = () => {
          restore();
          logo.style.visibility = "hidden";
          const label = destination
            ?.closest(".brand")
            ?.querySelector(".brand-label");
          if (label && !motion.matches)
            labelReveal = label.animate(
              [
                { opacity: 0.55, transform: "translateX(-4px)" },
                { opacity: 1, transform: "translateX(0)" },
              ],
              { duration: 400, easing: "cubic-bezier(.22, 1, .36, 1)" },
            );
        };
      },
      Math.max(0, 900 - elapsed),
    );
    window.addEventListener("resize", cancel);
    window.addEventListener("scroll", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { once: true });
    document.addEventListener("focusin", cancel);
    motion.addEventListener("change", cancel);
    return () => {
      window.clearTimeout(timer);
      flight?.cancel();
      labelReveal?.cancel();
      restore();
      window.removeEventListener("resize", cancel);
      window.removeEventListener("scroll", cancel);
      window.removeEventListener("pointerdown", cancel);
      document.removeEventListener("focusin", cancel);
      motion.removeEventListener("change", cancel);
    };
  }, []);

  return (
    <div ref={root} className="portfolio-intro" aria-hidden="true">
      <HeroGrid intro />
      <div className="portfolio-intro-content">
        <span ref={mark} className="portfolio-intro-mark">
          <svg
            className="portfolio-intro-ring"
            viewBox="0 0 120 120"
            fill="none"
          >
            <circle cx="60" cy="60" r="56" />
          </svg>
          a<span>✦</span>
        </span>
        <span className="portfolio-intro-kicker">
          Full Stack &amp; AI Web Developer
        </span>
      </div>
    </div>
  );
}
