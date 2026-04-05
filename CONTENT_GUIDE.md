# Content Guide

This guide explains how to update your portfolio without touching any code.

---

## 1. Personal Info & Config

Edit `src/config/site.ts` to update your name, role, bio, social links, and navigation.

```ts
export const siteConfig = {
  name: "Your Name",
  role: "Your Role / Title",
  bio: "Your bio...",
  // ...
};
```

---

## 2. Projects

Projects live in `src/content/projects/`. Each `.mdx` file is one project.

**Required frontmatter:**

```yaml
---
title: "Project Title"
summary: "One or two sentences describing the project. Max 300 chars."
date: 2024-06-01          # Publication/completion date
featured: true            # Show on home page (true/false)
cover: "/images/projects/my-project.jpg"
tags: ["React", "TypeScript"]
liveUrl: "https://..."    # Optional: link to live version
repoUrl: "https://..."    # Optional: link to GitHub repo
---
```

The body of the file is rendered as the case study content (supports full Markdown + MDX).

---

## 3. Blog Posts

Blog posts live in `src/content/blog/`. Each `.mdx` file is one post.

**Required frontmatter:**

```yaml
---
title: "Post Title"
summary: "One or two sentences. Max 300 chars."
date: 2025-03-15
tags: ["Astro", "Tutorial"]
featured: false           # Show as featured post (true/false)
cover: "/images/blog/my-post.jpg"  # Optional
---
```

---

## 4. Work Experience

Work entries live in `src/content/work/`. Each `.mdx` file is one job.

**Required frontmatter:**

```yaml
---
company: "Company Name"
role: "Your Job Title"
startDate: "Jan 2023"
endDate: "Dec 2024"       # Omit if current
current: false            # Set to true if this is your current job
description: "One sentence about your role."
achievements:
  - "Achievement one with numbers if possible"
  - "Achievement two"
order: 1                  # Controls display order (1 = first/most recent)
---
```

---

## 5. Images

Place images in `public/images/`:

- `public/images/avatar.jpg` — your profile photo (shown on home + about)
- `public/images/projects/` — project cover images
- `public/images/blog/` — blog post cover images

Recommended sizes:
- Avatar: 400×400px (square)
- Project/blog covers: 1200×675px (16:9)

---

## 6. Updating the Site URL

When you deploy, update the `site` field in `astro.config.mjs` and `siteConfig.url` in `src/config/site.ts` to your actual URL.

---

## 7. Dark / Light Mode

The theme toggle in the header lets visitors switch between light and dark mode. Their preference is saved to localStorage. No configuration needed.
