"use client";

import { useSavedDeals } from "@/components/providers/saved-deals-provider";
import { useCopyCode } from "@/lib/use-copy-code";
import { DEALS } from "@/lib/mock-data";

export function SavedScreen() {
  const { savedIds } = useSavedDeals();
  const { copyCode } = useCopyCode();

  const savedDeals = DEALS.filter((deal) => savedIds.includes(deal.id));

  return (
    <div className="saved-screen">
      <div className="saved-header">
        <div className="saved-title">Saved Deals</div>
        <div className="saved-sub">{savedIds.length} deals saved</div>
      </div>
      <div className="saved-grid">
        {savedDeals.map((deal) => (
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
          </div>
        ))}
        {savedDeals.length === 0 && (
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
