import type { Locale } from "@/lib/site";
import { documentResources } from "@/lib/document-resources";
import { getTranslations } from "@/lib/i18n";

export function DocumentsPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).documents;

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <header className="page-header">
        <div>
          <h1>{t.title}</h1>
        </div>
      </header>

      <section className="document-section" aria-label={t.title}>
        <div className="resource-list">
          {documentResources.map((document) => (
            <article key={document.name}>
              <div>
                <h2><a href={document.href} target="_blank" rel="noreferrer">{document.name} ↗</a></h2>
                <p>{t.resources[document.id]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
