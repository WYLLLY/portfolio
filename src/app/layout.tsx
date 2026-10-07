import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/content/site";
import { getSiteUrl } from "@/content/site-url";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: `${site.name} | Software & Backend Engineer`,
  description: site.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: `${site.name} | Software & Backend Engineer`,
    description: site.description,
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
