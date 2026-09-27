import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Syne } from "next/font/google";
import { BottomNav } from "@/components/bottom-nav";
import { ToastProvider } from "@/components/providers/toast-provider";
import "./globals.css";

const fontDisplay = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const fontUi = Syne({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontBody = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Klipvo",
    template: "%s · Klipvo",
  },
  description: "Short-video deals from creators you follow — codes you can actually copy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontUi.variable} ${fontBody.variable}`}
    >
      <body>
        <ToastProvider>
          <div className="app-shell">
            {children}
            <BottomNav />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
