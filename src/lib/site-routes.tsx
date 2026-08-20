import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/NewsArticlePage";
import { NewsIndexPage } from "@/components/NewsIndexPage";
import { TagPage } from "@/components/TagPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { DocumentsPage } from "@/components/pages/DocumentsPage";
import { DonatePage } from "@/components/pages/DonatePage";
import { GettingStartedPage } from "@/components/pages/GettingStartedPage";
import { HomePage } from "@/components/pages/HomePage";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { getTranslations, type StaticPage } from "@/lib/i18n";
import { getArticleMetadata, getPaginationStaticParams } from "@/lib/news-routes";
import { getStaticPageMetadata } from "@/lib/page-metadata";
import { getAllTags, getSortedPostsData } from "@/lib/posts";
import { getProject, isProjectSlug, projectSlugs } from "@/lib/projects";
import { createPageMetadata, type Locale } from "@/lib/site";

export type SitePathParams = { path?: string[] };
export type SitePageProps = { params: Promise<SitePathParams> };

type ResolvedRoute =
  | { kind: "static"; locale: Locale; page: StaticPage }
  | { kind: "project"; locale: Locale; slug: string }
  | { kind: "article"; locale: Locale; slug: string }
  | { kind: "news-page"; locale: Locale; page: number }
  | { kind: "tag"; locale: Locale; tag: string };

const staticRoutes: readonly { page: StaticPage; segments: readonly string[] }[] = [
  { page: "home", segments: [] },
  { page: "about", segments: ["about"] },
  { page: "projects", segments: ["projects"] },
  { page: "gettingStarted", segments: ["getting-started"] },
  { page: "documents", segments: ["documents"] },
  { page: "news", segments: ["news"] },
  { page: "donate", segments: ["donate"] },
];

function localizedPath(locale: Locale, segments: readonly string[]) {
  return locale === "en" ? ["en", ...segments] : [...segments];
}

export function getSiteStaticParams() {
  const locales: Locale[] = ["ja", "en"];

  return locales.flatMap((locale) => {
    const staticParams = staticRoutes.map(({ segments }) => ({ path: localizedPath(locale, segments) }));
    const projectParams = projectSlugs.map((slug) => ({
      path: localizedPath(locale, ["projects", slug]),
    }));
    const articleParams = getSortedPostsData(locale).map((post) => ({
      path: localizedPath(locale, ["news", ...post.slug.split("/")]),
    }));
    const paginationParams = getPaginationStaticParams(locale).map(({ page }) => ({
      path: localizedPath(locale, ["news", "page", page]),
    }));
    const tagParams = getAllTags(locale).map((tag) => ({
      path: localizedPath(locale, ["news", "tags", tag]),
    }));

    return [...staticParams, ...projectParams, ...articleParams, ...paginationParams, ...tagParams];
  });
}

export function localeFromSitePath(path: string[] | undefined): Locale {
  return path?.[0] === "en" ? "en" : "ja";
}

function resolveRoute(path: string[] | undefined): ResolvedRoute {
  const locale = localeFromSitePath(path);
  const segments = locale === "en" ? (path ?? []).slice(1) : (path ?? []);
  const staticRoute = staticRoutes.find(({ segments: candidate }) =>
    candidate.length === segments.length && candidate.every((segment, index) => segment === segments[index]),
  );

  if (staticRoute) return { kind: "static", locale, page: staticRoute.page };

  if (segments[0] === "projects" && segments.length === 2 && isProjectSlug(segments[1])) {
    return { kind: "project", locale, slug: segments[1] };
  }

  if (segments[0] === "news" && segments[1] === "page" && segments.length === 3) {
    const page = Number(segments[2]);
    if (Number.isInteger(page) && page > 1) return { kind: "news-page", locale, page };
  }

  if (segments[0] === "news" && segments[1] === "tags" && segments.length === 3) {
    return { kind: "tag", locale, tag: decodeURIComponent(segments[2]) };
  }

  if (segments[0] === "news" && segments.length > 1) {
    return { kind: "article", locale, slug: segments.slice(1).join("/") };
  }

  notFound();
}

export async function getSitePageMetadata({ params }: SitePageProps): Promise<Metadata> {
  const { path } = await params;
  const route = resolveRoute(path);

  if (route.kind === "static") return getStaticPageMetadata(route.locale, route.page);

  if (route.kind === "project") {
    const project = getProject(route.slug, route.locale);
    if (!project) notFound();
    return createPageMetadata(route.locale, project.name, project.description, `/projects/${route.slug}`);
  }

  if (route.kind === "news-page") {
    return {
      ...getStaticPageMetadata(route.locale, "news"),
      robots: { index: false, follow: true },
    };
  }

  if (route.kind === "tag") {
    const description = getTranslations(route.locale).news.tagDescription(route.tag);
    return createPageMetadata(
      route.locale,
      `#${route.tag} — News`,
      description,
      `/news/tags/${encodeURIComponent(route.tag)}`,
    );
  }

  return getArticleMetadata(route.locale, {
    params: Promise.resolve({ slug: route.slug.split("/") }),
  });
}

export async function renderSitePage({ params }: SitePageProps) {
  const { path } = await params;
  const route = resolveRoute(path);

  if (route.kind === "static") {
    switch (route.page) {
      case "home":
        return <HomePage locale={route.locale} />;
      case "about":
        return <AboutPage locale={route.locale} />;
      case "projects":
        return <ProjectsPage locale={route.locale} />;
      case "gettingStarted":
        return <GettingStartedPage locale={route.locale} />;
      case "documents":
        return <DocumentsPage locale={route.locale} />;
      case "news":
        return <NewsIndexPage locale={route.locale} />;
      case "donate":
        return <DonatePage locale={route.locale} />;
    }
  }

  if (route.kind === "project") {
    const project = getProject(route.slug, route.locale);
    if (!project) notFound();
    return <ProjectDetailPage locale={route.locale} project={project} />;
  }

  if (route.kind === "news-page") return <NewsIndexPage locale={route.locale} page={route.page} />;
  if (route.kind === "tag") return <TagPage locale={route.locale} tag={route.tag} />;
  return <NewsArticlePage locale={route.locale} slug={route.slug} />;
}
