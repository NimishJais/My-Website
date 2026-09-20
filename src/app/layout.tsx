import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  themeColor: "#F8FAFC",
};

export const metadata: Metadata = {
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
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
        {children}
      </body>
    </html>
  );
}
