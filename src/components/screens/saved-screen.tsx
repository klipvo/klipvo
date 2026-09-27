"use client";

import { useState, useTransition } from "react";
import { useCopyCode } from "@/lib/use-copy-code";
import { toggleSaveDeal } from "@/lib/actions/deals";
import type { DealView } from "@/lib/data/deals";

interface SavedScreenProps {
  initialDeals: DealView[];
}

export function SavedScreen({ initialDeals }: SavedScreenProps) {
  const [deals, setDeals] = useState(initialDeals);
  const { copyCode } = useCopyCode();
  const [, startTransition] = useTransition();

  const handleUnsave = (id: string) => {
    const removed = deals.find((d) => d.id === id);
    setDeals((prev) => prev.filter((d) => d.id !== id));
    startTransition(async () => {
      const result = await toggleSaveDeal(id);
      if (result.error && removed) {
        setDeals((prev) => (prev.some((d) => d.id === id) ? prev : [...prev, removed]));
      }
    });
  };

  return (
    <div className="saved-screen">
      <div className="saved-header">
        <div className="saved-title">Saved Deals</div>
        <div className="saved-sub">{deals.length} deals saved</div>
      </div>
      <div className="saved-grid">
        {deals.map((deal) => (
          <div className="saved-card" key={deal.id}>
            <div className="saved-thumb">{deal.emoji}</div>
            <div className="saved-info">
              <div className="saved-brand">{deal.brand}</div>
              <div className="saved-title-text">{deal.title}</div>
              <div
                className="saved-code-pill"
                onClick={() => copyCode(deal.code, deal.id)}
                role="button"
                tabIndex={0}
              >
                <span>🏷️</span> {deal.code}
              </div>
              {deal.expiring && <div className="saved-expiry">⏰ Expires in {deal.expiry}</div>}
            </div>
            <button
              type="button"
              className="save-btn saved"
              onClick={() => handleUnsave(deal.id)}
              aria-label="Remove from saved deals"
            >
              ❤️
            </button>
          </div>
        ))}
        {deals.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔖</div>
            No saved deals yet
            <br />
            <span className="empty-state-hint">Tap the heart icon on any deal</span>
          </div>
        )}
      </div>
    </div>
  );
}
