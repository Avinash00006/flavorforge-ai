import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "../components/ErrorBoundary";
import BackgroundDecor from "../components/BackgroundDecor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FlavorForge AI — Culinary AI for Modern Food Brands",
  description:
    "AI-powered platform for generating sensory food product descriptions, brand positioning, and marketing copy.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#fbf9f5] dark:bg-[#0f0e0c] text-stone-900 dark:text-stone-100 transition-colors duration-300 relative"
        suppressHydrationWarning
      >
        <BackgroundDecor />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}