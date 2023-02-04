import { CollectionEntry, getCollection } from "astro:content";

const sort = (a: CollectionEntry<"commands">, b: CollectionEntry<"commands">) =>
  (a.data.sort || 1) - (b.data.sort || 2);

export const getSubCommands = async () => {
  return (await getCollection("commands", (c) => c.slug.includes("/"))).sort(
    sort
  );
};

export const getTopCommands = async () => {
  return (await getCollection("commands", (c) => !c.slug.includes("/"))).sort(
    sort
  );
};
