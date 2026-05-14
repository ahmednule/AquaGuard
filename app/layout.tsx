import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AquaGuard — Smart Community Water Monitor",
  description:
    "IoT-powered water quality, level, theft detection and M-Pesa billing for Kenyan communities.",
  keywords: ["water monitoring", "IoT Kenya", "water quality", "smart tank", "AquaGuard"],
  openGraph: {
    title: "AquaGuard",
    description: "Smart Community Water Quality & Security Monitor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
