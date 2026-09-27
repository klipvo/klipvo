import { FeedScreen } from "@/components/screens/feed-screen";
import { getFeedDeals, getSavedDealIds } from "@/lib/data/deals";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Klipvo — Feed",
};

export default async function Home() {
  const [session, deals] = await Promise.all([getSession(), getFeedDeals()]);
  const savedIds = session ? await getSavedDealIds(session.userId) : [];

  return <FeedScreen deals={deals} initialSavedIds={savedIds} isAuthenticated={Boolean(session)} />;
}
