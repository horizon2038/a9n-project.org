import Link from "next/link";
import Image from "next/image";
import { GitHubIcon } from "@/components/GitHubIcon";
import { getTranslations } from "@/lib/i18n";
import { getProject, type ProjectInfo } from "@/lib/projects";
import { formatDate, localePath, type Locale } from "@/lib/site";

export function ProjectDetailPage({ locale, project }: { locale: Locale; project: ProjectInfo }) {
  const t = getTranslations(locale).projectDetail;
  const relatedProjects = project.related.flatMap((slug) => {
    const related = getProject(slug, locale);
    return related ? [related] : [];
  });

  return (
    <main id="main-content" tabIndex={-1} className="page-main project-detail-page">
      <Link className="back-link" href={localePath(locale, "/projects")}>
        ← {t.back}
      </Link>

      <header className="page-header project-detail-header">
        <div>
          <p className="page-section-name">{project.kind}</p>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          {project.revision.release && (
            <div className="release-note">
              <span>{t.release}</span>
              <a href={project.revision.release.url} target="_blank" rel="noreferrer">
                {project.revision.release.tag} ↗
              </a>
              <time dateTime={project.revision.release.publishedAt}>
                {formatDate(new Date(project.revision.release.publishedAt), locale)}
              </time>
            </div>
          )}
        </div>
        <a className="button-link button-link-secondary github-link" href={project.href} target="_blank" rel="noreferrer">
          <GitHubIcon />
          <span>{t.github}</span>
        </a>
      </header>

      <nav className="project-contents" aria-label={t.contents}>
        <a href="#features">{t.provides}</a>
        {project.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
        <a href="#technical">{t.technical}</a>
        {project.screenshots.length > 0 && <a href="#screenshots">{t.screenshot}</a>}
      </nav>

      <section className="document-section" aria-labelledby="features">
        <h2 id="features">{t.provides}</h2>
        <ul className="project-feature-list">
          {project.provides.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        {project.notes.map((note) => <p key={note}>{note}</p>)}
      </section>

      {project.sections.map((section) => (
        <section className="document-section" key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="source-links">
            {section.links.map((link) => (
              <a href={`${project.href}/blob/${project.revision.commit}/${link.path}`} key={link.path} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        </section>
      ))}

      <section className="document-section" aria-labelledby="technical">
        <h2 id="technical">{t.technical}</h2>
        <dl className="definition-table">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          {project.revision.packageVersion && (
            <div><dt>{t.sourceVersion}</dt><dd>{project.revision.packageVersion}</dd></div>
          )}
          <div>
            <dt>{t.sourceRevision}</dt>
            <dd>
              <a href={`${project.href}/tree/${project.revision.commit}`} target="_blank" rel="noreferrer">
                {project.revision.branch} · <code>{project.revision.commit.slice(0, 7)}</code> ↗
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {project.screenshots.length > 0 && (
        <section className="document-section" aria-labelledby="screenshots">
          <h2 id="screenshots">{t.screenshot}</h2>
          <div className="project-screenshots">
            {project.screenshots.map((screenshot) => (
              <figure className="project-screenshot" key={screenshot.id}>
                <Image
                  src={screenshot.src}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(max-width: 680px) calc(100vw - 32px), 980px"
                  alt={screenshot.alt}
                />
                <figcaption>{screenshot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <section className="document-section section-divider">
          <h2>{t.related}</h2>
          <div className="related-projects">
            {relatedProjects.map((related) => (
              <Link href={localePath(locale, `/projects/${related.slug}`)} key={related.slug}>
                <span>{related.name}</span>
                <span>{related.kind}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
