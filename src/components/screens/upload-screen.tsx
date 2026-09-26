"use client";

import { useActionState } from "react";
import { createDeal, type DealFormState } from "@/lib/actions/deals";

const CATEGORY_OPTIONS = ["Fashion", "Fitness", "Beauty", "Tech", "Travel", "Food"] as const;

const initialState: DealFormState = {};

export function UploadScreen() {
  const [state, formAction, pending] = useActionState(createDeal, initialState);

  return (
    <div className="upload-screen">
      <div className="screen-header">
        <div className="screen-title">Add a Deal</div>
        <div className="screen-subtitle">Publish a promo code for your audience</div>
      </div>

      <div className="upload-zone">
        <div className="upload-icon">🎬</div>
        <div className="upload-title">Video upload isn&apos;t wired up yet</div>
        <div className="upload-sub">Deals show a placeholder thumbnail for now</div>
      </div>

      <form action={formAction}>
        {state.error && (
          <div className="form-section">
            <div className="form-error">{state.error}</div>
          </div>
        )}

        <div className="form-section">
          <label className="form-label" htmlFor="brandName">
            Brand Name
          </label>
          <input id="brandName" name="brandName" className="form-input" placeholder="e.g. Nike, Sephora, Notion..." required />
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="title">
            Video Title
          </label>
          <input id="title" name="title" className="form-input" placeholder="Give your video a catchy title" required />
        </div>

        <div className="form-row">
          <div className="form-section">
            <label className="form-label" htmlFor="code">
              Promo Code
            </label>
            <input id="code" name="code" className="form-input" placeholder="SAVE20" required />
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="discount">
              Discount
            </label>
            <input id="discount" name="discount" className="form-input" placeholder="20% OFF" required />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="affiliateLink">
            Affiliate Link
          </label>
          <input
            id="affiliateLink"
            name="affiliateLink"
            type="url"
            className="form-input"
            placeholder="https://brand.com/?ref=you"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-section">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <select id="category" name="category" className="form-input" defaultValue="Fashion" required>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="expiresAt">
              Expiry Date
            </label>
            <input id="expiresAt" name="expiresAt" type="date" className="form-input" />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={pending}>
          {pending ? "Publishing…" : "✦ Publish Deal"}
        </button>
      </form>
    </div>
  );
}
