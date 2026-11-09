import Link from "next/link";
import { A9NBrand } from "@/components/A9NBrand";
import { GitHubIcon } from "@/components/GitHubIcon";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteNavigation } from "@/components/SiteNavigation";
import { getTranslations } from "@/lib/i18n";
import { getNavigation, localePath, type Locale } from "@/lib/site";

function HeaderUtilities({
  className,
  githubLabel,
  locale,
}: {
  className: string;
  githubLabel: string;
  locale: Locale;
}) {
  return (
    <div className={className}>
      <a
        className="github-link header-social"
        href="https://github.com/horizon2038/A9N"
        target="_blank"
        rel="noreferrer"
        aria-label={githubLabel}
      >
        <GitHubIcon />
        <span>{githubLabel}</span>
      </a>
      <LanguageSwitch locale={locale} />
    </div>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const navigation = getNavigation(locale);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="site-name" href={localePath(locale)} aria-label="A9N Project">
          <A9NBrand variant="horizontal" decorative priority />
        </Link>

        <SiteNavigation className="site-nav" items={navigation} label={t.common.mainNavigation} />

        <HeaderUtilities
          className="header-links"
          githubLabel={t.common.github}
          locale={locale}
        />

        <MobileMenu label={t.common.mobileMenu}>
          <SiteNavigation className="mobile-nav" items={navigation} label={t.common.mainNavigation} />
          <HeaderUtilities
            className="mobile-header-links"
            githubLabel={t.common.github}
            locale={locale}
          />
        </MobileMenu>
      </div>
    </header>
  );
}
