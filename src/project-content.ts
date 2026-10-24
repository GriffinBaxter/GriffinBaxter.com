import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { z } from "zod";
import type { PostDetails } from "./models";
import { uploadThingUrl } from "./images";
import { rawHtmlDivider } from "./components/divider";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export interface ProjectPost {
  project: PostDetails;
  html: string;
  gallery: string[];
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  date: z
    .union([z.string(), z.date()])
    .refine(
      (date) =>
        !Number.isNaN(date instanceof Date ? date.getTime() : Date.parse(date)),
      "Expected a valid date",
    )
    .transform((date) =>
      date instanceof Date ? date.toISOString() : new Date(date).toISOString(),
    ),
  featuredImage: z.string().min(1),
  categories: z.array(
    z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
    }),
  ),
  gallery: z.array(z.string().min(1)).default([]),
});

interface ContentEntry {
  project: PostDetails;
  content: string;
  gallery: string[];
}

function createMarkedParser() {
  const instance = new Marked();

  instance.use({
    renderer: {
      link(
        this: { parser: { parseInline: (tokens: Tokens.Generic[]) => string } },
        token: Tokens.Link,
      ) {
        const text = this.parser.parseInline(token.tokens);
        return `<a class="wrap-break-word underline text-blue-600 hover:text-blue-800" target="_blank" rel="noreferrer noopener" href="${token.href}">${text}</a>`;
      },
      image(token: Tokens.Image) {
        const rawSrc = token.href;
        const fileId = rawSrc.startsWith("ut:") ? rawSrc.slice(3) : rawSrc;
        const src = rawSrc.startsWith("ut:") ? uploadThingUrl(fileId) : rawSrc;
        return `<img src="${src}" alt="${token.text || "Post Image"}" />`;
      },
      hr() {
        return rawHtmlDivider;
      },
    },
  });

  return instance;
}

const markdownParser = createMarkedParser();

export function renderMarkdown(markdown: string): string {
  return markdownParser.parse(markdown) as string;
}

let cachedContent: ContentEntry[] | null = null;

function getContent(): ContentEntry[] {
  if (cachedContent) return cachedContent;
  if (!fs.existsSync(CONTENT_DIR)) return [];

  cachedContent = fs
    .readdirSync(CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data, content } = matter(
        fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8"),
      );
      const result = frontmatterSchema.safeParse(data);

      if (!result.success) {
        const issues = result.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ");
        throw new Error(`Invalid frontmatter in ${fileName}: ${issues}`);
      }

      const { gallery, ...metadata } = result.data;
      return {
        project: { slug, ...metadata },
        content,
        gallery,
      };
    })
    .sort((a, b) => Date.parse(b.project.date) - Date.parse(a.project.date));

  return cachedContent;
}

export function getAllProjects(): PostDetails[] {
  return getContent().map(({ project }) => project);
}

export function getProjectSlugs(): string[] {
  return getContent().map(({ project }) => project.slug);
}

export function getProject(slug: string): ProjectPost | null {
  const entry = getContent().find(({ project }) => project.slug === slug);
  if (!entry) return null;

  return {
    project: entry.project,
    html: renderMarkdown(entry.content),
    gallery: entry.gallery,
  };
}
