import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { defineCollection, defineConfig, s } from "velite";

const kits = defineCollection({
  name: "Kit",
  pattern: "kits/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug("kits"),
      status: s.enum(["experimental", "stable", "deprecated"]),
      summary: s.string().max(500),
      tags: s.array(s.string()),
      lastUpdated: s.isodate(),
      reference: s.object({
        type: s.enum(["repo", "docs"]),
        url: s.string().url(),
      }),
      category: s.enum(["sdk", "runtime", "testing", "docs", "ai", "other"]),
      featured: s.boolean().optional(),
      body: s.mdx(),
    })
    .transform((doc: any) => ({
      ...doc,
      url: `/kits/${doc.slug}`,
      order: (() => {
        const match = doc.raw?.match(/^(\d+)\./);
        return match ? parseInt(match[1], 10) : 999;
      })(),
    })),
});

const tools = defineCollection({
  name: "Tool",
  pattern: "tools/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug("tools"),
      status: s.enum(["experimental", "stable", "deprecated"]),
      summary: s.string().max(500),
      tags: s.array(s.string()),
      lastUpdated: s.isodate(),
      reference: s.object({
        type: s.enum(["repo", "docs"]),
        url: s.string().url(),
      }),
      builtOn: s.array(s.string()),
      featured: s.boolean().optional(),
      body: s.mdx(),
    })
    .transform((doc: any) => {
      return {
        ...doc,
        url: `/tools/${doc.slug}`,
        order: (() => {
          const match = doc.raw?.match(/^(\d+)\./);
          return match ? parseInt(match[1], 10) : 999;
        })(),
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { kits, tools },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark-dimmed",
          keepBackground: true,
        },
      ],
    ],
  },
});
