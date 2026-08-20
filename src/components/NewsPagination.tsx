import Link from "next/link";
import { getTranslations } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/site";

export function NewsPagination({
  locale,
  currentPage,
  totalPages,
}: {
  locale: Locale;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const base = localePath(locale, "/news");
  const t = getTranslations(locale).news;
  const hrefFor = (page: number) => (page === 1 ? base : `${base}/page/${page}`);

  return (
    <nav className="pagination" aria-label={t.pages}>
      {currentPage > 1 ? (
        <Link href={hrefFor(currentPage - 1)}>{t.previous}</Link>
      ) : (
        <span />
      )}
      <span>
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link href={hrefFor(currentPage + 1)}>{t.next}</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
