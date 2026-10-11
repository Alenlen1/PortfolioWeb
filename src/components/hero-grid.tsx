"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Ripple = Point & { born: number };

// Adapted from the supplied KineticGrid: cursor warping, pinned edges, and ripples.
export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    const context = canvas?.getContext("2d");
    if (!canvas || !hero || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, visible = true;
    let mouse: Point | null = null, target: Point | null = null;
    let ripples: Ripple[] = [];
    let dark = document.documentElement.dataset.theme === "dark";
    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      const base = dark ? "176,194,165" : "67,83,59";
      const active = dark ? "170,204,143" : "89,119,67";
      const columns = Math.max(2, Math.ceil(width / 55));
      const rows = Math.max(2, Math.ceil(height / 55));
      ripples = ripples.filter(ripple => now - ripple.born < 1100);

      // Faint dots preserve the texture of the original supplied background.
      context.fillStyle = `rgba(${base},.05)`;
      for (let x = 14; x < width; x += 28) for (let y = 14; y < height; y += 28) {
        context.beginPath(); context.arc(x, y, .7, 0, Math.PI * 2); context.fill();
      }
      const points: (Point & { proximity: number })[][] = [];
      for (let row = 0; row <= rows; row++) {
        points[row] = [];
        for (let column = 0; column <= columns; column++) {
          let x = column * width / columns, y = row * height / rows;
          const pin = Math.min(column / 1.5, (columns - column) / 1.5, 1) ** 2
            * Math.min(row / 1.5, (rows - row) / 1.5, 1) ** 2;
          let proximity = 0;
          if (mouse && !motion.matches) {
            const dx = x - mouse.x, dy = y - mouse.y, distance = Math.hypot(dx, dy);
            proximity = Math.max(0, 1 - distance / 260) * pin;
            if (distance > 0 && distance < 260) {
              const warp = (1 - distance / 260) ** 2 * Math.min(1, distance / 60) * 24 * pin;
              x -= dx / distance * warp; y -= dy / distance * warp;
            }
          }
          for (const ripple of ripples) {
            const age = (now - ripple.born) / 1000;
            const dx = x - ripple.x, dy = y - ripple.y, distance = Math.hypot(dx, dy);
            const difference = distance - age * 400;
            if (distance > 0 && Math.abs(difference) < 55) {
              const warp = (1 - Math.abs(difference) / 55) * Math.max(0, 1 - age) * 18 * pin * (difference < 0 ? 1 : -1);
              x += dx / distance * warp; y += dy / distance * warp;
            }
          }
          points[row][column] = { x, y, proximity };
        }
      }
      const segment = (a: typeof points[number][number], b: typeof a) => {
        const proximity = (a.proximity + b.proximity) / 2;
        context.strokeStyle = `rgba(${proximity > .05 ? active : base},${.07 + proximity * .28})`;
        context.lineWidth = .65 + proximity * .7;
        context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
      };
      for (let row = 0; row <= rows; row++) for (let column = 0; column <= columns; column++) {
        const point = points[row][column];
        if (column < columns) segment(point, points[row][column + 1]);
        if (row < rows) segment(point, points[row + 1][column]);
        context.fillStyle = `rgba(${point.proximity > .05 ? active : base},${.12 + point.proximity * .45})`;
        context.beginPath(); context.arc(point.x, point.y, 1.2 + point.proximity * 1.8, 0, Math.PI * 2); context.fill();
      }
      for (const ripple of ripples) {
        const age = (now - ripple.born) / 1000;
        context.strokeStyle = `rgba(${active},${Math.max(0, 1 - age) * .2})`;
        context.lineWidth = 1;
        context.beginPath(); context.arc(ripple.x, ripple.y, Math.max(0, age * 400), 0, Math.PI * 2); context.stroke();
      }
    };
    const animate = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      let moving = false;
      if (target) {
        mouse ??= { ...target };
        mouse.x += (target.x - mouse.x) * .08;
        mouse.y += (target.y - mouse.y) * .08;
        moving = Math.hypot(target.x - mouse.x, target.y - mouse.y) > .1;
      }
      draw(now);
      if (!motion.matches && (moving || ripples.length)) frame = requestAnimationFrame(animate);
    };
    const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(animate); };
    const resize = () => {
      width = hero.clientWidth; height = hero.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      schedule();
    };
    const position = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };
    const move = (event: PointerEvent) => {
      if (motion.matches || event.pointerType !== "mouse") return;
      target = position(event); schedule();
    };
    const leave = () => {
      target = mouse ? { x: mouse.x, y: -300 } : null; schedule();
    };
    const click = (event: PointerEvent) => {
      if (motion.matches) return;
      ripples.push({ ...position(event), born: performance.now() });
      ripples = ripples.slice(-6); schedule();
    };
    const retheme = () => { dark = document.documentElement.dataset.theme === "dark"; draw(performance.now()); };
    const preference = () => { mouse = target = null; ripples = []; schedule(); };
    const size = new ResizeObserver(resize);
    size.observe(hero);
    const theme = new MutationObserver(retheme);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule(); else { cancelAnimationFrame(frame); frame = 0; }
    });
    intersection.observe(hero);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    hero.addEventListener("pointerdown", click);
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", schedule);
    resize();
    return () => {
      cancelAnimationFrame(frame); size.disconnect(); theme.disconnect(); intersection.disconnect();
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); hero.removeEventListener("pointerdown", click);
      motion.removeEventListener("change", preference); document.removeEventListener("visibilitychange", schedule);
    };
  }, []);
  return <div className="hero-grid" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
