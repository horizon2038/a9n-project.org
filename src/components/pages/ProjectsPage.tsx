import { ProjectList } from "@/components/ProjectList";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export function ProjectsPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).projects;

  return (
    <main className="page-main">
      <header className="page-header page-header-simple">
        <div>
          <p className="page-section-name">Projects</p>
          <h1>Projects</h1>
          <p>{t.introduction}</p>
        </div>
      </header>

      <section className="document-section projects-section">
        <h2>{t.sectionTitle}</h2>
        <p>{t.sectionIntroduction}</p>
        <ProjectList locale={locale} />
      </section>
    </main>
  );
}
