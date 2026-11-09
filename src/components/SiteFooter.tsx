import Link from "next/link";
import { A9NBrand } from "@/components/A9NBrand";
import { getTranslations } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link className="footer-brand" href={localePath(locale)} aria-label="A9N Project">
            <A9NBrand variant="title" decorative />
          </Link>
        </div>
        <nav className="footer-links" aria-label={t.common.footerNavigation}>
          <Link href={localePath(locale, "/documents")}>Documents</Link>
          <a href="https://github.com/horizon2038" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://x.com/a9n_project" target="_blank" rel="noreferrer" aria-label={t.common.xAccount}>X ↗</a>
          <a href={localePath(locale, "/feed.xml")}>RSS</a>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} A9N Project</p>
      </div>
    </footer>
  );
}
