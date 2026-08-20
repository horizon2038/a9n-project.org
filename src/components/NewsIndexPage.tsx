import Link from "next/link";
import { NewsList } from "@/components/NewsList";
import { NewsPagination } from "@/components/NewsPagination";
import { getTranslations } from "@/lib/i18n";
import { getAllTags, getSortedPostsData, POSTS_PER_PAGE } from "@/lib/posts";
import { localePath, type Locale } from "@/lib/site";

export function NewsIndexPage({ locale, page = 1 }: { locale: Locale; page?: number }) {
  const allPosts = getSortedPostsData(locale);
  const t = getTranslations(locale).news;
  const tags = getAllTags(locale);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <main className="page-main">
      <header className="page-header">
        <div>
          <p className="page-section-name">News</p>
          <h1>{t.title}</h1>
          <p>{t.introduction}</p>
        </div>
        <a className="plain-link" href={localePath(locale, "/feed.xml")}>
          RSS Feed
        </a>
      </header>

      {tags.length > 0 && (
        <nav className="tag-nav" aria-label={t.allTags}>
          <span>{t.tags}</span>
          {tags.map((tag) => (
            <Link href={`${localePath(locale, "/news/tags")}/${encodeURIComponent(tag)}`} key={tag}>
              #{tag}
            </Link>
          ))}
        </nav>
      )}

      <NewsList locale={locale} posts={posts} />
      <NewsPagination locale={locale} currentPage={page} totalPages={totalPages} />
    </main>
  );
}
