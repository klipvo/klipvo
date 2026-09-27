export function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
}

export function formatCountdown(expiresAt: Date | null): string | null {
  if (!expiresAt) return null;
  const diffMs = expiresAt.getTime() - Date.now();
  if (diffMs <= 0) return null;

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  if (days > 0) return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  if (hours > 0) return `${hours}h`;
  return "<1h";
}

const EXPIRING_SOON_MS = 1000 * 60 * 60 * 48;
const NEW_WINDOW_MS = 1000 * 60 * 60 * 24 * 3;

export function isExpiringSoon(expiresAt: Date | null): boolean {
  if (!expiresAt) return false;
  const diffMs = expiresAt.getTime() - Date.now();
  return diffMs > 0 && diffMs <= EXPIRING_SOON_MS;
}

export function isNewDeal(createdAt: Date): boolean {
  return Date.now() - createdAt.getTime() <= NEW_WINDOW_MS;
}
