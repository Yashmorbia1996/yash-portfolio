import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(300),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    cover: z.string(),
    tags: z.array(z.string()).min(1),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    duration: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(300),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    description: z.string(),
    achievements: z.array(z.string()),
    order: z.number().default(0),
    location: z.string().optional(),
    /** Hero image for timeline card (e.g. /images/projects/…) */
    coverImage: z.string().optional(),
    /** 1–2 characters shown in the selector + timeline node */
    brandInitial: z.string().optional(),
    /** Optional hex for logo chip background */
    brandColor: z.string().optional(),
  }),
});

export const collections = { projects, blog, work };
