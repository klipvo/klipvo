import { CLICK_PERFORMANCE, DEALS } from "@/lib/mock-data";

const maxClicks = Math.max(...CLICK_PERFORMANCE);

export function DashboardScreen() {
  return (
    <div className="dashboard">
      <div className="profile-header">
        <div className="profile-avatar">👗</div>
        <div>
          <div className="profile-name">Alex Rivera</div>
          <div className="profile-handle">@alexrivera</div>
          <div className="profile-badge">⚡ Pro Influencer</div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card highlight">
          <div className="stat-number">14.2K</div>
          <div className="stat-desc">Total Clicks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">9.8K</div>
          <div className="stat-desc">Code Uses</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">$2.4K</div>
          <div className="stat-desc">Est. Earned</div>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-title">Click Performance</div>
          <div className="chart-period">Last 12 weeks</div>
        </div>
        <div className="mini-chart">
          {CLICK_PERFORMANCE.map((value, i) => (
            <div
              key={i}
              className={`bar ${i === CLICK_PERFORMANCE.length - 1 ? "active" : ""}`}
              style={{ height: `${(value / maxClicks) * 100}%` }}
            />
          ))}
        </div>
        <div className="chart-footer">
          <span className="chart-footer-label">Jan</span>
          <span className="chart-footer-label">Mar</span>
          <span className="chart-footer-highlight">+58% this week</span>
        </div>
      </div>

      <div className="section-title">Your Videos</div>
      <div className="video-list">
        {DEALS.slice(0, 2).map((deal) => (
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
            <div className="vl-badge">Live</div>
          </div>
        ))}
      </div>
    </div>
  );
}
