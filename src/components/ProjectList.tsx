import Link from "next/link";
import { GitHubIcon } from "@/components/GitHubIcon";
import { getTranslations } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import type { ProjectSlug } from "@/lib/project-manifest";
import { localePath, type Locale } from "@/lib/site";

export function ProjectList({ locale, slugs, headingLevel = 3 }: {
  locale: Locale;
  slugs?: readonly ProjectSlug[];
  headingLevel?: 2 | 3;
}) {
  const t = getTranslations(locale).common;
  const projects = getProjects(locale).filter((project) => !slugs || slugs.includes(project.slug));
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="project-table">
      {projects.map((project) => (
        <article className={project.core ? "project-entry project-core" : "project-entry"} key={project.name}>
          <div className="project-entry-name">
            <Heading>
              <Link href={localePath(locale, `/projects/${project.slug}`)}>{project.name}</Link>
            </Heading>
            <p className="project-kind">{project.kind}</p>
            {project.revision.release && (
              <a className="project-version" href={project.revision.release.url} target="_blank" rel="noreferrer">
                {project.revision.release.tag}
              </a>
            )}
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-entry-actions">
            <Link href={localePath(locale, `/projects/${project.slug}`)}>{t.details}</Link>
            <a className="github-link" href={project.href} target="_blank" rel="noreferrer">
              <GitHubIcon />
              <span>{t.github}</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
