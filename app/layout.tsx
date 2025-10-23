import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexaPeptidesRX | Research Peptides and Compounds",
  description:
    "NexaPeptidesRX provides premium research-grade peptides and compounds for laboratory use only. Explore our trusted catalog today.",
  other: {
    "google-site-verification": "iA_eRcOomn5SFAz3BT5sTM6cyjLn9UXrlVJYJOsYaGE",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
