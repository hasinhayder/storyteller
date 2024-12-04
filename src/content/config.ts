import { defineCollection, z } from 'astro:content';
const posts = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        // description: z.string(),
        // Transform string to Date object
        date: z.coerce.date(),
        // updatedDate: z.coerce.date().optional(),
        // heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featuredImage: z.string().optional(),
    }),
})

export const collections = { posts }