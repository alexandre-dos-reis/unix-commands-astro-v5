import { z, defineCollection } from "astro:content";

const commandCollection = defineCollection({
  schema: z.object({
    sort: z.number().optional(),
    title: z.string(),
  }),
});

export const collections = {
  commands: commandCollection,
};
