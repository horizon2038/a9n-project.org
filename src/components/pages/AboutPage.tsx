import Link from "next/link";
import { getTranslations } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/site";

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).about;

  return (
    <main className="page-main">
      <header className="page-header">
        <div>
          <p className="page-section-name">About</p>
          <h1>{t.title}</h1>
          <p>{t.introduction}</p>
        </div>
      </header>

      <section className="document-section">
        <h2>{t.scopeTitle}</h2>
        {t.scope.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section className="document-section">
        <h2>{t.relationTitle}</h2>
        <p>{t.relationIntroduction}</p>
        <div className="definition-table">
          {t.stages.map(([title, description]) => (
            <div key={title}><h3>{title}</h3><p>{description}</p></div>
          ))}
        </div>
        <Link className="inline-action" href={localePath(locale, "/projects")}>
          {t.projectsLink}
        </Link>
      </section>

      <section className="document-section">
        <h2>{t.kernelTitle}</h2>
        {t.kernel.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <Link className="inline-action" href={localePath(locale, "/documents")}>
          {t.documentsLink}
        </Link>
      </section>

      <section className="document-section">
        <h2>{t.founderTitle}</h2>
        <div className="founder-profile">
          <div>
            <h3>Rekka &quot;horizon&quot; IGUMI</h3>
            <p>{t.founderRole}</p>
          </div>
          <div>
            <p>{t.founderDescription}</p>
            <div className="founder-links">
              <a href="https://horizon2k38.com" target="_blank" rel="noreferrer">
                Website ↗
              </a>
              <a href="https://github.com/horizon2038" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
