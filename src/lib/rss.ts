import { getSortedPostsData } from "@/lib/posts";
import { getTranslations } from "@/lib/i18n";
import { localePath, siteUrl, type Locale } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildRss(locale: Locale): string {
  const posts = getSortedPostsData(locale);
  const newsPath = localePath(locale, "/news");
  const feedPath = localePath(locale, "/feed.xml");
  const lastBuildDate = posts[0]?.date ?? new Date("2026-08-19T00:00:00+09:00");
  const description = getTranslations(locale).news.rssDescription;

  const items = posts
    .slice(0, 20)
    .map((post) => {
      const postUrl = `${siteUrl}${newsPath}/${post.slug}`;
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${postUrl}</link>
  <guid>${postUrl}</guid>
  <pubDate>${post.date.toUTCString()}</pubDate>
  <description>${escapeXml(post.summary)}</description>
  ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n  ")}
</item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>A9N Project News</title>
  <link>${siteUrl}${newsPath}</link>
  <description>${description}</description>
  <language>${locale}</language>
  <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}${feedPath}" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;
}
