import { getSitePageMetadata, getSiteStaticParams, renderSitePage, type SitePageProps } from "@/lib/site-routes";

export const dynamicParams = false;
export const dynamic = "force-static";
export const generateStaticParams = getSiteStaticParams;
export const generateMetadata = getSitePageMetadata;

export default function Page(props: SitePageProps) {
  return renderSitePage(props);
}
