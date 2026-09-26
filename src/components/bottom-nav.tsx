"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Feed", icon: "🏠" },
  { href: "/search", label: "Search", icon: "🔍" },
  { href: "/upload", label: "Add", icon: "+", isAdd: true },
  { href: "/saved", label: "Saved", icon: "🔖" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        if ("isAdd" in item && item.isAdd) {
          return (
            <Link key={item.href} href={item.href} className="nav-item" aria-label={item.label}>
              <div className="nav-add">{item.icon}</div>
            </Link>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${active ? "active" : ""}`}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
          </Link>
        );
      })}
    </nav>
  );
}
