"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

export function useAssembly(target: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = target.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current: number | null = null;
    let lastTime = 0;
    const update = (now = performance.now()) => {
      frame = 0;
      if (document.hidden) {
        lastTime = 0;
        return;
      }
      if (motion.matches || element.contains(document.activeElement)) {
        element.style.removeProperty("--assembly");
        current = null;
        lastTime = 0;
        return;
      }
      const { top, bottom } = element.getBoundingClientRect();
      const viewportProgress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight * 0.95 - top) / (window.innerHeight * 0.5),
        ),
      );
      // Footer content must fully reveal even when the page ends before it
      // can reach the usual midpoint of the viewport.
      const remainingScroll = Math.max(
        0,
        document.documentElement.scrollHeight -
          window.innerHeight -
          window.scrollY,
      );
      const bottomProgress = Math.max(
        0,
        1 - remainingScroll / (window.innerHeight * 0.35),
      );
      const progress = Math.max(viewportProgress, bottomProgress);
      const eased = progress * progress * (3 - 2 * progress);
      const desired = 1 - eased;
      const delta = lastTime ? Math.min(48, Math.max(1, now - lastTime)) : 16;
      lastTime = now;
      // Time-based damping stays consistent on high-refresh displays and
      // softens large mouse-wheel jumps without replacing native scrolling.
      if (current === null || top > window.innerHeight || bottom < 0)
        current = desired;
      else current += (desired - current) * (1 - Math.exp(-delta / 85));
      if (Math.abs(desired - current) < 0.0005) current = desired;
      element.style.setProperty("--assembly", current.toFixed(4));
      if (current !== desired) frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    element.addEventListener("focusin", schedule);
    element.addEventListener("focusout", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
      element.removeEventListener("focusin", schedule);
      element.removeEventListener("focusout", schedule);
      element.style.removeProperty("--assembly");
    };
  }, [target]);
}

export function ScrollAssemblyTitle({
  text,
  id,
  emphasized = false,
}: {
  text: string;
  id?: string;
  emphasized?: boolean;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useAssembly(heading);
  return (
    <h2 ref={heading} id={id} className="assembly-title" aria-label={text}>
      {emphasized ? (
        <strong>
          <ScrollAssemblyLetters text={text} />
        </strong>
      ) : (
        <ScrollAssemblyLetters text={text} />
      )}
    </h2>
  );
}

export function ScrollAssemblyLetters({ text }: { text: string }) {
  const center = (Array.from(text).length - 1) / 2;
  let characterIndex = 0;
  return (
    <span aria-hidden="true">
      {text.split(" ").map((word, wordIndex) => {
        const start = characterIndex;
        characterIndex += Array.from(word).length + 1;
        return (
          <span className="assembly-word" key={wordIndex}>
            {wordIndex > 0 && " "}
            {Array.from(word).map((character, index) => {
              const distance = (start + index - center) / Math.max(center, 1);
              return (
                <span
                  key={index}
                  className="assembly-character"
                  style={
                    {
                      "--character-x": `${distance * 58}px`,
                      "--character-rotation": `${distance * 65}deg`,
                      "--character-stagger": 1 + Math.abs(distance) * 0.45,
                    } as CSSProperties
                  }
                >
                  {character}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

export function ScrollAssemblyBlock({ children }: { children: ReactNode }) {
  const block = useRef<HTMLDivElement>(null);
  useAssembly(block);
  return (
    <div ref={block} className="assembly-block">
      <div className="assembly-block-content">{children}</div>
    </div>
  );
}

export function ScrollAssemblyItems({ children }: { children: ReactNode }) {
  const list = useRef<HTMLUListElement>(null);
  useAssembly(list);
  useEffect(() => {
    const items = Array.from(list.current?.children ?? []) as HTMLElement[];
    const center = (items.length - 1) / 2;
    items.forEach((item, index) => {
      const distance = index - center;
      item.style.setProperty("--item-x", `${distance * 18}px`);
      item.style.setProperty("--item-y", `${Math.abs(distance) * 14}px`);
      item.style.setProperty("--item-rotation", `${distance * 8}deg`);
      item.style.setProperty(
        "--item-stagger",
        `${1 + Math.abs(distance) * 0.12}`,
      );
    });
  }, [children]);
  return (
    <ul ref={list} className="assembly-items">
      {children}
    </ul>
  );
}
