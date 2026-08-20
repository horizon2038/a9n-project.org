import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { globSync } from "glob";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export const POSTS_PER_PAGE = 12;

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: Date;
  tags: string[];
  summary: string;
};

export type PostData = PostMeta & {
  contentHtml: string;
};

type FrontMatter = {
  title: string;
  date: string | Date;
  tags?: string[];
  summary?: string;
};

function readFrontMatter(filePath: string, localeRoot: string): PostMeta {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const parsed = matter(fileContents);
  const data = parsed.data as FrontMatter;

  if (!data.title || !data.date) {
    throw new Error(`Post is missing title or date: ${filePath}`);
  }

  return {
    slug: path.relative(localeRoot, filePath).replace(/\.md$/, "").split(path.sep).join("/"),
    title: data.title,
    date: data.date instanceof Date ? data.date : new Date(data.date),
    tags: data.tags ?? [],
    summary: data.summary ?? "",
  };
}

export function getSortedPostsData(locale: Locale): PostMeta[] {
  const localeRoot = path.join(postsDirectory, locale);
  const filePaths = globSync(path.join(localeRoot, "**/*.md"));

  return filePaths
    .map((filePath) => readFrontMatter(filePath, localeRoot))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getPostData(locale: Locale, slug: string): Promise<PostData> {
  if (!/^[a-zA-Z0-9_/-]+$/.test(slug)) {
    throw new Error("Invalid post slug");
  }

  const localeRoot = path.resolve(postsDirectory, locale);
  const fullPath = path.resolve(localeRoot, `${slug}.md`);

  if (!fullPath.startsWith(`${localeRoot}${path.sep}`) || !fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(fileContents);
  const processedContent = await remark()
    .use(remarkToc, { heading: getTranslations(locale).news.toc, maxDepth: 3 })
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(parsed.content);

  const metadata = readFrontMatter(fullPath, localeRoot);
  return {
    ...metadata,
    contentHtml: processedContent.toString(),
  };
}

export function getAllTags(locale: Locale): string[] {
  return Array.from(new Set(getSortedPostsData(locale).flatMap((post) => post.tags))).sort();
}

export function getPostsByTag(locale: Locale, tag: string): PostMeta[] {
  return getSortedPostsData(locale).filter((post) => post.tags.includes(tag));
}
