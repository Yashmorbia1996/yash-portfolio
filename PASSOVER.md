# Session Passover Document
**Date:** 2026-04-17
**Working dir:** `C:\Users\yash1\Desktop\portfolio-starter-template-main - without-project-pics`
**DO NOT touch:** `C:\Users\yash1\Desktop\portfolio-starter-template-main` (main folder, hands off)
**Dev server:** `npm run dev` in the without-project-pics folder → port 4321 (or 4322 if 4321 is in use)
**Git remote:** `four-16-2026` → `https://github.com/Yashmorbia1996/4-16-2026.git`, branch: `main`

---

## Session Summary — What Was Done Today

### 1. Badge Reel — Manufacturing Card Images Fixed
Component cards (6 of them, 3-col grid) had cropped images.
- **Root cause:** `h-full` on `<img>` equalled the full 176px container height, but `p-4` padding + `overflow-hidden` clipped 32px off top/bottom.
- **Fix:** Changed each image container from `h-44 shrink-0 overflow-hidden bg-white p-4` to `h-44 shrink-0 bg-white p-4 flex items-center justify-center overflow-hidden`, and image from `h-full w-full object-contain` to `max-h-full max-w-full object-contain`.
- **File:** `src/content/projects/badge-reel-redesign.mdx` — 6 image containers (Components 1–6)

### 2. Badge Reel — Snap-Back Speed Chart Replaced
Replaced `whoop-badge-slide-14.jpg` (raw slide screenshot) with a native HTML bar chart.
- 5 bars: Baseline (red), D1 (sky), D2 (amber), D3 ★ (emerald), D4 (gray)
- Right-side data table with % deltas
- Test parameter footnote at bottom
- No WHOOP branding anywhere
- **File:** `src/content/projects/badge-reel-redesign.mdx` (around the "Recommended D3" section)

### 3. Badge Reel — Slideshow Added to Project Card
Added `coverSlides` to badge-reel project card (same mechanism as other work project cards).
- **Slides:** `badge-reel-cad-assembled.png`, `badge-reel-cad-exploded.jpg`, `badge-reel-d3-cad-assembled.png`, `badge-reel-photo-light-open.png`, `badge-reel-teardown-light.png`
- **Files:** `src/pages/projects/index.astro` (added `badgeReelCoverSlides` array + wired to Personal Projects card), `src/pages/projects/[slug].astro` (wired to "More projects" section)

### 4. Font Size Lift — Sitewide
Bumped body/description text from 14px (`text-sm`) to 16px (`text-base`) or 15px (`text-[15px]`) across all components.

| File | Change |
|---|---|
| `ProjectCard.tsx` | Context subtitle: `text-sm` → `text-[15px]`; case study body + summary: `text-sm` → `text-base` |
| `CapabilitiesGrid.tsx` | Section desc + card summary: `text-sm` → `text-base`; bullets: `text-sm` → `text-[15px]` |
| `AboutSection.tsx` | Name note + role: `text-sm` → `text-[15px]`; biography: `text-sm` → `text-base` |
| `WorkExperienceTimeline.tsx` | Description (default): `text-sm` → `text-[15px]`; bullets (default): `text-sm` → `text-base`; read more btn: `text-xs` → `text-sm` |
| `Header.tsx` | Nav links: `text-sm` → `text-[15px]` |
| `[slug].astro` | At-a-glance outcome text: `text-sm` → `text-base` |
| `cross-functional-ownership.astro` | Scope card values: `text-sm` → `text-base`; section detail card body: `text-sm` → `text-[15px]` |

**Baseline saved in memory** at `memory/project_font_sizes_baseline.md` — if user wants to revert, all original classes are recorded there.

### 5. Operations Added to Nav
Added "Operations" (→ `/cross-functional-ownership`) between Projects and Certifications.
- Icon: `Layers` from lucide-react
- **Files:** `src/config/site.ts` (nav array), `src/components/layout/Header.tsx` (added Layers to iconMap import)

---

## Git Status at Close
**NOT committed.** All changes are saved to disk but not staged or committed.

Files modified (21):
- `src/components/AboutSection.tsx`
- `src/components/CapabilitiesGrid.tsx`
- `src/components/FeaturedProjects.tsx`
- `src/components/Hero.tsx`
- `src/components/HomeWorkExperienceSection.tsx`
- `src/components/ProjectCard.tsx`
- `src/components/ProjectCardCoverSlideshow.tsx`
- `src/components/ProjectGallery.tsx`
- `src/components/WorkExperienceTimeline.tsx`
- `src/components/layout/Header.tsx`
- `src/config/site.ts`
- `src/content/config.ts`
- `src/content/projects/connector-npi-smart-textiles.mdx`
- `src/content/projects/liv-optical-test-rig.mdx`
- `src/content/projects/press-test-fixture.mdx`
- `src/content/projects/thermal-redesign-journey.mdx`
- `src/content/work/flex-ltd.mdx`
- `src/content/work/nira-innovations.mdx`
- `src/pages/cross-functional-ownership.astro`
- `src/pages/projects/[slug].astro`
- `src/pages/projects/index.astro`

New untracked files to stage:
- `src/content/projects/badge-reel-redesign.mdx`
- All `public/images/badge-reel-*.png/jpg` images
- All `public/images/whoop-badge-slide-*.jpg` images
- `public/images/connector-1-yarn.png`, `connector-2-yarn.png`, `connector-3-yarn.png`

To commit and push next session:
```bash
cd "/c/Users/yash1/Desktop/portfolio-starter-template-main - without-project-pics"
git add src/ public/images/
git commit -m "Apr 17: badge reel fixes, font size lift, Operations nav item"
git push four-16-2026 main
```

---

## Key Architectural Reminders

### isJourneyCaseStudy (in [slug].astro)
Controls MDX-first layout (no cover image block). Current list:
- `thermal-redesign-journey`
- `liv-optical-test-rig`
- `press-test-fixture`
- `connector-npi-smart-textiles`
- `badge-reel-redesign`

### portfolioProjectIds Set (in [slug].astro)
All 9 slugs must be listed here for static pages to generate.

### Projects Index Section Order
1. Work Projects
2. Personal Projects (badge reel, B.Tech, earlier)
3. CAD & Simulation

### Em Dash Policy
NO em dashes anywhere. Use commas or colons.

### Badge Reel Image Pitfalls
- Do NOT use `badge-reel-spring-clock.png` for clock spring context
- Do NOT use `badge-reel-d3-cad-body.png` or `badge-reel-d3-cad-noattach.png` on white card backgrounds (low contrast)
- WHOOP name must never appear anywhere in badge reel content

---

## Stack
- Astro 5 + MDX + React 19 + Tailwind v4
- Fonts: DM Sans, JetBrains Mono (self-hosted via @fontsource)
- Port: 4321 (or 4322 if occupied)
