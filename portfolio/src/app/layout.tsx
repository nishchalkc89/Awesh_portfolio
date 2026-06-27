import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Md. Awesh Shekh — Creative Designer & Visual Storyteller",
  description:
    "Portfolio of Md. Awesh Shekh — graphic designer specializing in brand identity, editorial design, packaging, and campaign visuals. Based in Kathmandu, Nepal.",
  keywords: [
    "graphic designer", "brand identity", "editorial design", "packaging design",
    "Nepal designer", "logo design", "creative director", "Awesh Shekh"
  ],
  authors: [{ name: "Md. Awesh Shekh" }],
  openGraph: {
    title: "Md. Awesh Shekh — Creative Designer",
    description: "Design that feels as good as it looks. Brand identity, editorial, packaging, and campaign visuals.",
    type: "website",
    url: "https://mohammadaweshshekh.com.np",
    siteName: "Md. Awesh Shekh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Awesh Shekh — Creative Designer",
    description: "Design that feels as good as it looks.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080B14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <body
        className="antialiased bg-bg-primary text-text-primary overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
