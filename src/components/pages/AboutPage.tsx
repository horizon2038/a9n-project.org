import Image from "next/image";
import { getTranslations } from "@/lib/i18n";
import { aboutReferences } from "@/lib/about-references";
import type { Locale } from "@/lib/site";

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).about;

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <header className="page-header">
        <div>
          <h1>{t.title}</h1>
        </div>
      </header>

      {t.sections.map((section) => (
        <section className="document-section about-section" key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.text}>
              {paragraph.text}
              {paragraph.citations.map((id) => (
                <sup className="citation" key={id}>
                  <a href={`#ref-${id}`} role="doc-biblioref" aria-label={`${t.referencesTitle} ${id}`}>[{id}]</a>
                </sup>
              ))}
            </p>
          ))}
          {section.id === "microkernel" && (
            <figure className="microkernel-diagram">
              <Image
                src="/about/microkernel-architecture.png"
                width={1089}
                height={846}
                sizes="(max-width: 680px) calc(100vw - 32px), 780px"
                alt={t.microkernelDiagram.alt}
              />
              <figcaption>
                <span>{t.microkernelDiagram.caption}</span>
                <a href="/about/microkernel-architecture.png" target="_blank" rel="noreferrer">
                  {t.microkernelDiagram.open} ↗
                </a>
              </figcaption>
            </figure>
          )}
        </section>
      ))}

      <section className="document-section">
        <h2>{t.founderTitle}</h2>
        <div className="founder-profile">
          <div>
            <h3>Rekka &quot;horizon&quot; IGUMI</h3>
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

      <section className="document-section section-divider" role="doc-bibliography" aria-labelledby="references-heading">
        <h2 id="references-heading">{t.referencesTitle}</h2>
        <ol className="reference-list">
          {aboutReferences.map((reference) => (
            <li key={reference.id} id={`ref-${reference.id}`}>
              {reference.authors}.{" "}
              <a href={reference.href} target="_blank" rel="noreferrer"><cite>{reference.title}</cite></a>.{" "}
              <span>{reference.publication}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
