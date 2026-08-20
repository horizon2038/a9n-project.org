import Link from "next/link";
import { A9NBrand } from "@/components/A9NBrand";
import { GitHubIcon } from "@/components/GitHubIcon";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { MobileMenu } from "@/components/MobileMenu";
import { XIcon } from "@/components/XIcon";
import { getTranslations } from "@/lib/i18n";
import { getNavigation, localePath, type Locale } from "@/lib/site";

type NavigationItems = ReturnType<typeof getNavigation>;

function NavigationLinks({
  className,
  items,
  label,
}: {
  className: string;
  items: NavigationItems;
  label: string;
}) {
  return (
    <nav className={className} aria-label={label}>
      {items.map((item) => (
        <Link href={item.href} key={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderUtilities({
  className,
  githubLabel,
  locale,
  xLabel,
}: {
  className: string;
  githubLabel: string;
  locale: Locale;
  xLabel: string;
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
      <a
        className="header-social"
        href="https://x.com/a9n_project"
        target="_blank"
        rel="noreferrer"
        aria-label={xLabel}
      >
        <XIcon />
        <span>X</span>
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

        <NavigationLinks className="site-nav" items={navigation} label={t.common.mainNavigation} />

        <HeaderUtilities
          className="header-links"
          githubLabel={t.common.github}
          locale={locale}
          xLabel={t.common.xAccount}
        />

        <MobileMenu label={t.common.mobileMenu}>
          <NavigationLinks className="mobile-nav" items={navigation} label={t.common.mainNavigation} />
          <HeaderUtilities
            className="mobile-header-links"
            githubLabel={t.common.github}
            locale={locale}
            xLabel={t.common.xAccount}
          />
        </MobileMenu>
      </div>
    </header>
  );
}
