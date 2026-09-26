"use client";

import type { DealView } from "@/lib/data/deals";
import { incrementDealClicks } from "@/lib/actions/deals";

interface VideoCardProps {
  video: DealView;
  saved: boolean;
  copied: boolean;
  onCopy: (code: string, id: string) => void;
  onSave: (id: string) => void;
}

export function VideoCard({ video, saved, copied, onCopy, onSave }: VideoCardProps) {
  return (
    <div className="video-card">
      <div className="video-thumb">
        <div className="video-bg" style={{ background: video.gradient }}>
          {video.emoji}
        </div>
        <div className="video-overlay" />
        <div className="play-btn">▶</div>
        {video.isNew && <div className="new-badge">NEW</div>}
        {video.expiring && <div className="timer-badge">⏰ {video.expiry} left</div>}
        <div className="video-info-overlay">
          <div className="influencer-row">
            <div className="avatar">{video.avatar}</div>
            <div className="influencer-name">
              {video.influencer} <span className="verified">✓</span>
            </div>
          </div>
          <div className="brand-name">🛍 {video.brand}</div>
          <div className="video-title">{video.title}</div>
        </div>
      </div>

      <div className="card-body">
        <div className="code-row">
          <div className="code-box">
            <div className="code-label">Promo Code</div>
            <div className="code-value">{video.code}</div>
            <div className="discount-tag">{video.discount}</div>
          </div>
          <button
            type="button"
            className={`copy-btn ${copied ? "copied" : ""}`}
            onClick={() => onCopy(video.code, video.id)}
          >
            {copied ? "✓" : "📋"} {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="card-actions">
          <a
            className="shop-btn primary"
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              incrementDealClicks(video.id).catch(() => {
                // best-effort click tracking — not critical to the navigation
              });
            }}
          >
            🛒 Shop Now →
          </a>
          <button
            type="button"
            className={`save-btn ${saved ? "saved" : ""}`}
            onClick={() => onSave(video.id)}
            aria-label={saved ? "Remove from saved deals" : "Save deal"}
          >
            {saved ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="card-stats">
          <div className="stat">
            👁 <strong>{video.views}</strong> views
          </div>
          <div className="stat">
            🔗 <strong>{video.clicks}</strong> clicks
          </div>
          <div className="stat">
            🔖 <strong>{video.saves}</strong> saves
          </div>
        </div>
      </div>
    </div>
  );
}
