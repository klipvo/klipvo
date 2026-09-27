import { SearchScreen } from "@/components/screens/search-screen";

// Queries the database — must run per-request, not at build time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Klipvo — Search",
};

export default function SearchPage() {
  return <SearchScreen />;
}
