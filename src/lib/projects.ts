import { projectContent } from "@/lib/project-content";
import { projectDetails, type ProjectSection } from "@/lib/project-details";
import {
  projectManifest,
  type ProjectDefinition,
  type ProjectSlug,
} from "@/lib/project-manifest";
import type { Locale } from "@/lib/site";
import { projectRevisions, type ProjectRevision } from "@/lib/project-revisions";

export type ProjectScreenshot = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type ProjectInfo = {
  slug: ProjectSlug;
  name: string;
  href: string;
  core?: boolean;
  kind: string;
  description: string;
  notes: readonly string[];
  sections: readonly ProjectSection[];
  provides: readonly string[];
  facts: readonly {
    label: string;
    value: string;
  }[];
  screenshots: readonly ProjectScreenshot[];
  related: readonly ProjectSlug[];
  revision: ProjectRevision;
};

function localizeProject(definition: ProjectDefinition, locale: Locale): ProjectInfo {
  const content = projectContent[locale][definition.slug];
  const { screenshotText, ...localizedContent } = content;
  const screenshotIds = new Set<string>();
  const screenshots = (definition.screenshots ?? []).map((screenshot) => {
    const copy = screenshotText[screenshot.id];

    if (screenshotIds.has(screenshot.id)) {
      throw new Error(
        `Duplicate screenshot ID "${screenshot.id}" for ${definition.slug}`,
      );
    }
    screenshotIds.add(screenshot.id);

    if (!copy?.alt.trim() || !copy.caption.trim()) {
      throw new Error(
        `Missing ${locale} alt text or caption for ${definition.slug} screenshot "${screenshot.id}"`,
      );
    }

    return { ...screenshot, ...copy };
  });

  for (const screenshotId of Object.keys(screenshotText)) {
    if (!screenshotIds.has(screenshotId)) {
      throw new Error(
        `Unknown ${locale} screenshot text ID "${screenshotId}" for ${definition.slug}`,
      );
    }
  }

  return {
    ...definition,
    ...localizedContent,
    sections: projectDetails[locale][definition.slug],
    screenshots,
    revision: projectRevisions[definition.slug],
  };
}

export function getProjects(locale: Locale): readonly ProjectInfo[] {
  return projectManifest.map((definition) => localizeProject(definition, locale));
}

export function getProject(slug: string | undefined, locale: Locale): ProjectInfo | undefined {
  const definition = projectManifest.find((project) => project.slug === slug);
  return definition ? localizeProject(definition, locale) : undefined;
}

export function isProjectSlug(slug: string | undefined): slug is ProjectSlug {
  return projectManifest.some((project) => project.slug === slug);
}

export const projectSlugs: readonly ProjectSlug[] = projectManifest.map((project) => project.slug);
