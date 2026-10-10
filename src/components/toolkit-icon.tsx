import { CodeXml, Orbit, SquareTerminal } from "lucide-react";
import { siClaude, siCss, siExpress, siFlask, siGoogle, siGooglegemini, siHtml5, siLeaflet, siNextdotjs, siNodedotjs, siPostgresql, siPython, siReact, siRender, siSupabase, siTailwindcss, siTypescript, siVercel, siVite, type SimpleIcon } from "simple-icons";

const brands: Record<string, SimpleIcon> = {
  css: siCss,
  html: siHtml5,
  python: siPython,
  flask: siFlask,
  typescript: siTypescript,
  react: siReact,
  nextjs: siNextdotjs,
  nodejs: siNodedotjs,
  supabase: siSupabase,
  postgresql: siPostgresql,
  claude: siClaude,
  gemini: siGooglegemini,
  googleworkspace: siGoogle,
  vercel: siVercel,
  render: siRender,
  express: siExpress,
  leaflet: siLeaflet,
  tailwindcss: siTailwindcss,
  vite: siVite,
  googlegemini: siGooglegemini,
};

export function ToolkitIcon({ name }: { name: string }) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const brand = brands[key];
  if (brand) return <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d={brand.path}/></svg>;
  const Icon = key === "vscode" ? CodeXml : key === "antigravity" ? Orbit : SquareTerminal;
  return <Icon size={23} strokeWidth={1.6} aria-hidden="true"/>;
}
