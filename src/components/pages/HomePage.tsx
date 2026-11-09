import Link from "next/link";
import Image from "next/image";
import { A9NBrand } from "@/components/A9NBrand";
import { NewsList } from "@/components/NewsList";
import { ProjectList } from "@/components/ProjectList";
import { getTranslations } from "@/lib/i18n";
import { getSortedPostsData } from "@/lib/posts";
import { getProject } from "@/lib/projects";
import { localePath, type Locale } from "@/lib/site";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).home;
  const latestPosts = getSortedPostsData(locale).slice(0, 3);
  const screenshot = getProject("nanami", locale)!.screenshots[0];

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-intro">
        <div className="content-width home-intro-layout">
          <div>
            <h1 className="home-brand">
              <A9NBrand variant="horizontal" priority />
            </h1>
            <p className="home-summary">{t.summary}</p>
            <div className="link-group">
              <Link className="button-link" href={localePath(locale, "/getting-started")}>
                {t.startLink}
              </Link>
              <Link className="button-link button-link-secondary" href={localePath(locale, "/about")}>
                {t.aboutLink}
              </Link>
            </div>
          </div>
          <figure className="home-preview">
            <Link href={localePath(locale, "/projects/nanami")}>
              <Image
                src={screenshot.src}
                width={screenshot.width}
                height={screenshot.height}
                sizes="(max-width: 900px) calc(100vw - 48px), 540px"
                alt={screenshot.alt}
                priority
              />
            </Link>
            <figcaption>
              <span>{t.previewCaption}</span>
              <Link href={localePath(locale, "/projects/nanami")}>{t.previewLink} →</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="home-section content-width">
        <div className="section-heading-row">
          <h2>{t.overviewTitle}</h2>
          <Link className="plain-link" href={localePath(locale, "/projects")}>
            {t.overviewLink} →
          </Link>
        </div>
        <ProjectList locale={locale} slugs={["a9n", "nanami", "spencer"]} />
      </section>

      <section className="home-section home-news">
        <div className="content-width">
          <div className="section-heading-row">
            <h2>{t.newsTitle}</h2>
            <Link className="plain-link" href={localePath(locale, "/news")}>
              {t.allNews} →
            </Link>
          </div>
          <NewsList locale={locale} posts={latestPosts} headingLevel={3} />
        </div>
      </section>

    </main>
  );
}
