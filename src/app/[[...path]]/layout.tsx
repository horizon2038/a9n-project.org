import { getRootMetadata, LocaleDocument } from "@/components/LocaleDocument";
import { localeFromSitePath, type SitePageProps } from "@/lib/site-routes";
import "../fonts.css";
import "../globals.css";

export async function generateMetadata({ params }: SitePageProps) {
  const { path } = await params;
  return getRootMetadata(localeFromSitePath(path));
}

export default async function SiteLayout({ children, params }: Readonly<{ children: React.ReactNode } & SitePageProps>) {
  const { path } = await params;
  return <LocaleDocument locale={localeFromSitePath(path)}>{children}</LocaleDocument>;
}
