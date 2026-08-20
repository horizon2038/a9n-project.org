import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTranslations } from "@/lib/i18n";
import { localePath, siteUrl, socialImage, type Locale } from "@/lib/site";

export function getRootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "A9N Project",
      template: "%s | A9N Project",
    },
    description: getTranslations(locale).rootDescription,
    keywords: ["A9N", "microkernel", "micro-hypervisor", "capability", "operating system", "Rust"],
    openGraph: {
      siteName: "A9N Project",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [socialImage.url],
    },
    alternates: {
      types: {
        "application/rss+xml": localePath(locale, "/feed.xml"),
      },
    },
  };
}

export function LocaleDocument({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html lang={locale}>
      <body>
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
