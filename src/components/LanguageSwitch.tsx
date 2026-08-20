"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const label = getTranslations(locale).common.languageSwitch;
  const href =
    locale === "ja"
      ? pathname === "/"
        ? "/en"
        : `/en${pathname}`
      : pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  return (
    <Link className="language-link" href={href} hrefLang={locale === "ja" ? "en" : "ja"}>
      {label}
    </Link>
  );
}
