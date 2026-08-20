import type { Metadata } from "next";
import { getPostData, getSortedPostsData, POSTS_PER_PAGE } from "@/lib/posts";
import { buildRss } from "@/lib/rss";
import { localePath, siteUrl, socialImage, type Locale } from "@/lib/site";

export type ArticleParams = { params: Promise<{ slug: string[] }> };

export async function getArticleMetadata(locale: Locale, { params }: ArticleParams): Promise<Metadata> {
  const { slug } = await params;
  const joined = slug.join("/");
  const post = await getPostData(locale, joined);
  const canonical = `${localePath(locale, "/news")}/${joined}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical,
      languages: {
        "ja-JP": `/news/${joined}`,
        "en-US": `/en/news/${joined}`,
      },
      types: {
        "application/rss+xml": localePath(locale, "/feed.xml"),
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `${siteUrl}${canonical}`,
      publishedTime: post.date.toISOString(),
      tags: post.tags,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [socialImage.url],
    },
  };
}

export function getPaginationStaticParams(locale: Locale) {
  const totalPages = Math.ceil(getSortedPostsData(locale).length / POSTS_PER_PAGE);
  if (totalPages <= 1) return [];
  return Array.from({ length: totalPages - 1 }, (_, index) => ({ page: String(index + 2) }));
}

export function createFeedResponse(locale: Locale) {
  return new Response(buildRss(locale), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
