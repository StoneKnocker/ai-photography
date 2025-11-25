import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

export const allPosts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    date: z.string(),
  })
});

export default defineConfig({
  collections: [allPosts],
});
