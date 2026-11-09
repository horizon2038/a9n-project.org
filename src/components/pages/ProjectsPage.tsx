import { ProjectList } from "@/components/ProjectList";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export function ProjectsPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).projects;

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <header className="page-header page-header-simple">
        <div>
          <h1>Projects</h1>
        </div>
      </header>

      <section className="document-section projects-section" aria-label={t.sectionTitle}>
        <ProjectList locale={locale} headingLevel={2} />
      </section>
    </main>
  );
}
