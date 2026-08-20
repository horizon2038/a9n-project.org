import Link from "next/link";
import { NewsList } from "@/components/NewsList";
import { getTranslations } from "@/lib/i18n";
import { getPostsByTag } from "@/lib/posts";
import { localePath, type Locale } from "@/lib/site";

export function TagPage({ locale, tag }: { locale: Locale; tag: string }) {
  const t = getTranslations(locale).news;

  return (
    <main className="page-main">
      <header className="page-header page-header-simple">
        <div>
          <p className="page-section-name">News</p>
          <h1>#{tag}</h1>
        </div>
        <Link className="plain-link" href={localePath(locale, "/news")}>
          {t.allNews}
        </Link>
      </header>
      <NewsList locale={locale} posts={getPostsByTag(locale, tag)} />
    </main>
  );
}
