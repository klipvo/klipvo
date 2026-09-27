import { formatCount } from "@/lib/format";
import type { CreatorDashboard } from "@/lib/data/deals";

interface DashboardScreenProps {
  creatorName: string;
  creatorHandle: string;
  data: CreatorDashboard;
}

export function DashboardScreen({ creatorName, creatorHandle, data }: DashboardScreenProps) {
  const { deals, totalClicks, totalSaves, activeDeals } = data;
  const maxClicks = Math.max(1, ...deals.map((d) => d.rawClicks));

  return (
    <div className="dashboard">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div>
          <div className="profile-name">{creatorName}</div>
          <div className="profile-handle">@{creatorHandle}</div>
          <div className="profile-badge">⚡ Creator</div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card highlight">
          <div className="stat-number">{formatCount(totalClicks)}</div>
          <div className="stat-desc">Total Clicks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{formatCount(totalSaves)}</div>
          <div className="stat-desc">Total Saves</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{activeDeals}</div>
          <div className="stat-desc">Active Deals</div>
        </div>
      </div>

      {deals.length > 0 && (
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Clicks by Deal</div>
            <div className="chart-period">All time</div>
          </div>
          <div className="mini-chart">
            {deals.map((deal, i) => (
              <div
                key={deal.id}
                className={`bar ${i === 0 ? "active" : ""}`}
                style={{ height: `${Math.max(4, (deal.rawClicks / maxClicks) * 100)}%` }}
                title={`${deal.title}: ${deal.clicks} clicks`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="section-title">Your Videos</div>
      <div className="video-list">
        {deals.map((deal) => (
          <div className="video-list-item" key={deal.id}>
            <div className="vl-thumb">{deal.emoji}</div>
            <div className="vl-info">
              <div className="vl-title">{deal.title}</div>
              <div className="vl-code">
                {deal.code} · {deal.discount}
              </div>
              <div className="vl-stats">
                <span className="vl-stat">👁 {deal.views}</span>
                <span className="vl-stat">🔗 {deal.clicks}</span>
                <span className="vl-stat">🔖 {deal.saves}</span>
              </div>
            </div>
            <div className="vl-badge">{deal.expiring ? "Expiring" : "Live"}</div>
          </div>
        ))}
        {deals.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🎬</div>
            No deals yet
            <br />
            <span className="empty-state-hint">Publish your first deal to see it here</span>
          </div>
        )}
      </div>
    </div>
  );
}
