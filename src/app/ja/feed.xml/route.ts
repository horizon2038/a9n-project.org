import { createFeedResponse } from "@/lib/news-routes";

export const dynamic = "force-static";
export const GET = () => createFeedResponse("ja");
