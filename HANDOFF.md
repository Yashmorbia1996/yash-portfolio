# Portfolio Site, Handoff Document
**Last updated:** April 25, 2026 (refreshed against repo, Hero / Work Experience / `globals.css`)  
**For:** Next chat session  
**Owner:** Yash Morbia, Senior Mechanical Engineer | Medical Devices | Manufacturing Scale-up

---

## 1. Working Rules (CRITICAL)

- **ALL edits go to:** `C:\Users\yash1\Desktop\portfolio-starter-template-main - without-project-pics`
- **NEVER touch:** `C:\Users\yash1\Desktop\portfolio-starter-template-main` (the other folder)
- Dev server: `npm run dev` (or `pnpm dev`) → http://localhost:4321
- Stack: Astro 5 + MDX + React 19 + Tailwind v4
- Source images for SolidWorks/Udemy projects: `C:\Users\yash1\Desktop\Solidworks Udemy\`
- Old website HTML exports: `C:\Users\yash1\Desktop\portfolio-starter-template-main - without-project-pics\Old website data\`

---

## 2. Current Site Structure

### Nav Links
- Home → `/`
- Projects → `/projects`
- Operations → `/cross-functional-ownership`
- Certifications → `/certificates`

### Projects Page (`/projects`)

**Section 1, Work Projects carousel** (flat horizontal spotlight)
- Thermal Redesign Journey, Work Project
- LIV Optical Test Rig, Work Project
- Press Test Fixture, Work Project
- Yarn Connector NPI: Smart Textiles, Work Project
- Badge Reel Redesign, Personal Project
- B.Tech Final Project, Undergrad Capstone

**Section 2, CAD & Simulation carousel**
- ANSYS Simulation Studies (hub → CHT, T-junction, Flow over Cylinder, Ahmed Body)
- SolidWorks Flow Simulation Studies (hub → Catalytic Converter, Wind Tunnel)
- SolidWorks Personal Projects
- Individual sub-project pages also accessible via their hub

---

## 3. Project Slugs & Routing

```
portfolioOrder in src/pages/projects/[slug].astro:
 1. thermal-redesign-journey
 2. liv-optical-test-rig
 3. press-test-fixture
 4. connector-npi-smart-textiles
 5. badge-reel-redesign
 6. btech-final-project
 7. earlier-engineering-projects
 8. ansys-simulation-studies          ← isHubPage (no summary/tags/cover strip)
 9. solidworks-personal-projects
10. solidworks-simulation-studies      ← isHubPage
11. cht-analysis-gpu
12. t-junction-mixing-simulation
13. flow-over-cylinder-simulation
14. ahmed-body-simulation
15. catalytic-converter-flow-optimization
16. wind-tunnel-fan-simulation
```

**isHubPage slugs** (renders eyebrow + title + MDX only, no summary strip):
- `ansys-simulation-studies`
- `solidworks-simulation-studies`

**isJourneyCaseStudy slugs** (renders two-column summary + at-a-glance sidebar):
- `thermal-redesign-journey`, `liv-optical-test-rig`, `press-test-fixture`,
  `connector-npi-smart-textiles`, `badge-reel-redesign`, `btech-final-project`

All other slugs: standard layout with full-width cover image strip, summary, tags.

---

## 4. Key Files & Their Roles

| File | Role |
|------|------|
| `src/data/portfolioCarousel.ts` | Single source of truth for all carousel card data |
| `src/components/WorkProjectsCarousel.tsx` | Shared carousel, projects index + slug "More projects" row |
| `src/components/Hero.tsx` | Homepage hero section, profile card, metrics, animated background |
| `src/components/HomeWorkExperienceSection.tsx` | Homepage Work Experience, custom `<section id="home-work-experience">`; thermal/rainbow/CSS mesh + RAF; canvas sibling for wireframe |
| `src/pages/index.astro` | Homepage, native `<script>` bootstraps `#home-work-experience .we-mesh-canvas` only |
| `src/pages/projects/index.astro` | Projects index |
| `src/pages/projects/[slug].astro` | Project detail pages, `portfolioOrder` controls which slugs render |
| `src/pages/certificates.astro` | Certifications page, Professional Credentials + Course Completions |
| `src/styles/globals.css` | Global CSS, ALL theme variables, section backgrounds, card rules, orb CSS |
| `src/layouts/BaseLayout.astro` | Lenis smooth scroll exposed as `window.__lenis` |
| `scripts/pdf-to-png.mjs` | PDF → PNG using mupdf (for certificate thumbnails) |

---

## 5. portfolioCarousel.ts, Data Structure

Exports:
- `workCarouselProjects`, 4 work projects
- `academicPersonalCarouselProjects`, badge reel + btech
- `allProjectsCarouselProjects`, combined (section 1)
- `cadCarouselProjects`, ANSYS hub + SW Flow Simulation hub + SW Personal Projects
- `portfolioCarouselBySlug`, lookup map used by `[slug].astro` "More projects" row

**studyLinks field** (used by hub cards, renders linked study list instead of Problem/Action/Result):
```ts
studyLinks: [
  { label: 'Study Title', meta: 'Short descriptor', slug: 'the-slug' },
]
```
Applies to: `ansys-simulation-studies` and `solidworks-simulation-studies` entries.

---

## 6. Image Conventions

### Simulation images (SolidWorks / ANSYS projects)
All images use uniform containers, **3:2 aspect ratio, object-contain**, so nothing is cropped:
```html
<div class="flex items-center justify-center rounded-lg overflow-hidden bg-surface-elevated" style="aspect-ratio: 3/2;">
  <img src="/images/..." alt="..." class="max-h-full max-w-full object-contain" />
</div>
```
Add a caption below: `<p class="mt-2 text-xs text-text-muted text-center">Caption</p>`

### Two-column image grid (standard for comparisons)
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
  <div>...image container + caption...</div>
  <div>...image container + caption...</div>
</div>
```

### Cover images for project pages
- Cover image in MDX frontmatter: `cover: "/images/folder/filename.png"`
- Cover image in `[slug].astro` detail layout uses `object-cover` (fills the 16:9 strip)
- Cover image in `WorkProjectsCarousel.tsx` uses `object-contain object-center`
- Hub page cards in MDX use `object-contain` (not cover) to avoid cropping simulation geometry

---

## 7. Certifications Page

**Route:** `/certificates`  
**File:** `src/pages/certificates.astro`

### Professional Credentials (2-col grid)
- CSWA, `public/images/certificates/cswa.png` → links to same PNG
- CSWP, `public/images/certificates/cswp.png` → links to same PNG
- Container: `aspect-ratio: 4/3`, `bg-white`, `object-contain`

### Course Completions & Training (3-col grid)
- CFD, SolidWorks Flow Simulation, ANSYS & Optimization, Udemy
- GD&T Basics, Udemy
- ISO 13485:2016, Professional Training
- Container: `aspect-ratio: 16/9`, `object-cover object-top` (crops to show header, no white bottom gap)
- PNG thumbnails generated from PDFs via `scripts/pdf-to-png.mjs`

### To regenerate certificate PNGs (if PDFs change)
```bash
node scripts/pdf-to-png.mjs
```
Requires `mupdf` npm package. Outputs to `public/images/certificates/`.

---

## 8. SolidWorks Flow Simulation Studies Hub

**Route:** `/projects/solidworks-simulation-studies`  
**MDX:** `src/content/projects/solidworks-simulation-studies.mdx`  
**Cover (frontmatter + carousel):** `/images/catalytic-converter/case6-trajectories.png`

Hub cards link to two sub-projects:
1. Catalytic Converter: Flow Optimisation Study
2. Wind Tunnel Simulation: Fan Design & Thermal Flow Analysis

---

## 9. Catalytic Converter Project

**Route:** `/projects/catalytic-converter-flow-optimization`  
**Images:** `public/images/catalytic-converter/`, 36 images (6 cases × 6 image types)  
**Study summary:** 6-case parametric study, baseline → baffles → guided vanes. Final 8mm guided vane reduced uniformity ratio from 2.832 → 1.540 (45.6% improvement) and cut pressure drop 18.4%.

---

## 10. Wind Tunnel Fan Simulation Project

**Route:** `/projects/wind-tunnel-fan-simulation`  
**Images:** `public/images/wind-tunnel/`, 12 images  
**Study summary:** Fan designed from components, assembled, external flow simulated. Wind tunnel with flow straightener + diffuser. 50W heated fin. Fan speed 1000/800/200 rps, peak fin temp rises 17°C from fastest to slowest.

---

## 11. ANSYS Simulation Studies Hub

**Route:** `/projects/ansys-simulation-studies`  
Sub-projects: CHT GPU, T-Junction, Flow over Cylinder, Ahmed Body

---

## 12. Apple Design System, Light Mode (COMPLETED)

**All changes live in `src/styles/globals.css`.**

### Color Palette (`:root`)
```css
--background: #ffffff;           /* pure white */
--background-secondary: #f5f5f7; /* Apple gray */
--surface: #ffffff;
--surface-elevated: #f5f5f7;
--card-background: rgba(255,255,255,1);
--card-hover: #f0f0f2;
--border: rgba(0,0,0,0.08);
--border-strong: rgba(0,0,0,0.14);
--text-primary: #1d1d1f;         /* Apple dark */
--text-secondary: #424245;
--text-muted: #86868b;           /* Apple secondary gray */
--accent: #0071e3;               /* Apple blue */
--shadow-soft: 0 2px 8px rgba(0,0,0,0.06);
--shadow-elevated: 0 8px 28px rgba(0,0,0,0.09);
```

### Font Stack (`@theme`)
```css
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
             "Helvetica Neue", ui-sans-serif, system-ui, "DM Sans", sans-serif;
--letter-spacing-heading: -0.025em;  /* Apple-style tight tracking */
```

### Body
- Solid `background-color: var(--color-background)` (no full-page gradient).
- `-webkit-font-smoothing: antialiased`.

### Alternating section shells (homepage)
| Section | Light section fill | Cards (globals overrides) |
|---------|-------------------|---------------------------|
| Hero (`#introduction`) | `#ffffff` + absolute thermal/grid/orbs under content | Flat `#f5f5f7` panels (no glass), `#introduction .theme-panel` |
| Work Experience (`#home-work-experience`) | `#f5f5f7` via `.we-bg-base` + rainbow / CSS mesh / blurred orbs / canvas mesh | Solid `#ffffff` + soft shadow, `article.theme-panel` in `.work-experience-chain` |
| Capabilities (`#capabilities`) | Body white | Flat `#f5f5f7` skill cards, `#capabilities article.theme-panel` |
| My Journey (`#my-journey`) | `#f5f5f7` section bg | White milestone cards, `#my-journey .theme-panel` |

### Card Rules (light mode)
- **Rule A** (card on gray section → white card): `background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: none`
- **Rule B** (card on white section → gray card): `background: #f5f5f7; box-shadow: none; border: none`

---

## 13. Apple Design System, Dark Mode (COMPLETED)

### Color Palette (`.dark`)
```css
--background: #000000;           /* pure black */
--background-secondary: #1c1c1e; /* Apple elevated dark */
--surface: #1c1c1e;
--surface-elevated: #2c2c2e;
--card-background: rgba(28,28,30,1);
--card-hover: #2c2c2e;
--border: rgba(255,255,255,0.1);
--border-strong: rgba(255,255,255,0.18);
--text-primary: #f5f5f7;         /* Apple near-white */
--text-secondary: #aeaeb2;
--text-muted: #6e6e73;
--accent: #0a84ff;               /* Apple blue (dark) */
```

### Alternating Section Backgrounds (dark)
| Section | Dark BG | Card on top |
|---------|---------|-------------|
| Hero (`#introduction`) | `#000000` | `#1c1c1e` + `border: rgba(255,255,255,0.1)` |
| Work Experience | `#1c1c1e` via `.we-bg-base` | `#000000` + `border: rgba(255,255,255,0.1)` |
| Capabilities | `#000000` (body) | `#1c1c1e` + `border: rgba(255,255,255,0.1)` |
| My Journey | `#1c1c1e` | `#000000` + `border: rgba(255,255,255,0.1)` |

### ⚠️ Critical Dark Mode Bug (FIXED)
`#introduction { background-color: #ffffff }` had no dark mode guard, so in dark mode the hero section was white while text was `#f5f5f7`, making all text invisible.
**Fix:** Added `.dark #introduction { background-color: #000000 }` directly below.

---

## 14. Hero Section Background, Thermal Dynamics

**Files:** `src/components/Hero.tsx`, `src/styles/globals.css` (`/* Hero Thermal Dynamics Background */`).

### DOM (inside `<section id="introduction">`)
Background layers are **first children** (absolute, negative z-index), then `site-container` content.

```tsx
<div className="hero-bg-base" />                    // #ffffff (light) / #000000 (dark)
<div className="hero-interactive-grid" />           // faint dual-scale grid + radial mask
<div className="hero-thermal-orb hero-thermal-orb-1" />
<div className="hero-thermal-orb hero-thermal-orb-2" />
<div className="hero-thermal-orb hero-thermal-orb-3" />
```

### Interaction
- Single `requestAnimationFrame` loop in `useEffect`: reads `#introduction`, applies `transform` to each `.hero-thermal-orb`, and parallax to `.hero-interactive-grid`.
- `spring.current = { o1, o2, o3, tx, ty, live, grid }`, no React state on mouse move.
- `K = [0.016, 0.032, 0.048]`; `HOME` anchors per orb; `K_GRID = 0.042`, parallax caps ~26×20px.
- `prefers-reduced-motion: reduce` → no cursor tracking; orbs/grid ease to rest.

### Visual intent (current CSS)
- Light: **ultra-faint** slate / Apple-blue-tinted blurs (small-ish ellipses, heavy blur) on pure white, clinical, not “neon portfolio.”
- Dark: minimal blue/white mist so the hero stays **near-black** with readable light text.

### Hero cards (`#introduction .theme-panel`)
- **Flat Apple-style panels:** `#f5f5f7` on white (no backdrop blur). Dark: `#1c1c1e` with border + shadow.

---

## 15. Work Experience Section Background

**Files:** `src/components/HomeWorkExperienceSection.tsx`, `src/styles/globals.css` (`#home-work-experience …`), `src/pages/index.astro` (bottom `<script>` for canvas only).

`HomeWorkExperienceSection` **does not use** `layout/Section.tsx`; it renders `<section id="home-work-experience">` directly so backgrounds can sit **under** `site-container` (which has `relative z-[1]`).

### DOM / z-order (bottom → top)
```tsx
<div className="we-bg-base" />                     // z-index -2  #f5f5f7 (light) / #1c1c1e (dark)
<div className="we-rainbow-bloom" />               // z-index -2  conic thermal wash, soft-light
<div className="we-workflow-mesh" />               // z-index -2  CSS line grid + radial mask (~0.52 opacity light)
<div className="we-thermal-orb …" /> ×3            // z-index -1  faint slate / sky blurs
<canvas className="we-mesh-canvas" … />            // z-index 0   sine-displaced wireframe (native script)
<div className="site-container relative z-[1]">…   // timeline + headings
```

### React RAF (same `useEffect` as orbs)
- `spring.current` adds `rainbow` and `mesh` for **cursor-lagged** `translate3d` on `.we-rainbow-bloom` and `.we-workflow-mesh` (separate gains vs orbs).
- `prefers-reduced-motion: reduce` → same as Hero (no tracking).

### Canvas wireframe (`index.astro` script)
- **Not** driven by React, avoids island sizing/hydration races. `suppressHydrationWarning` on `<canvas>`.
- `startWorkMesh()`: `ResizeObserver` on section; 22×14 vertex grid; Y displacement from stacked sines; `t += 0.003` (~180s feel per cycle); skips entirely if `prefers-reduced-motion`.
- Styling: `#home-work-experience .we-mesh-canvas`, `position: absolute; inset: 0; z-index: 0`.

### Timeline cards (NIRA / Flex `article.theme-panel`)
- **Solid** white cards on gray section (Rule A): `#ffffff`, soft shadow, **not** glassmorphism in current CSS (`backdrop-filter: none`).

---

## 16. Carousel Component Notes

- Component: `src/components/WorkProjectsCarousel.tsx`
- Active card: centered, full opacity; adjacent: blurred + dimmed
- Wheel scroll on card navigates; `getLenis()?.stop/start()` on hover locks page scroll
- Images: `object-contain object-center` in `aspect-video` container
- Cover image in detail `[slug].astro`: `object-cover` (fills 16:9 strip)

---

## 17. CSS Conventions

**Adding new utility classes:** Add to the `@layer utilities { }` block in `globals.css`  
**Theme variables:** Defined in `:root { }` and `.dark { }` at top of globals.css  
**Key utility classes:**
- `theme-panel`, card background + border + shadow (base; overridden per-section)
- `theme-panel-hover`, transition + hover state
- `theme-eyebrow`, small uppercase label in accent color
- `theme-section-title`, section heading color + tight tracking

**Section-specific card overrides (in globals.css):**
- `#introduction .theme-panel` + `.dark #introduction .theme-panel`
- `#home-work-experience .work-experience-chain article.theme-panel` + dark variant
- `#capabilities article.theme-panel` + dark variant
- `#my-journey .theme-panel` + dark variant

---

## 18. Blurred Images (Proprietary Content)

| File | What's blurred | Region (x,y,w,h) | Sigma |
|------|---------------|-------------------|-------|
| `Final-press-fixture-blurred.jpeg` | Center chuck/collet | 340,770,430,430 | 12 |
| `Concept 3_pneumatic with optimized parts_blurred.png` | Center holder piece | 185,320,190,190 | 10 |

### Sharp blur script (if more blurring needed)
```js
// blur-region.mjs
import sharp from 'sharp';
const INPUT  = 'public/images/ORIGINAL.png';
const OUTPUT = 'public/images/ORIGINAL_blurred.png';
const bx=185, by=320, bw=190, bh=190, sigma=10;
const img = sharp(INPUT);
const blurredRegion = await sharp(INPUT).extract({left:bx,top:by,width:bw,height:bh}).blur(sigma).toBuffer();
await img.composite([{input:blurredRegion,left:bx,top:by}]).toFile(OUTPUT);
```
Run with: `node blur-region.mjs`

---

## 19. Git Status

Typical working tree includes **uncommitted** edits under `src/`, `public/images/`, MDX in `src/content/projects/`, and `HANDOFF.md`. When ready to commit, use selective `git add` so each commit stays reviewable.

```bash
cd "C:/Users/yash1/Desktop/portfolio-starter-template-main - without-project-pics"
git status
git add -p   # or explicit paths
git commit -m "Describe what changed in full sentences."
git push
```

---

## 20. Completed (all sessions)

- **Certifications page**, `/certificates` with Professional Credentials + Course Completions
- **PDF → PNG pipeline**, `scripts/pdf-to-png.mjs` using `mupdf`
- **SolidWorks Flow Simulation Studies hub**, mirrors ANSYS hub, `isHubPage` flag
- **Catalytic Converter study page**, 6-case parametric study, 36 images
- **Wind Tunnel Fan Simulation page**, fan CAD + thermal flow study, 12 images
- **Hero, thermal + grid**, three blurred orbs + `.hero-interactive-grid`, RAF spring tracking + `prefers-reduced-motion`, flat `#f5f5f7` hero cards on white
- **Work Experience, layered background**, `.we-bg-base`, `.we-rainbow-bloom` (conic thermal wash), `.we-workflow-mesh` (CSS grid), three `.we-thermal-orb` blurs, RAF parallax for rainbow/mesh/orbs, **native canvas** wireframe in `index.astro` + `suppressHydrationWarning` on canvas
- **Apple-style light/dark tokens**, `:root` / `.dark` in `globals.css`; SF Pro-leaning system stack with DM Sans fallback; alternating homepage sections; **Rule A / Rule B** card treatments per section (`#introduction`, `#home-work-experience`, `#capabilities`, `#my-journey`)
- **Dark hero legibility**, explicit `.dark #introduction` / `.dark .hero-bg-base` so hero is not stuck on white behind light text

---

## 21. Pending / Next Steps

1. **CHT Electronics Cooling Study**, fully researched this session, NOT YET BUILT. See Section 22 for full details and exact instructions.
2. **LIV Optical Test Rig, image swap**, user requested specific image replacements, NOT YET DONE. See Section 23.
3. **Git commit and push**, large batch of assets + MDX + style work still uncommitted.
4. **Hero thermal orb animation**, RAF loop finds elements but transforms stay `""`. Plan: expose `spring.current` as `window.__heroSpring`, remove RAF from `useEffect`, add native script to `index.astro` (same pattern as canvas).
5. **More ANSYS studies**, add to hub

---

## 22. CHT Electronics Cooling Study, READY TO BUILD

This project was fully researched this session. Everything below is what the next session needs to build the page.

### What it is
An 8-case SolidWorks Flow Simulation conjugate heat transfer (CHT) study of an electronics enclosure. Goal: keep the main chip and power block below thermal limits through fan configuration and heat sink optimisation.

### Source files
- **Report:** `Old website data/CHT_Electronics_Solidworks/CHT_Electronics_CHT_Simulation_Report.docx`
- **Images root:** `Old website data/CHT_Electronics_Solidworks/`
- **51 PNG images** across 8 case folders (see image map below)

### Target slug
`cht-electronics-cooling`, lives under the SolidWorks Flow Simulation hub

### What needs to be done (in order)
1. **Copy images** from `Old website data/CHT_Electronics_Solidworks/Case*/` → `public/images/cht-electronics/` (flatten into one folder, keep filenames as-is)
2. **Create MDX** at `src/content/projects/cht-electronics-cooling.mdx` (see content plan below)
3. **Add slug to `portfolioOrder`** in `src/pages/projects/[slug].astro`, append `'cht-electronics-cooling'` after `wind-tunnel-fan-simulation` (position 17)
4. **Add `studyLinks` entry** to `solidworks-simulation-studies` card in `src/data/portfolioCarousel.ts`:
   ```ts
   { label: 'CHT: Electronics Enclosure Cooling', meta: '8-case · Fan config · Heat sink optimisation', slug: 'cht-electronics-cooling' }
   ```
5. **Add card to hub MDX** `src/content/projects/solidworks-simulation-studies.mdx`, add a third `<a href="/projects/cht-electronics-cooling">` card block after the wind tunnel card, matching the same HTML pattern. Use cover image `case08_cross_fan_geometry.png`. Remove the "Coming soon" placeholder block.

### Study summary for MDX
**Title:** CHT: Electronics Enclosure Cooling Optimisation  
**Tagline:** 8-case SolidWorks Flow Simulation study, fan placement, heat sink design, and airflow routing to cool a 25 W main chip and 10 W power block below 85 °C.

**Simulation setup:**
- Internal CHT, solid conduction + forced convection coupled
- Air at 25 °C ambient, 101 325 Pa
- Fan: Sunon GM0535PFV1-8 (35 mm class) from SW fan database
- Heat sink: Al 6061 → later optimised (50×50 mm, 40 mm tall, 14 fins, 1 mm thick, 3.3 mm gaps)
- Heat loads: 25 W main chip / 10 W power block (stress cases); 10 W / 5 W (early cases)
- Outer walls: 5 W/m²·K convection to 25 °C ambient

**Case matrix (key data):**
| Case | Config | Chip (°C) | Power Block (°C) | Decision |
|------|--------|-----------|-----------------|----------|
| 01 | External inlet fan, baseline | 57.39 | 48.95 | Reference |
| 02 | External inlet fan + reducer shroud | 48.33 | 51.11 | Good chip cooling, packaging tradeoff |
| 03 | External outlet fan | 118.78 | 75.14 | **Rejected**, poor heat sink cooling |
| 04 | Internal fan (10 W) | 50.87 | 41.72 | Selected fan approach |
| 04B | Internal fan stress (25 W) | 99.80 | 65.15 | Too hot, needs heat sink upgrade |
| 05 | Internal fan + upper vent (25 W) | 84.37 | 55.25 | Thermally OK, rejected, dust risk |
| 06 | Internal fan + rear exhaust fan | 95.40 | 58.48 | **Rejected**, worsened chip cooling |
| 07 | Optimised aluminium heat sink | 50.89 | 84.10 | Chip fixed, power block now limiting |
| 08 | Optimised HS + cross-flow inlet fan | **61.07** | **59.96** | **Selected final design** |

**Final result:** Case 08, optimised Al heat sink (50×50×40 mm, 14 fins) + side-mounted cross-flow external inlet fan. Both components below 85 °C target. Key insight: airflow must reach the RIGHT thermal region, not just increase total flow.

**Narrative arc for the page (keep concise):**
1. Baseline + shroud (Cases 01-02): establish reference, show shroud benefit
2. Fan placement comparison (Cases 03-04): outlet fan fails badly; internal fan selected
3. Stress test + venting (Cases 04B-05): 25 W load exposed inadequacy; top vent helps but opens dust path
4. Rear exhaust failure (Case 06): extra fan made chip worse, airflow routing matters
5. Heat sink optimisation (Case 07): chip solved, power block became new bottleneck
6. Final balanced design (Case 08): cross-flow fan solves power block, both targets met

### Image map (source filename → public path after copy)
All go to `public/images/cht-electronics/<filename>`. Pick the most visual per case for the page (temperature cut + flow trajectories are the most readable).

**Case 01:** `case01_baseline_geometry.png`, `case01_baseline_temperature_cut.png`, `case01_baseline_flow_trajectories.png`  
**Case 02:** `case02_reducer_shroud_geometry.png`, `case02_reducer_shroud_temperature_cut.png`  
**Case 03:** `case03_geometry.png`, `case03_external_outlet_fan_temperature_cut.png`  
**Case 04:** `case04_internal_fan_temperature_cut.png`, `case04_internal_fan_flow_trajectories.png`  
**Case 04B:** `case04b_internal_fan_25Wchip_10Wpower_goal_table.png`  
**Case 05:** `case05_internal_fan_Upper_vent_temperature_cut.png`  
**Case 06:** `case06_internal_fan_rear_exhaust_temperature_cut.png`, `case06_internal_fan_rear_exhaust_flow_trajectories.png`  
**Case 07:** `case07_optimized_al_hs_temperature_cut.png`, `case07_optimized_al_hs_flow_trajectories.png`  
**Case 08 (cover + hero):** `case08_cross_fan_geometry.png`, `case08_cross_fan_temperature_cut.png`, `case08_cross_fan_flow_trajectories.png`, `case08_cross_fan_goal_table.png`

Use `case08_cross_fan_geometry.png` as the MDX `cover:` frontmatter image.

### Tags
`["SolidWorks Flow Simulation", "CHT", "Electronics Cooling", "Forced Convection", "Heat Sink", "Parametric Study", "Thermal Management"]`

---

## 23. LIV Optical Test Rig, Image Swap (PENDING)

User requested two specific image replacements inside the LIV Optical Test Rig project page. NOT YET DONE, session ended before the edit was made.

- **File:** `src/content/projects/liv-optical-test-rig.mdx`
- **Image 1 (Fixture 1):** Replace with `public/images/LIV test.png` → reference as `/images/LIV test.png`
- **Image 2 (Fixture 2):** Replace with `public/images/Optical test.png` → reference as `/images/Optical test.png`

**What to do:** Open `liv-optical-test-rig.mdx`, find the two existing fixture image `<img src=...>` tags (search for "fixture" in the file), and swap the `src` values to the paths above. The image containers and captions stay as-is.
