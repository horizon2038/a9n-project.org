import Link from "next/link";
import { A9NBrand } from "@/components/A9NBrand";
import { NewsList } from "@/components/NewsList";
import { getTranslations } from "@/lib/i18n";
import { getSortedPostsData } from "@/lib/posts";
import { localePath, type Locale } from "@/lib/site";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).home;
  const latestPosts = getSortedPostsData(locale).slice(0, 3);

  return (
    <main>
      <section className="home-intro">
        <div className="content-width">
          <h1 className="home-brand">
            <A9NBrand variant="lockup" priority />
          </h1>
          <p className="home-summary">
            {t.summary}
          </p>
          <div className="link-group">
            <Link className="button-link" href={localePath(locale, "/about")}>
              {t.aboutLink}
            </Link>
            <Link className="button-link button-link-secondary" href={localePath(locale, "/projects")}>
              Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section content-width">
        <div className="section-heading-row">
          <div>
            <p className="section-name">Overview</p>
            <h2>{t.overviewTitle}</h2>
          </div>
          <Link className="plain-link" href={localePath(locale, "/about")}>
            {t.overviewLink}
          </Link>
        </div>
        <div className="text-columns">
          {t.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="overview-links">
          <Link href={localePath(locale, "/projects")}>
            <span>Projects</span>
            <span>{t.projectLinkDescription}</span>
          </Link>
          <Link href={localePath(locale, "/documents")}>
            <span>Documents</span>
            <span>{t.documentsLinkDescription}</span>
          </Link>
        </div>
      </section>

      <section className="home-section home-section-bordered">
        <div className="content-width">
          <div className="section-heading-row">
            <div>
              <p className="section-name">News</p>
              <h2>{t.newsTitle}</h2>
            </div>
            <Link className="plain-link" href={localePath(locale, "/news")}>
              {t.allNews}
            </Link>
          </div>
          <NewsList locale={locale} posts={latestPosts} />
        </div>
      </section>

      <section className="home-section content-width home-start">
        <div className="start-row">
          <div>
            <p className="section-name">Getting Started</p>
            <h2>{t.startTitle}</h2>
            <p>{t.startDescription}</p>
          </div>
          <Link className="button-link" href={localePath(locale, "/getting-started")}>
            Getting Started
          </Link>
        </div>
      </section>
    </main>
  );
}
