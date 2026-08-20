import type { Locale } from "@/lib/site";
import { GitHubIcon } from "@/components/GitHubIcon";
import { documentResources } from "@/lib/document-resources";
import { getTranslations } from "@/lib/i18n";

export function DocumentsPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).documents;

  return (
    <main className="page-main">
      <header className="page-header">
        <div>
          <p className="page-section-name">Documents</p>
          <h1>{t.title}</h1>
          <p>{t.introduction}</p>
        </div>
      </header>

      <section className="document-section">
        <h2>{t.listTitle}</h2>
        <div className="resource-list">
          {documentResources.map((document) => (
            <article key={document.name}>
              <div>
                <h3>{document.name}</h3>
                <p>{t.resources[document.id]}</p>
              </div>
              <a href={document.href} target="_blank" rel="noreferrer">
                {t.open} ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="document-section">
        <h2>{t.sourceTitle}</h2>
        <p>{t.sourceDescription}</p>
        <a className="button-link button-link-secondary github-link" href="https://github.com/horizon2038" target="_blank" rel="noreferrer">
          <GitHubIcon />
          <span>GitHub Organization</span>
        </a>
      </section>
    </main>
  );
}
