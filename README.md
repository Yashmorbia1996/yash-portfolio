# Yash Morbia, Portfolio

Personal portfolio of Yash Morbia, senior mechanical engineer (Greater Boston). Static, content-driven site for case studies, work history, certifications, and operational ownership in regulated hardware.

Live URL: _set on deploy (see [Deploying](#deploying))._

## Stack

| Layer       | Technology                                          |
| ----------- | --------------------------------------------------- |
| Framework   | [Astro 5](https://astro.build) (static, islands)    |
| UI          | [React 19](https://react.dev) + shadcn/ui (Radix Slot) |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com) with CSS variables |
| Content     | Astro MDX + Zod-validated content collections       |
| Icons       | [lucide-react](https://lucide.dev)                  |
| Fonts       | DM Sans, DM Serif Display, JetBrains Mono (self-hosted) |
| Scroll      | [Lenis](https://lenis.darkroom.engineering) (skipped if `prefers-reduced-motion`) |
| SEO         | `@astrojs/sitemap`, Open Graph, Twitter Card, canonical URLs |
| Package mgr | [pnpm](https://pnpm.io) (lockfile: `pnpm-lock.yaml`) |

## Project structure

```
.
├── astro.config.mjs               # site URL, integrations, redirects
├── components.json                # shadcn/ui config
├── public/
│   ├── favicon.svg
│   ├── robots.txt                 # update sitemap host on deploy
│   └── images/                    # all referenced assets (project covers, certificates, etc.)
└── src/
    ├── components/                # React + a few .astro components
    │   ├── layout/                # Header, Footer
    │   └── ui/                    # shadcn primitives in use: badge, button, card
    ├── config/site.ts             # name, role, bio, social, nav (single source of truth)
    ├── content/
    │   ├── config.ts              # Zod schemas for projects / blog / work
    │   ├── projects/*.mdx         # one file per project
    │   ├── blog/*.mdx             # one file per post
    │   └── work/*.mdx             # one file per role
    ├── data/                      # carousel + about copy
    ├── layouts/BaseLayout.astro   # HTML shell, meta, theme bootstrap, scroll engine
    ├── lib/                       # cn() helper, work-collection adapter
    ├── pages/                     # routes (index, about, projects, blog, certificates, …)
    └── styles/globals.css         # Tailwind tokens, theme variables, animations
```

## Scripts

```bash
pnpm install      # install dependencies
pnpm dev          # start dev server at http://localhost:4321
pnpm build        # build static output to dist/
pnpm preview      # serve dist/ locally
pnpm check        # astro check (type + content schema validation)
```

## Authoring content

Content lives in `src/content/{projects,blog,work}/*.mdx` and is validated against the Zod schemas in `src/content/config.ts`. Drop a new MDX file in the right folder and `pnpm dev` picks it up; `pnpm check` will fail loudly if the frontmatter doesn't match the schema.

**Project** (`src/content/projects/<slug>.mdx`):

```mdx
---
title: "Project title"
summary: "One or more paragraphs (max 700 chars). First paragraph is reused as the meta description."
date: 2025-01-15
featured: true
cover: "/images/projects/<slug>-cover.jpg"   # optional
tags: ["SolidWorks", "DFM"]
liveUrl: "https://example.com"               # optional
repoUrl: "https://github.com/..."            # optional
duration: "3 months"                         # optional
glanceOutcome: "−16 °C chip temp, returns under 3%"  # optional, shows in "At a glance"
---

Body MDX...
```

The detail page (`src/pages/projects/[slug].astro`) chooses one of three layouts based on slug:

- **Journey case study** — long summary + "At a glance" panel. Slugs are listed in the `isJourneyCaseStudy` check.
- **Hub page** — title + body only, optionally with `CadSimulationStudyLinks`. Slugs listed in the `isHubPage` check.
- **Default** — summary + tags + cover image, then MDX body.

To add a new project to the index carousel, also add an entry in `src/data/portfolioCarousel.ts`.

**Work** (`src/content/work/<slug>.mdx`):

```mdx
---
company: "Company"
role: "Role title"
startDate: "Jan 2024"
endDate: "Dec 2024"      # omit for current role
current: false
description: "One-sentence summary of the role."
achievements:
  - "Achievement one with numbers if possible"
  - "Achievement two"
order: 1                 # lower = higher in the timeline
location: "City, ST"     # optional
coverImage: "/images/..."          # optional, banner asset
coverImageLayout: "full" | "centered"
brandInitial: "Y"        # optional, 1-2 chars for selector
brandColor: "#5E6AD2"    # optional, hex for chip background
logoUrl: "https://..."   # optional, company logo URL
---
```

**Blog** (`src/content/blog/<slug>.mdx`):

```mdx
---
title: "Post title"
summary: "Max 300 chars."
date: 2025-03-01
tags: ["Astro"]
featured: false
cover: "/images/blog/cover.jpg"   # optional
---
```

## Personal info & navigation

`src/config/site.ts` is the single source of truth for name, role, bio, contact, nav links, and the skills pill list. Editing any of these does not require component changes.

## Theming

Color tokens live in `src/styles/globals.css` under `@theme` (light) and `.dark` (dark). The toggle persists to `localStorage` and an inline script in `BaseLayout.astro` applies the saved theme before first paint to prevent FOUC.

## Deploying

The site builds to a fully static `dist/` folder. Vercel, Netlify, Cloudflare Pages, and GitHub Pages all work out of the box.

**Before deploying**, update three places to point at your real domain:

1. `astro.config.mjs` — `site:`
2. `src/config/site.ts` — `url:`
3. `public/robots.txt` — `Sitemap:` line

These power the generated sitemap, canonical URLs, and Open Graph URLs.

**Open Graph image:** `siteConfig.ogImage` defaults to the headshot (square). For polished social cards, drop a 1200×630 image at `public/images/og.jpg` and point `siteConfig.ogImage` at it.

## Accessibility

- Skip-to-content link
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav aria-label>`, `<section aria-labelledby>`)
- All images have `alt` text; decorative SVGs use `aria-hidden`
- Icon-only buttons have `aria-label`
- Active nav links use `aria-current="page"`
- Modal dialogs use `role="dialog"`, `aria-modal`, `aria-labelledby`, focus management, and Escape-to-close
- Animations and smooth scroll are skipped when `prefers-reduced-motion` is set

## License

Source code: MIT. Content (case studies, copy, photos) is © Yash Morbia and not licensed for reuse.
