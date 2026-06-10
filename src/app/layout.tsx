import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IronCore Mumbai – Premier Gym in Mumbai | 14-Day Free Trial",
    template: "%s | IronCore Mumbai",
  },
  description:
    "Join IronCore Mumbai – Mumbai's premier mid-range gym with elite equipment, 25+ certified trainers & ₹1,999/month plans. Claim your 14-day free trial today!",
  keywords: [
    "gym in Mumbai", "best gym Mumbai", "premium gym Mumbai",
    "fitness center Mumbai", "personal trainer Mumbai", "gym membership Mumbai",
    "CrossFit Mumbai", "strength training Mumbai", "IronCore Mumbai",
    "gym free trial Mumbai", "West Mumbai gym",
  ],
  openGraph: {
    title: "IronCore Mumbai – Forge Your Strength",
    description: "Mumbai's premier fitness destination with elite equipment, expert trainers & 14-day free trial.",
    type: "website",
    locale: "en_IN",
    siteName: "IronCore Mumbai",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-950 text-dark-100 antialiased">{children}</body>
    </html>
  );
}
