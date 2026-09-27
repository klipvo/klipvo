"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import type { Category } from "@/generated/prisma/enums";

export interface SaveToggleResult {
  saved?: boolean;
  error?: "not_authenticated" | "unknown";
}

export async function toggleSaveDeal(dealId: string): Promise<SaveToggleResult> {
  const session = await getSession();
  if (!session) {
    return { error: "not_authenticated" };
  }

  const existing = await prisma.savedDeal.findUnique({
    where: { userId_dealId: { userId: session.userId, dealId } },
  });

  if (existing) {
    await prisma.savedDeal.delete({ where: { id: existing.id } });
    revalidatePath("/");
    revalidatePath("/saved");
    return { saved: false };
  }

  try {
    await prisma.savedDeal.create({ data: { userId: session.userId, dealId } });
  } catch {
    return { error: "unknown" };
  }

  revalidatePath("/");
  revalidatePath("/saved");
  return { saved: true };
}

export async function incrementDealClicks(dealId: string): Promise<void> {
  await prisma.deal.update({
    where: { id: dealId },
    data: { clicks: { increment: 1 } },
  });
}

export interface DealFormState {
  error?: string;
}

const CATEGORY_VALUES = ["Fashion", "Fitness", "Beauty", "Tech", "Travel", "Food"] as const;

const dealSchema = z.object({
  brandName: z.string().trim().min(1, "Brand name is required").max(60),
  title: z.string().trim().min(1, "Title is required").max(200),
  code: z
    .string()
    .trim()
    .min(2, "Promo code is required")
    .max(30)
    .transform((v) => v.toUpperCase()),
  discount: z.string().trim().min(1, "Discount is required").max(30),
  affiliateLink: z.url("Enter a valid URL"),
  category: z.enum(CATEGORY_VALUES),
  expiresAt: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : null)),
});

const BRAND_EMOJI_FALLBACK = "🏷️";
const DEFAULT_GRADIENT = "linear-gradient(135deg, #1a0533, #3d0066)";
const DEFAULT_EMOJI = "✨";

export async function createDeal(_prevState: DealFormState, formData: FormData): Promise<DealFormState> {
  const session = await getSession();
  if (!session || session.role !== "CREATOR") {
    return { error: "You must be signed in as a creator to publish a deal" };
  }

  const parsed = dealSchema.safeParse({
    brandName: formData.get("brandName"),
    title: formData.get("title"),
    code: formData.get("code"),
    discount: formData.get("discount"),
    affiliateLink: formData.get("affiliateLink"),
    category: formData.get("category"),
    expiresAt: formData.get("expiresAt") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { brandName, title, code, discount, affiliateLink, category, expiresAt } = parsed.data;

  const brand = await prisma.brand.upsert({
    where: { name: brandName },
    update: {},
    create: { name: brandName, emoji: BRAND_EMOJI_FALLBACK },
  });

  await prisma.deal.create({
    data: {
      title,
      code,
      discount,
      affiliateLink,
      category: category as Category,
      expiresAt,
      emoji: DEFAULT_EMOJI,
      gradient: DEFAULT_GRADIENT,
      creatorId: session.userId,
      brandId: brand.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
