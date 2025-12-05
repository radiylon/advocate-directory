import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "./components/Providers";
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
  title: "Solace Advocates",
  description: "A directory of Solace Health advocates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${mollieGlaston.variable} font-sans`}>
        <Providers>
          <div className="p-6">
            <h1 className="mb-6 text-3xl font-normal font-display">Solace Advocates</h1>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
