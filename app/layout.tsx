import type { Metadata } from "next";
import { Figtree, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Nick Thomas",
    template: "Nick Thomas",
  },
  description:
    "Personal portfolio. Data Analyst/Scientist/Machine Learning Engineer.",
  openGraph: {
    type: "website",
  },
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${figtree.variable} ${dmSerif.variable} ${ibmPlexMono.variable} font-sans min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
