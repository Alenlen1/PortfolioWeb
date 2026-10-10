# Alen's portfolio

A React + Next.js App Router + TypeScript portfolio inspired by https://iqmal.dev/. The homepage focuses on About, Tech Stack, and Projects, with an animated introduction, accessible navigation, project galleries and case studies, and a contact footer.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

```sh
npm run typecheck
npm run build
npm start
```

## Make it yours

- Edit `src/data/portfolio.ts` for your name, email, location, social URLs, experience, skills, and project descriptions. Social URLs currently point to the platform homepages.
- Update the title and description in `src/app/layout.tsx`.
- Replace the illustrated placeholder in `Hero` in `src/components/portfolio.tsx` with your own photo.
- Projects are ordered EvacuRosa, SkillBridge, then Cashout Tracker (a personal project), with live URLs in `src/data/portfolio.ts`. Each also has a detail page at `/projects/[slug]`.
- Project images are real screenshots captured from the supplied URLs, stored in `public/projects/`. Replace those PNG files to update the previews. `src/components/project-screenshot.tsx` imports and bundles each screenshot directly and renders it with a native image element.
- `/resume` uses the same sample data. Its Save as PDF button opens the browser print dialog.
- Adjust base colors and layouts in `src/app/globals.css`, and the enhanced art direction in `src/app/enhancements.css`.
- Edit `toolkitGroups` in `src/data/portfolio.ts` for technologies, coding tools, workspace tools, and hosting. The section is rendered by `src/components/enhancements.tsx`, with icons from `src/components/toolkit-icon.tsx`.

## Interactions

- Fixed navigation highlights the current section; the top bar indicates reading progress.
- The portrait card responds to mouse movement; motion respects the device's reduced-motion setting.
- Project screenshots open in an expanded dialog with Escape support, with live site links beside each preview.
- Filter the project archive by discipline.
- Project detail pages include an overview, highlights, and a live site link.
- The contribution skyline uses Alenlen1's public GitHub calendar, refreshes hourly, and supports 2D/3D views. `src/lib/github-contributions.ts` loads the daily counts; `src/data/github-contributions.json` preserves a real snapshot for temporary network failures.

Profile, resume, and contact details remain placeholders. Project descriptions reflect their public sites. No personal content or photos from the design reference are used.
