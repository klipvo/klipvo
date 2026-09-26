"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/components/providers/toast-provider";

export function useCopyCode() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { showToast } = useToast();

  const copyCode = useCallback(
    (code: string, id: number) => {
      navigator.clipboard?.writeText(code).catch(() => {
        // clipboard permission denied — the code is still shown on screen
      });
      setCopiedId(id);
      showToast(`✓ Copied ${code}!`);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2200);
    },
    [showToast]
  );

  return { copiedId, copyCode };
}
