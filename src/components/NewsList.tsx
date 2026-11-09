import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getTranslations } from "@/lib/i18n";
import { formatDate, localePath, type Locale } from "@/lib/site";

export function NewsList({ posts, locale, headingLevel = 2 }: { posts: PostMeta[]; locale: Locale; headingLevel?: 2 | 3 }) {
  const t = getTranslations(locale);
  const Heading = headingLevel === 3 ? "h3" : "h2";

  if (posts.length === 0) {
    return <p className="empty-message">{t.news.empty}</p>;
  }

  return (
    <div className="news-list">
      {posts.map((post) => (
        <article className="news-entry" key={post.slug}>
          <time dateTime={post.date.toISOString()}>{formatDate(post.date, locale)}</time>
          <div>
            <Heading>
              <Link href={localePath(locale, `/news/${post.slug}`)}>{post.title}</Link>
            </Heading>
            {post.summary && <p>{post.summary}</p>}
            {post.tags.length > 0 && (
              <ul className="tag-list" aria-label={t.common.tags}>
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={localePath(locale, `/news/tags/${encodeURIComponent(tag)}`)}>#{tag}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
