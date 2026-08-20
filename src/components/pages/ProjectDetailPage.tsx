import Link from "next/link";
import Image from "next/image";
import { A9NBrand } from "@/components/A9NBrand";
import { GitHubIcon } from "@/components/GitHubIcon";
import { getTranslations } from "@/lib/i18n";
import { getProject, type ProjectInfo } from "@/lib/projects";
import { localePath, type Locale } from "@/lib/site";

export function ProjectDetailPage({ locale, project }: { locale: Locale; project: ProjectInfo }) {
  const t = getTranslations(locale).projectDetail;
  const relatedProjects = project.related.flatMap((slug) => {
    const related = getProject(slug, locale);
    return related ? [related] : [];
  });

  return (
    <main className="page-main project-detail-page">
      <Link className="back-link" href={localePath(locale, "/projects")}>
        ← {t.back}
      </Link>

      <header className="page-header project-detail-header">
        <div>
          {project.slug === "a9n" && (
            <div className="project-detail-brand" aria-hidden="true">
              <A9NBrand variant="mark" decorative />
            </div>
          )}
          <p className="page-section-name">{project.kind}</p>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <a className="button-link button-link-secondary github-link" href={project.href} target="_blank" rel="noreferrer">
          <GitHubIcon />
          <span>{t.github}</span>
        </a>
      </header>

      <section className="document-section">
        <h2>{t.overview}</h2>
        {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      {project.screenshots.length > 0 && (
        <section className="document-section">
          <h2>{t.screenshot}</h2>
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

      <section className="document-section">
        <h2>{t.provides}</h2>
        <ul className="project-feature-list">
          {project.provides.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      </section>

      <section className="document-section">
        <h2>{t.role}</h2>
        <p>{project.role}</p>
      </section>

      <section className="document-section">
        <h2>{t.technical}</h2>
        <div className="definition-table">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <h3>{fact.label}</h3>
              <p>{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="document-section">
          <h2>{t.related}</h2>
          <div className="related-projects">
            {relatedProjects.map((related) => (
              <Link href={`${localePath(locale, "/projects")}/${related.slug}`} key={related.slug}>
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
