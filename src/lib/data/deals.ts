import "server-only";
import { prisma } from "@/lib/prisma";
import { formatCount, formatCountdown, isExpiringSoon, isNewDeal } from "@/lib/format";
import type { Category } from "@/generated/prisma/enums";

const dealWithRelations = {
  include: {
    brand: true,
    creator: { select: { name: true } },
    _count: { select: { savedBy: true } },
  },
} as const;

type RawDeal = Awaited<ReturnType<typeof prisma.deal.findFirstOrThrow<typeof dealWithRelations>>>;

export interface DealView {
  id: string;
  influencer: string;
  avatar: string;
  brand: string;
  category: Category;
  title: string;
  code: string;
  discount: string;
  expiry: string | null;
  link: string;
  views: string;
  clicks: string;
  saves: string;
  rawClicks: number;
  rawSaves: number;
  emoji: string;
  gradient: string;
  isNew: boolean;
  expiring: boolean;
}

function toDealView(deal: RawDeal): DealView {
  return {
    id: deal.id,
    influencer: deal.creator.name,
    avatar: deal.emoji,
    brand: deal.brand.name,
    category: deal.category,
    title: deal.title,
    code: deal.code,
    discount: deal.discount,
    expiry: formatCountdown(deal.expiresAt),
    link: deal.affiliateLink,
    views: formatCount(deal.views),
    clicks: formatCount(deal.clicks),
    saves: formatCount(deal._count.savedBy),
    rawClicks: deal.clicks,
    rawSaves: deal._count.savedBy,
    emoji: deal.emoji,
    gradient: deal.gradient,
    isNew: isNewDeal(deal.createdAt),
    expiring: isExpiringSoon(deal.expiresAt),
  };
}

export async function getFeedDeals(category?: Category): Promise<DealView[]> {
  const deals = await prisma.deal.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" },
    ...dealWithRelations,
  });
  return deals.map(toDealView);
}

export async function getSavedDealIds(userId: string): Promise<string[]> {
  const saved = await prisma.savedDeal.findMany({
    where: { userId },
    select: { dealId: true },
  });
  return saved.map((s) => s.dealId);
}

export async function getSavedDeals(userId: string): Promise<DealView[]> {
  const deals = await prisma.deal.findMany({
    where: { savedBy: { some: { userId } } },
    orderBy: { createdAt: "desc" },
    ...dealWithRelations,
  });
  return deals.map(toDealView);
}

export interface BrandView {
  id: string;
  name: string;
  emoji: string;
  activeDeals: number;
}

export async function getBrandsWithCounts(): Promise<BrandView[]> {
  const brands = await prisma.brand.findMany({
    include: { _count: { select: { deals: true } } },
    orderBy: { deals: { _count: "desc" } },
  });
  return brands
    .filter((b) => b._count.deals > 0)
    .map((b) => ({ id: b.id, name: b.name, emoji: b.emoji, activeDeals: b._count.deals }));
}

export interface CreatorDashboard {
  deals: DealView[];
  totalClicks: number;
  totalSaves: number;
  activeDeals: number;
}

export async function getCreatorDashboard(creatorId: string): Promise<CreatorDashboard> {
  const deals = await prisma.deal.findMany({
    where: { creatorId },
    orderBy: { createdAt: "desc" },
    ...dealWithRelations,
  });

  const views = deals.map(toDealView);
  const totalClicks = deals.reduce((sum, d) => sum + d.clicks, 0);
  const totalSaves = deals.reduce((sum, d) => sum + d._count.savedBy, 0);

  return { deals: views, totalClicks, totalSaves, activeDeals: deals.length };
}
