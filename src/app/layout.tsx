import type { Metadata } from "next";
import { Suspense } from "react";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./components/Providers";
import { AppDisclaimer } from "./components/AppDisclaimer";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
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
      <body className={`${lato.variable} ${mollieGlaston.variable} font-sans`}>
        <AppDisclaimer />
        <Providers>
          <div className="mx-auto max-w-6xl p-6">
            <h1 className="mt-4 mb-6 text-4xl font-normal font-display text-center">Advocate Directory</h1>
            <Suspense fallback={<p className="text-lg text-center italic">Loading...</p>}>
              {children}
            </Suspense>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
