import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const metadata: Metadata = {
  title: "Generative Components",
  description: "A collection of components for building generative interfaces.",
  metadataBase: new URL("https://ui.danielsi.ms"),
  openGraph: {
    url: "https://ui.danielsi.ms",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className}`}>{children}</body>
    </html>
  );
}
