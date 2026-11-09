import { GitHubIcon } from "@/components/GitHubIcon";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export function DonatePage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).donate;

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <header className="page-header">
        <div>
          <h1>{t.title}</h1>
        </div>
      </header>

      <section className="document-section donate-support">
        <a
          className="button-link github-link"
          href="https://github.com/sponsors/horizon2038"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
          <span>{t.sponsorsLink}</span>
        </a>
      </section>

      <section className="document-section">
        <h2>{t.useTitle}</h2>
        <div className="definition-table">
          {t.uses.map(([title, description]) => (
            <div key={title}><h3>{title}</h3><p>{description}</p></div>
          ))}
        </div>
      </section>

      <section className="document-section">
        <h2>{t.contributeTitle}</h2>
        <p>{t.contributeDescription}</p>
        <a
          className="button-link button-link-secondary github-link"
          href="https://github.com/horizon2038/A9N"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
          <span>{t.githubLink}</span>
        </a>
      </section>
    </main>
  );
}
