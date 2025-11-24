import { defineCollection, defineConfig } from "@content-collections/core";

export const allPosts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
  }),
});

export default defineConfig({
  collections: [allPosts],
});
