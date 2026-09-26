import { BRANDS, TRENDING_SEARCHES } from "@/lib/mock-data";

export function SearchScreen() {
  return (
    <div className="search-screen">
      <div className="screen-header">
        <div className="screen-title">Find Deals</div>
        <div className="screen-subtitle">Search brands, influencers, or codes</div>
      </div>

      <div className="search-input-wrap">
        <span className="search-icon-abs">🔍</span>
        <input className="search-input" placeholder="Try 'Nike', 'skincare', 'SAVE20'..." />
      </div>

      <div className="section-title">Top Brands</div>
      <div className="brand-grid">
        {BRANDS.map((brand) => (
          <div className="brand-card" key={brand.name}>
            <div className="brand-emoji">{brand.emoji}</div>
            <div className="brand-info">
              <div className="brand-name-text">{brand.name}</div>
              <div className="brand-code-count">{brand.codes} active codes</div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-title">Trending Searches</div>
      <div className="trending-searches">
        {TRENDING_SEARCHES.map((term) => (
          <div className="trend-tag" key={term}>
            🔥 {term}
          </div>
        ))}
      </div>
    </div>
  );
}
