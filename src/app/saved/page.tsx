import { redirect } from "next/navigation";
import { SavedScreen } from "@/components/screens/saved-screen";
import { getSavedDeals } from "@/lib/data/deals";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Klipvo — Saved",
};

export default async function SavedPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/saved");

  const deals = await getSavedDeals(session.userId);
  return <SavedScreen initialDeals={deals} />;
}
