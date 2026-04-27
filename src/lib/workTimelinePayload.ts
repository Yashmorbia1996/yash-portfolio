import type { CollectionEntry } from 'astro:content';
import type { WorkTimelineEntry } from '@/components/WorkExperienceTimeline';

/**
 * Plain `{ id, data }` objects for React islands. Raw `getCollection('work')` entries
 * carry Astro serialization metadata (`deferredRender`, etc.) that can hydrate as an
 * empty list, which hides the timeline while headings still render.
 */
export function workCollectionToTimelinePayload(
  entries: readonly CollectionEntry<'work'>[],
): WorkTimelineEntry[] {
  return entries.map((e) => ({
    id: e.id,
    data: {
      ...e.data,
      achievements: [...e.data.achievements],
    },
  }));
}
