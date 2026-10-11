"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const switching = useRef(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("portfolio-theme");
      } catch {}
      if (saved !== "light" && saved !== "dark") {
        document.documentElement.dataset.theme = media.matches
          ? "dark"
          : "light";
      }
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== "portfolio-theme" && event.key !== null) return;
      if (event.newValue === "light" || event.newValue === "dark") {
        document.documentElement.dataset.theme = event.newValue;
      } else followSystem();
    };
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", syncStorage);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const toggleTheme = async (event: MouseEvent<HTMLButtonElement>) => {
    if (switching.current) return;
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      root.dataset.theme = theme;
      try {
        localStorage.setItem("portfolio-theme", theme);
      } catch {}
    };
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    switching.current = true;
    root.classList.add("theme-revealing");
    try {
      const transition = document.startViewTransition(applyTheme);
      await transition.ready;
      const reveal = root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1100,
          easing: "cubic-bezier(.4, 0, .2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      await reveal.finished;
      await transition.finished;
    } catch {
      applyTheme();
    } finally {
      root.classList.remove("theme-revealing");
      switching.current = false;
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
    >
      <span className="theme-to-dark">
        <Moon size={16} aria-hidden="true" />
      </span>
      <span className="theme-to-light">
        <Sun size={16} aria-hidden="true" />
      </span>
    </button>
  );
}
