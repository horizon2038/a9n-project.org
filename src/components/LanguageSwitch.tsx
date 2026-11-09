"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTranslations } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/site";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const label = getTranslations(locale).common.languageSwitch;
  const path = pathname.replace(/^\/ja(?=\/|$)/, "") || "/";
  const href = localePath(locale === "ja" ? "en" : "ja", path);

  return (
    <Link className="language-link" href={href} hrefLang={locale === "ja" ? "en" : "ja"}>
      {label}
    </Link>
  );
}
