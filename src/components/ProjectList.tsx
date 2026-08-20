import Link from "next/link";
import { GitHubIcon } from "@/components/GitHubIcon";
import { getTranslations } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { localePath, type Locale } from "@/lib/site";

export function ProjectList({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).common;
  const projects = getProjects(locale);

  return (
    <div className="project-table">
      {projects.map((project) => (
        <article className={project.core ? "project-entry project-core" : "project-entry"} key={project.name}>
          <div className="project-entry-name">
            <h3>
              <Link href={`${localePath(locale, "/projects")}/${project.slug}`}>{project.name}</Link>
            </h3>
            {project.core && <span>{t.core}</span>}
          </div>
          <p className="project-kind">{project.kind}</p>
          <p className="project-description">{project.description}</p>
          <div className="project-entry-actions">
            <Link href={`${localePath(locale, "/projects")}/${project.slug}`}>{t.details}</Link>
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
