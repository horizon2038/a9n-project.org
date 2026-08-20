import Link from "next/link";
import { A9NBrand } from "@/components/A9NBrand";
import { localePath, type Locale } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <Link className="footer-brand" href={localePath(locale)} aria-label="A9N Project">
            <A9NBrand variant="title" decorative />
          </Link>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} A9N Project</p>
      </div>
    </footer>
  );
}
