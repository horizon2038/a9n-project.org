import type { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import { projectManifest } from "@/lib/project-manifest";
import { localePath, siteUrl, type Locale } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales: Locale[] = ["ja", "en"];
  const staticPaths = ["", "/about", "/projects", "/getting-started", "/documents", "/news", "/donate"];
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified: new Date("2026-08-20T00:00:00+09:00"),
      changeFrequency: path === "/news" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ja: `${siteUrl}${localePath("ja", path)}`,
          en: `${siteUrl}${localePath("en", path)}`,
        },
      },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getSortedPostsData(locale).map((post) => ({
      url: `${siteUrl}${localePath(locale, "/news")}/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          ja: `${siteUrl}${localePath("ja", "/news")}/${post.slug}`,
          en: `${siteUrl}${localePath("en", "/news")}/${post.slug}`,
        },
      },
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projectManifest.map((project) => ({
      url: `${siteUrl}${localePath(locale, `/projects/${project.slug}`)}`,
      lastModified: new Date("2026-08-20T00:00:00+09:00"),
      changeFrequency: "monthly" as const,
      priority: project.core ? 0.8 : 0.7,
      alternates: {
        languages: {
          ja: `${siteUrl}${localePath("ja", `/projects/${project.slug}`)}`,
          en: `${siteUrl}${localePath("en", `/projects/${project.slug}`)}`,
        },
      },
    })),
  );

  return [...staticEntries, ...projectEntries, ...postEntries];
}
