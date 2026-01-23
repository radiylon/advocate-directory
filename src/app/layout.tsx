import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./components/Providers";
import { AppDisclaimer } from "./components/AppDisclaimer";
import { Footer } from "./components/Footer";
import "./globals.css";

const lato = localFont({
  src: [
    { path: "../fonts/lato/lato-100.woff2", weight: "100", style: "normal" },
    { path: "../fonts/lato/lato-100-italic.woff2", weight: "100", style: "italic" },
    { path: "../fonts/lato/lato-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/lato/lato-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/lato/lato-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/lato/lato-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/lato/lato-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/lato/lato-700-italic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/lato/lato-900.woff2", weight: "900", style: "normal" },
    { path: "../fonts/lato/lato-900-italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-lato",
});

const mollieGlaston = localFont({
  src: "../fonts/mollie-glaston.ttf",
  weight: "400",
  variable: "--font-mollie-glaston",
});

export const metadata: Metadata = {
  title: "Advocate Directory",
  description: "A directory of health advocates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${mollieGlaston.variable} font-sans flex min-h-screen flex-col`}>
        <AppDisclaimer />
        <Providers>
          <div className="mx-auto w-full min-w-[320px] max-w-6xl px-6 md:pt-6 pb-12">
            <h1 className="hidden md:block mt-4 mb-6 text-4xl font-medium font-display text-center">Advocate Directory</h1>
            <Suspense fallback={<p className="text-lg text-center italic">Loading...</p>}>
              {children}
            </Suspense>
          </div>
        </Providers>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
