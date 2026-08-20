import type { Metadata } from "next";

export type Locale = "ja" | "en";

export const siteUrl = "https://a9n-project.org";

const navigationItems = [
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/getting-started", label: "Getting Started" },
  { path: "/documents", label: "Documents" },
  { path: "/news", label: "News" },
  { path: "/donate", label: "Donate" },
] as const;

export function getNavigation(locale: Locale) {
  return navigationItems.map((item) => ({ href: localePath(locale, item.path), label: item.label }));
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path === "/" ? "" : path;
  return locale === "en" ? `/en${normalized}` || "/en" : normalized || "/";
}

export function createPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  const jaPath = localePath("ja", path);
  const enPath = localePath("en", path);

  return {
    title: path === "" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: locale === "ja" ? jaPath : enPath,
      languages: {
        "ja-JP": jaPath,
        "en-US": enPath,
      },
      types: {
        "application/rss+xml": localePath(locale, "/feed.xml"),
      },
    },
    openGraph: {
      title,
      description,
      url: locale === "ja" ? jaPath : enPath,
      locale: locale === "ja" ? "ja_JP" : "en_US",
    },
  };
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: locale === "ja" ? "2-digit" : "short",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(date);
}
