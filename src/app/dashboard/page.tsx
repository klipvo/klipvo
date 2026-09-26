import { redirect } from "next/navigation";
import { DashboardScreen } from "@/components/screens/dashboard-screen";
import { getCreatorDashboard } from "@/lib/data/deals";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Klipvo — Dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "CREATOR") redirect("/account");

  const [user, dashboard] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: session.userId }, select: { name: true, email: true } }),
    getCreatorDashboard(session.userId),
  ]);

  const handle = user.email.split("@")[0];

  return <DashboardScreen creatorName={user.name} creatorHandle={handle} data={dashboard} />;
}
