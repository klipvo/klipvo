"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VideoCard } from "@/components/video-card";
import { useCopyCode } from "@/lib/use-copy-code";
import { toggleSaveDeal } from "@/lib/actions/deals";
import { CATEGORIES } from "@/lib/constants";
import type { DealView } from "@/lib/data/deals";

interface FeedScreenProps {
  deals: DealView[];
  initialSavedIds: string[];
  isAuthenticated: boolean;
}

export function FeedScreen({ deals, initialSavedIds, isAuthenticated }: FeedScreenProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set(initialSavedIds));
  const { copiedId, copyCode } = useCopyCode();
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleSave = (id: string) => {
    if (!isAuthenticated) {
      router.push("/login?next=/");
      return;
    }
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    startTransition(async () => {
      const result = await toggleSaveDeal(id);
      if (result.error) {
        // revert optimistic update on failure
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
        if (result.error === "not_authenticated") router.push("/login?next=/");
      }
    });
  };

  const filteredDeals =
    activeCategory === "All" ? deals : deals.filter((deal) => deal.category === activeCategory);
  const expiringCount = deals.filter((deal) => deal.expiring).length;

  return (
    <>
      <div className="top-nav">
        <div className="logo">
          Klip<span>vo</span>
        </div>
        <div className="nav-icons">
          <Link href="/search" className="icon-btn" aria-label="Search">
            🔍
          </Link>
          <Link
            href={isAuthenticated ? "/account" : "/login"}
            className="icon-btn"
            aria-label={isAuthenticated ? "Account" : "Log in"}
          >
            {isAuthenticated ? "👤" : "🔑"}
          </Link>
        </div>
      </div>

      <div className="categories">
        {CATEGORIES.map((category) => (
          <div
            key={category}
            className={`cat-pill ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {expiringCount > 0 && (
        <div className="trending-banner">
          <div className="trending-dot" />
          <div className="trending-text">
            <strong>
              {expiringCount} {expiringCount === 1 ? "deal" : "deals"}
            </strong>{" "}
            expiring in the next 48 hours — <strong>don&apos;t miss out</strong>
          </div>
        </div>
      )}

      <div className="feed">
        {filteredDeals.map((deal) => (
          <VideoCard
            key={deal.id}
            video={deal}
            saved={savedIds.has(deal.id)}
            copied={copiedId === deal.id}
            onCopy={copyCode}
            onSave={handleSave}
          />
        ))}
        {filteredDeals.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            No deals in this category yet
          </div>
        )}
      </div>
    </>
  );
}
