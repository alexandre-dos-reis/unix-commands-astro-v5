import { z, defineCollection } from "astro:content";

const commandCollection = defineCollection({
  schema: z.object({
    sort: z.number().optional(),
    title: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  commands: commandCollection,
};
