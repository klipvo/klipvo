"use client";

import { useToast } from "@/components/providers/toast-provider";

export function UploadScreen() {
  const { showToast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire up to a real endpoint once video storage + a database exist.
    showToast("Deal submission isn't wired up yet");
  };

  return (
    <div className="upload-screen">
      <div className="screen-header">
        <div className="screen-title">Add a Deal</div>
        <div className="screen-subtitle">Upload your video and promo code</div>
      </div>

      <div className="upload-zone">
        <div className="upload-icon">🎬</div>
        <div className="upload-title">Drop your video here</div>
        <div className="upload-sub">MP4, MOV · up to 100MB · 9:16 preferred</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="form-label" htmlFor="brand">
            Brand Name
          </label>
          <input id="brand" name="brand" className="form-input" placeholder="e.g. Nike, Sephora, Notion..." />
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="title">
            Video Title
          </label>
          <input id="title" name="title" className="form-input" placeholder="Give your video a catchy title" />
        </div>

        <div className="form-row">
          <div className="form-section">
            <label className="form-label" htmlFor="code">
              Promo Code
            </label>
            <input id="code" name="code" className="form-input" placeholder="SAVE20" />
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="discount">
              Discount
            </label>
            <input id="discount" name="discount" className="form-input" placeholder="20% OFF" />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="link">
            Affiliate Link
          </label>
          <input id="link" name="link" className="form-input" placeholder="https://brand.com/?ref=you" />
        </div>

        <div className="form-row">
          <div className="form-section">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <input id="category" name="category" className="form-input" placeholder="Fashion" />
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="expiry">
              Expiry Date
            </label>
            <input id="expiry" name="expiry" className="form-input" placeholder="MM/DD/YYYY" />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          ✦ Publish Deal
        </button>
      </form>
    </div>
  );
}
