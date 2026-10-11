# Alen's Portfolio

Personal portfolio of **Alen Amarante**, a Full Stack Web Developer and AI Web Developer. Built with Next.js, React, and TypeScript.

## Features

- Responsive design with light and dark themes.
- Animated intro with a connected navbar logo.
- Multilingual greetings and synchronized developer titles.
- Project previews, case studies, and a printable resume.
- GitHub activity with 2D and 3D views.
- Contact links and reduced-motion support.

## Getting started

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open [localhost:3000](http://127.0.0.1:3000).

## Commands

```sh
npm run typecheck   # Check TypeScript
npm run build       # Build for production
npm start           # Run the production build
```

## Customize

Edit `src/data/portfolio.ts` for profile details, projects, and technologies. Images and videos are stored in `public/`.

GitHub data can refresh on requests after the one-hour cache expires. A saved snapshot is used if GitHub is unavailable.

## Deploy

Import the repository into Vercel using the Next.js preset.

## Inspiration

Design inspired by [iqmal.dev](https://iqmal.dev/), customized with my own content, projects, and animations.
