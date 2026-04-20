# Portfolio Site — Handoff Document
**Date:** April 19, 2026  
**For:** Next chat session  
**Owner:** Yash Morbia — mechanical/thermal engineer

---

## 1. Working Rules (CRITICAL)

- **ALL edits go to:** `C:\Users\yash1\Desktop\portfolio-starter-template-main - without-project-pics`
- **NEVER touch:** `C:\Users\yash1\Desktop\portfolio-starter-template-main` (the other folder)
- Dev server: `pnpm dev` → http://localhost:4321
- Stack: Astro 5 + MDX + React 19 + Tailwind v4

---

## 2. Current Site Structure

### Projects Page (`/projects`)

**Section 1 — "Projects"** (one flat horizontal spotlight carousel)
- Thermal Redesign Journey → eyebrow: **Work Project**
- LIV Optical Test Rig → eyebrow: **Work Project**
- Press Test Fixture → eyebrow: **Work Project**
- Yarn Connector NPI: Smart Textiles → eyebrow: **Work Project**
- Badge Reel Redesign → eyebrow: **Personal Project**
- B.Tech Final Project → eyebrow: **Undergrad Capstone**

**Section 2 — "CAD & Simulation"** (separate carousel)
- ANSYS / Simulation Studies (hub page linking to sub-projects)
- SolidWorks Personal Projects

**Removed:** "Earlier Engineering Projects" and the "Other case studies" section heading.

---

## 3. Carousel Component — `WorkProjectsCarousel.tsx`

The carousel is a **flat horizontal spotlight carousel** (not 3D cylinder):
- Active card: centered, full opacity, full size
- Adjacent cards: blurred (`blur(3px)`), dimmed (`opacity: 0.4`), offset by `translateX`
- Scroll wheel on hover navigates cards; uses `e.preventDefault()` + `lenis.stop()/start()` to lock page scroll
- `data-carousel-card` attribute on each card — wheel only activates when cursor is over a card
- Card layout: **image on top** (aspect-video) → content below (Problem / Action / Result / Skills)
- Per-card `eyebrow` field overrides the component-level `eyebrow` prop

**Key constants (in WorkProjectsCarousel.tsx):**
```ts
const GAP = 16;                    // px gap between offset cards
const WHEEL_ACC_THRESHOLD = 44;    // wheel delta before slide advances
```

**Card content shown:** eyebrow, title, context, Situation/Problem, Action, Result, skills tags, CTA link

### Data source
All carousel data lives in: `src/data/portfolioCarousel.ts`

Exports:
- `workCarouselProjects` — 4 work projects (eyebrow: "Work Project")
- `academicPersonalCarouselProjects` — badge reel + btech (own eyebrows)
- `allProjectsCarouselProjects` — combined array used by projects/index.astro section 1
- `cadCarouselProjects` — ANSYS hub + SolidWorks
- `portfolioCarouselBySlug` — lookup map used by `[slug].astro` "More projects" row

---

## 4. CHT Analysis Project (NEW this session)

A full technical case study built from the old website's Google Docs HTML export.

**Route:** `/projects/cht-analysis-gpu`  
**MDX file:** `src/content/projects/cht-analysis-gpu.mdx`  
**Images:** `public/images/cht-analysis/` — 33 images with descriptive names

**Accessed via:** ANSYS / Simulation Studies hub page → "Read full study →"  
**Not shown** as its own card in the CAD & Simulation carousel.

### Image map (original hash → descriptive name)
| Descriptive name | What it shows |
|-----------------|---------------|
| `cht-gpu-real-card.jpg` | Real 2 GB graphics card reference photo |
| `cht-gpu-cad-model.jpg` | SolidWorks model (Processor, Fins, Base, Enclosure) |
| `cht-case1-geometry-3d.jpg` | Case 1 domain — labelled inlet/outlet/components |
| `cht-case1-dimensions-card.jpg` | 2D dims of graphics card (front + top) |
| `cht-case1-dimensions-enclosure.jpg` | Outer enclosure dims: 191 × 65 × 40.5 mm |
| `cht-case1-mesh-section.jpg` | Z-X cross-section mesh |
| `cht-case1-mesh-3d.jpg` | 3D mesh with body-size overrides |
| `cht-case1-mesh-3d-coarse.jpg` | 3D surface mesh (coarse view) |
| `cht-case1-residuals.jpg` | Residual plot — 500 iterations (Case 1) |
| `cht-case1-temp-global.jpg` | Global temperature contour 26.8–53.2°C |
| `cht-case1-temp-local-hotspot.jpg` | Local hotspot region 50.5–53.1°C |
| `cht-case1-temp-local-fins.jpg` | Fin temperature — alternate angle |
| `cht-case1-temp-zx-plane.jpg` | Z-X plane temperature slice |
| `cht-case1-temp-processor.jpg` | Processor-only temperature 52.3–53.1°C |
| `cht-case1-velocity-vectors.jpg` | Velocity vectors — 3 recirculation zones |
| `cht-case1-streamlines-2d.jpg` | 2D temperature streamlines |
| `cht-case1-streamlines-3d.jpg` | 3D temperature streamlines |
| `cht-case1-heat-flux.jpg` | Wall heat flux 15–2742 W/m² |
| `cht-case2-geometry-3d.jpg` | Case 2 — inner + outer enclosure geometry |
| `cht-case2-dimensions-inner.jpg` | Inner enclosure 2D dims (all in mm) |
| `cht-case2-mesh-3d.jpg` | Case 2 finer 3D mesh |
| `cht-case2-mesh-processor-zoom.jpg` | Zoomed processor mesh (0.4 mm) |
| `cht-case2-mesh-section.jpg` | Case 2 cross-section mesh |
| `cht-case2-residuals.jpg` | Residual plot — Case 2 |
| `cht-case2-temp-global.jpg` | Case 2 global temp 26.85–52.29°C |
| `cht-case2-temp-local-hotspot.jpg` | Case 2 local hotspot |
| `cht-case2-temp-local-fins.jpg` | Case 2 fin temperatures |
| `cht-case2-temp-zx-plane.jpg` | Case 2 Z-X plane temp |
| `cht-case2-temp-processor.jpg` | Case 2 processor temp 51.5–52.2°C |
| `cht-case2-velocity-vectors.jpg` | Case 2 velocity vectors (>3 zones) |
| `cht-case2-streamlines-3d.jpg` | Case 2 3D streamlines |
| `cht-case2-heat-flux.jpg` | Case 2 wall heat flux 3.6–4931 W/m² |
| `cht-comparison-table.jpg` | 3-case comparison table |

---

## 5. ANSYS / Simulation Studies Hub Page

**Route:** `/projects/ansys-simulation-studies`  
**MDX:** `src/content/projects/ansys-simulation-studies.mdx`

Structure:
1. "Why simulation?" — engineering philosophy section
2. **Project card** linking to CHT Analysis (with image, problem/result, tags)
3. "Coming soon" placeholder for future studies
4. Tools & Capabilities table (Fluent, Mechanical, Meshing, Flow Sim, Post-processing)

**To add future simulation projects:** Add another `<a href="/projects/new-slug">` card block in the hub MDX, create the new MDX in `src/content/projects/`, and register the slug in `[slug].astro` `portfolioOrder`.

---

## 6. Key Files & Their Roles

| File | Role |
|------|------|
| `src/data/portfolioCarousel.ts` | Single source of truth for all carousel card data |
| `src/components/WorkProjectsCarousel.tsx` | Shared carousel component used on index + slug pages |
| `src/components/ProjectCardCoverSlideshow.tsx` | Image slideshow — has `cover` prop (bool) for object-cover mode |
| `src/pages/projects/index.astro` | Projects index — uses `allProjectsCarouselProjects` + `cadCarouselProjects` |
| `src/pages/projects/[slug].astro` | Project detail pages — `portfolioOrder` array controls which slugs get pages |
| `src/layouts/BaseLayout.astro` | Lenis smooth scroll — instance exposed as `window.__lenis` |

---

## 7. Scroll Lock (Lenis)

Carousel scroll-lock works via two mechanisms:
1. `e.preventDefault()` on the `wheel` event (non-passive listener) — stops native scroll
2. `getLenis()?.stop?.()` / `start?.()` on `mouseenter`/`mouseleave` — stops Lenis smooth scroll
3. The wheel listener only activates when `event.composedPath()` includes `[data-carousel-card]`

If scroll lock breaks, check: `console.log(window.__lenis)` on the /projects page to verify the Lenis instance is present.

---

## 8. Blurred Images (Proprietary Content)

| File | What's blurred | Region (x,y,w,h) | Sigma |
|------|---------------|-------------------|-------|
| `Final-press-fixture-blurred.jpeg` | Center chuck/collet | 340,770,430,430 | 12 |
| `Concept 3_pneumatic with optimized parts_blurred.png` | Center holder piece | 185,320,190,190 | 10 |

Referenced in `press-test-fixture.mdx`, `projects/index.astro` (coverSlides), `[slug].astro` (coverSlides).

### Sharp blur script (if more blurring needed)
```js
// blur-region.mjs
import sharp from 'sharp';
const INPUT  = 'public/images/ORIGINAL.png';
const OUTPUT = 'public/images/ORIGINAL_blurred.png';
const bx=185, by=320, bw=190, bh=190, sigma=10;
const img = sharp(INPUT);
const { width, height } = await img.metadata();
const blurredRegion = await sharp(INPUT).extract({left:bx,top:by,width:bw,height:bh}).blur(sigma).toBuffer();
await img.composite([{input:blurredRegion,left:bx,top:by}]).toFile(OUTPUT);
console.log('Done');
```
Run with: `node blur-region.mjs`

---

## 9. Project Slugs & Routing

```
portfolioOrder in [slug].astro:
1. thermal-redesign-journey       ← Work Project (carousel)
2. liv-optical-test-rig           ← Work Project (carousel)
3. press-test-fixture             ← Work Project (carousel)
4. connector-npi-smart-textiles   ← Work Project (carousel)
5. badge-reel-redesign            ← Personal Project (carousel)
6. btech-final-project            ← Undergrad Capstone (carousel)
7. earlier-engineering-projects   ← removed from carousel, page still exists
8. solidworks-personal-projects   ← CAD & Simulation
9. ansys-simulation-studies       ← CAD & Simulation (hub)
10. cht-analysis-gpu              ← sub-project of ANSYS hub
```

---

## 10. Pending / To Do

1. **Carousel image fix** — last session ended mid-work on the carousel card image (was exploring side-by-side vs stacked layout). The current component uses **image on top / content below** (stacked, matching ProjectCard). The `ProjectCardCoverSlideshow` component was given a `cover` (boolean) prop for `object-cover` mode — but the carousel now renders images directly with `<img className="h-full w-full object-contain object-center">` (object-contain, not cover). Depending on how photos look, may want to switch to `object-cover`.

2. **More simulation projects** — CHT Analysis is the first. Next studies can be added to the ANSYS hub page following the same pattern.

3. **Git commit/push** — All changes on disk, NOT committed. When ready:
   ```bash
   cd "C:/Users/yash1/Desktop/portfolio-starter-template-main - without-project-pics"
   git add src/ public/images/
   git commit -m "Apr 19: flat carousel, CHT analysis project, ANSYS hub, project structure cleanup"
   git push
   ```

---

## 11. Things Completed This Session (Don't Redo)

- Replaced 3D cylinder carousel with flat horizontal spotlight carousel
- Work Projects + Personal/Capstone merged into one "Projects" carousel
- Per-card eyebrow labels (Work Project / Personal Project / Undergrad Capstone)
- "Earlier Engineering Projects" removed from carousel
- "Other case studies" section heading removed
- CHT Analysis on GPU — full technical MDX built from Google Docs HTML export (33 images, 2 cases, comparison table, engineering insight callouts)
- ANSYS / Simulation Studies converted to a hub page with project cards
- CHT Analysis registered in routing and accessible via ANSYS hub
- `ProjectCardCoverSlideshow` given `cover` boolean prop for object-cover image mode
