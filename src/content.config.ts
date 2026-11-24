import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const copy = z.object({
  title: z.string().min(1),
  problem: z.string().min(1),
  data: z.string().min(1),
  method: z.string().min(1),
  result: z.string().min(1),
  limits: z.string().min(1),
});

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/projects' }),
    schema: z.object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      category: z.enum(['bi', 'ml', 'nlp', 'dl']),
      tools: z.array(z.string().min(1)).nonempty(),
      github: z.string().url().startsWith('https://github.com/').nullable(),
      tr: copy,
      en: copy,
    }),
  }),
};
