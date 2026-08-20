import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "@/lib/i18n";
import { getPostData } from "@/lib/posts";
import { formatDate, localePath, type Locale } from "@/lib/site";

export async function NewsArticlePage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getTranslations(locale);
  let post;
  try {
    post = await getPostData(locale, slug);
  } catch {
    notFound();
  }

  return (
    <main className="article-main">
      <Link className="back-link" href={localePath(locale, "/news")}>
        ← {t.news.allNews}
      </Link>
      <article>
        <header className="article-header">
          <p className="page-section-name">News</p>
          <h1>{post.title}</h1>
          <time dateTime={post.date.toISOString()}>{formatDate(post.date, locale)}</time>
          {post.tags.length > 0 && (
            <ul className="tag-list" aria-label={t.common.tags}>
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`${localePath(locale, "/news/tags")}/${encodeURIComponent(tag)}`}>#{tag}</Link>
                </li>
              ))}
            </ul>
          )}
        </header>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
