"use client";

import { useState } from "react";
import Link from "next/link";
import { VideoCard } from "@/components/video-card";
import { useSavedDeals } from "@/components/providers/saved-deals-provider";
import { useCopyCode } from "@/lib/use-copy-code";
import { CATEGORIES, DEALS } from "@/lib/mock-data";

export function FeedScreen() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const { isSaved, toggleSave } = useSavedDeals();
  const { copiedId, copyCode } = useCopyCode();

  const filteredDeals =
    activeCategory === "All"
      ? DEALS
      : DEALS.filter((deal) => deal.category === activeCategory);

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
          <div className="icon-btn" aria-label="Notifications">
            🔔
          </div>
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

      <div className="trending-banner">
        <div className="trending-dot" />
        <div className="trending-text">
          <strong>142 deals</strong> expiring in the next 48 hours — <strong>don&apos;t miss out</strong>
        </div>
      </div>

      <div className="feed">
        {filteredDeals.map((deal) => (
          <VideoCard
            key={deal.id}
            video={deal}
            saved={isSaved(deal.id)}
            copied={copiedId === deal.id}
            onCopy={copyCode}
            onSave={toggleSave}
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
