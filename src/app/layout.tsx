import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF5EB",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nimish-portfolio.pages.dev"),
  title: "Nimish Jais | Associate Technical Analyst & Enterprise Document Automation Engineer",
  description:
    "Official portfolio of Nimish Jais — Associate Technical Analyst at Sapiens Technologies. Specializing in GhostDraft CCM, XSLT Data Mapping, P&C Insurance Workflows, and Enterprise Full-Stack Integrations.",
  keywords: [
    "Nimish Jais",
    "GhostDraft CCM",
    "Sapiens Technologies",
    "Associate Technical Analyst",
    "XSLT Data Mapping",
    "P&C Insurance",
    "Document Automation",
    "Software Engineer Bangalore",
    "Full-Stack Developer",
    "Java XML SQL"
  ],
  authors: [{ name: "Nimish Jais" }],
  openGraph: {
    title: "Nimish Jais | Enterprise Document Automation & Full-Stack Engineer",
    description:
      "Explore Nimish Jais's career journey at Sapiens Technologies, GhostDraft CCM architecture, Bravo Award recognition, and enterprise solutions.",
    url: "https://nimish-portfolio.pages.dev",
    siteName: "Nimish Jais — Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nimish Jais — GhostDraft Developer, AI Engineer, System Implementation Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimish Jais | Enterprise Document Automation & Full-Stack Engineer",
    description:
      "Explore Nimish Jais's career journey at Sapiens Technologies, GhostDraft CCM architecture, Bravo Award recognition, and enterprise solutions.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-amber-300 selection:text-amber-950">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
