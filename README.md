# Portfolio Starter Template

A production-grade portfolio template for engineers and technical professionals. Built on Astro 5 + React 19 with a Linear-inspired design system, MDX content collections, and full dark/light mode support.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) (static output, Island architecture) |
| UI | [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) (Radix primitives) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) with CSS variable theming |
| Content | [Astro MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) + Zod-validated collections |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | DM Sans · DM Serif Display · JetBrains Mono (self-hosted via Fontsource) |
| Scroll | [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| SEO | Astro Sitemap · Open Graph · Twitter Card · canonical URLs |

---

## Features

- **Linear Ash / Midnight theme**, Two handcrafted palettes (light + dark) using CSS variables. Theme toggle persists to `localStorage` with FOUC prevention.
- **MDX content collections**, Type-safe schemas for Projects, Blog, and Work Experience. Add content by dropping `.mdx` files into the right folder; no component changes needed.
- **Design Evolution timeline**, Per-project stepper component with step badges, connecting lines, and image placeholders, ready to swap in real renders.
- **Impact metrics bar**, Hero stat cards (e.g., `$4M → $15M`) with a glassmorphic lift, configurable from `site.ts`.
- **Capabilities grid**, 2×2 card grid for your four core competencies, icon + title + description.
- **Scroll-reveal animations**, Sections animate in on scroll using `IntersectionObserver`. Respects `prefers-reduced-motion`.
- **Fully responsive**, Mobile-first layouts. Navigation collapses to a slide-out Sheet on small screens. TOC sidebar and avatar column appear at `md`/`xl` breakpoints.
- **Accessible**, Semantic HTML, visible focus rings, ARIA labels on icon-only buttons, 4.5:1+ contrast ratios for body text.

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/your-username/portfolio-starter-template.git
cd portfolio-starter-template

# 2. Install
npm install        # or pnpm install / yarn

# 3. Dev server
npm run dev        # → http://localhost:4321
```

---

## Project Structure

```
.
├── public/
│   ├── images/
│   │   ├── avatar.svg              # Your profile photo
│   │   ├── og.jpg                  # Open Graph image (1200×630)
│   │   └── projects/               # Project cover images
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Fixed nav + theme toggle
│   │   │   ├── Footer.tsx
│   │   │   └── Section.tsx         # Labeled section wrapper
│   │   ├── ui/                     # shadcn/ui primitives (badge, button, card…)
│   │   ├── Hero.tsx                # Headline, sub-copy, CTAs, stat cards
│   │   ├── CapabilitiesGrid.tsx    # Four-card competency grid
│   │   ├── FeaturedProjects.tsx    # Up to 3 featured projects on home
│   │   ├── ProjectCard.tsx         # Reusable project card
│   │   ├── EvolutionTimeline.tsx   # Per-project design evolution stepper
│   │   ├── ExperienceTimeline.tsx  # Work history on About page
│   │   ├── SkillsGrid.tsx          # Skills pills on About page
│   │   ├── AboutSection.tsx        # About preview on Home
│   │   ├── NextSection.tsx         # CTA / "what I want next"
│   │   ├── BlogPostCard.tsx
│   │   ├── LatestPosts.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── content/
│   │   ├── projects/               # *.mdx, one file per project
│   │   ├── blog/                   # *.mdx, one file per post
│   │   ├── work/                   # *.mdx, one file per role
│   │   └── config.ts               # Zod schemas for all three collections
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro        # HTML shell: head, header, footer, theme script
│   │
│   ├── pages/
│   │   ├── index.astro             # /
│   │   ├── about.astro             # /about
│   │   ├── 404.astro
│   │   ├── projects/
│   │   │   ├── index.astro         # /projects
│   │   │   └── [slug].astro        # /projects/:slug
│   │   └── blog/
│   │       ├── index.astro         # /blog
│   │       └── [slug].astro        # /blog/:slug
│   │
│   ├── config/
│   │   └── site.ts                 # ← Start here. Name, role, bio, socials, skills.
│   │
│   ├── lib/
│   │   └── utils.ts                # cn() helper
│   │
│   └── styles/
│       └── globals.css             # Tailwind @theme, color tokens, fonts, animations
│
├── astro.config.mjs
├── components.json                 # shadcn/ui config
└── tsconfig.json
```

---

## Customization Guide

### 1. Personal info

Everything starts in `src/config/site.ts`:

```ts
export const siteConfig = {
  name:     "Jane Smith",
  role:     "Principal Mechanical Engineer",
  bio:      "15 years designing FDA-cleared electromechanical systems...",
  avatar:   "/images/avatar.jpg",
  location: "Boston, MA",

  url:         "https://janesmith.dev",
  description: "Portfolio of Jane Smith, precision hardware from concept to production.",
  ogImage:     "/images/og.jpg",

  social: {
    github:   "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    twitter:  "https://twitter.com/janesmith",
    email:    "jane@example.com",
  },

  skills: ["SolidWorks", "GD&T", "DFM", "Thermal Analysis", "ISO 13485"],
};
```

### 2. Add a project

Create `src/content/projects/my-project.mdx`:

```mdx
---
title: "Press Test Fixture"
summary: "Designed a precision press-fit fixture that cut defect escapes from 4.2% to 0.3%."
date: 2024-03-01
featured: true
cover: "/images/projects/press-fixture.jpg"
tags: ["SolidWorks", "GD&T", "DFM"]
liveUrl: "https://example.com"       # optional
repoUrl: "https://github.com/..."    # optional
duration: "3 months"                 # optional
---

## Overview
...

## Problem
...

## Approach
...

## Outcome
- Defect escape rate: 4.2% → 0.3%
- Inspection cycle time: −55%
```

Set `featured: true` on up to 3 projects, they appear in the **Featured Work** section on the home page.

**Project frontmatter schema:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | |
| `summary` | string ≤ 300 chars | ✅ | Used in cards and meta |
| `date` | date | ✅ | ISO 8601 or `YYYY-MM-DD` |
| `cover` | string | ✅ | Path under `public/` |
| `tags` | string[] (min 1) | ✅ | Rendered as pills |
| `featured` | boolean |, | Default: `false` |
| `liveUrl` | URL |, | |
| `repoUrl` | URL |, | |
| `duration` | string |, | e.g., `"6 months"` |

### 3. Add a work experience entry

Create `src/content/work/acme-corp.mdx`:

```mdx
---
company: "Acme Medical"
role: "Senior Mechanical Engineer"
startDate: "Jan 2021"
endDate: "Dec 2023"      # omit if current
current: false
order: 1                 # lower = higher in the list
description: "Led mechanical design for a Class II electromechanical analyzer."
achievements:
  - "Scaled production from 500 to 1,500 units/week"
  - "8 FDA audits with zero major findings"
  - "Reduced BOM cost by 18% through DFM review"
---
```

**Work frontmatter schema:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `company` | string | ✅ | |
| `role` | string | ✅ | |
| `startDate` | string | ✅ | e.g., `"Jan 2021"` |
| `endDate` | string |, | Omit if current |
| `current` | boolean |, | Default: `false` |
| `description` | string | ✅ | One-sentence summary |
| `achievements` | string[] | ✅ | Bullet points |
| `order` | number |, | Controls sort order |

### 4. Add a blog post

Create `src/content/blog/tolerance-stacks.mdx`:

```mdx
---
title: "Tolerance Stacks in 15 Minutes"
summary: "A practical guide to 1D worst-case and RSS tolerance analysis."
date: 2024-01-10
tags: ["GD&T", "Manufacturing"]
featured: false
cover: "/images/blog/tolerance-stacks.jpg"   # optional
---

Your MDX content here...
```

### 5. Customize the theme

Colors live in `src/styles/globals.css` under `@theme` (light) and `.dark` (dark):

```css
@theme {
  --color-background:     #F4F5F8;   /* page background */
  --color-foreground:     #1A1A21;   /* primary text */
  --color-primary-accent: #5E6AD2;   /* Linear indigo, buttons, links, highlights */
  --color-card:           #FFFFFF;
  --color-muted-foreground: #8A8F98; /* secondary text */
  /* ... */
}

.dark {
  --color-background:     #08090A;
  --color-foreground:     #F4F5F8;
  /* ... */
}
```

Change `--color-primary-accent` to swap the entire accent color across buttons, badges, and highlights in one edit.

> **Note:** This project uses Tailwind CSS v4 with class-based dark mode. The `@variant dark (&:is(.dark *))` directive in `globals.css` binds `dark:` utilities to the `.dark` class managed by the theme toggle, not to the OS `prefers-color-scheme` setting.

### 6. Update the Design Evolution timeline

The `EvolutionTimeline` component accepts a `steps` prop so each project can define its own evolution. Pass steps from the project's `[slug].astro` page:

```tsx
<EvolutionTimeline steps={[
  {
    number: 1,
    phase: "Concept",
    decision: "Define form factor from user needs",
    description: "Initial requirements gathered from clinical stakeholders...",
    imageSrc: "/images/projects/concept-sketch.jpg",
    imageAlt: "Concept sketches and initial CAD layout",
  },
  // ...
]} />
```

If no `steps` prop is passed, the component uses built-in default steps.

---

## Scripts

```bash
npm run dev       # Start dev server at http://localhost:4321
npm run build     # Build static output to dist/
npm run preview   # Serve the dist/ build locally
```

---

## Deployment

The output is a fully static site in `dist/`. Deploy to any static host:

**Vercel**, Import the repo, framework preset: **Astro**. Zero config needed.

**Netlify**, Build command: `npm run build` · Publish directory: `dist`

**GitHub Pages**, Add `base` to `astro.config.mjs` if hosting at a sub-path, then deploy `dist/` to the `gh-pages` branch.

Before deploying, update two values:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://your-domain.com', // ← your real URL
  // ...
});
```

```ts
// src/config/site.ts
url: "https://your-domain.com",
```

These values power the sitemap and canonical URLs.

---

## Adding Images

| Type | Location | Recommended size |
|---|---|---|
| Avatar | `public/images/avatar.jpg` | 400×400px |
| Open Graph | `public/images/og.jpg` | 1200×630px |
| Project covers | `public/images/projects/*.jpg` | 1200×675px (16:9) |
| Blog covers | `public/images/blog/*.jpg` | 1200×675px (16:9) |

---

## Included Example Content

The repo ships with placeholder content you can replace or delete:

- **Projects**, Press Test Fixture, LIV Optical Test Rig, Thermal Redesign Journey (all featured), plus Analytics Dashboard and Design System Rebuild (not featured)
- **Blog**, "Getting Started with Astro"
- **Work**, Acme Corp, Startup Inc

---

## License

MIT, use it, fork it, ship it.
