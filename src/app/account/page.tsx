import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { logout } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Klipvo — Account",
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/account");

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.userId },
    select: { name: true, email: true, role: true },
  });

  return (
    <div className="auth-screen">
      <div className="screen-header">
        <div className="screen-title">Account</div>
        <div className="screen-subtitle">{user.email}</div>
      </div>

      <div className="account-card">
        <div className="profile-avatar">👤</div>
        <div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-badge">{user.role === "CREATOR" ? "⚡ Creator" : "Viewer"}</div>
        </div>
      </div>

      {user.role === "CREATOR" ? (
        <Link href="/dashboard" className="submit-btn account-link">
          Go to Dashboard
        </Link>
      ) : (
        <p className="account-note">
          Creator accounts can publish deals. Sign up again with &quot;I&apos;m a creator&quot; checked to unlock
          the dashboard and upload flow.
        </p>
      )}

      <form action={logout}>
        <button type="submit" className="shop-btn account-logout">
          Log out
        </button>
      </form>
    </div>
  );
}
