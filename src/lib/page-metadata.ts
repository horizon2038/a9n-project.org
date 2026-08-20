import { getTranslations, type StaticPage } from "@/lib/i18n";
import { createPageMetadata, type Locale } from "@/lib/site";

const pagePaths: Record<StaticPage, string> = {
  home: "",
  about: "/about",
  projects: "/projects",
  gettingStarted: "/getting-started",
  documents: "/documents",
  news: "/news",
  donate: "/donate",
};

export function getStaticPageMetadata(locale: Locale, page: StaticPage) {
  const [title, description] = getTranslations(locale).metadata[page];
  return createPageMetadata(locale, title, description, pagePaths[page]);
}
