import type { Metadata } from "next";

import { Geist, Geist_Mono, Instrument_Serif, Roboto_Flex } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
});
const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "deanon",
  description:
    "",
  viewport: "width=device-width, initial-scale=1.0",

  openGraph: {
    type: "website",
    url: "",
    title: "deanon",
    description: "Check out my site.",
    images: [
      {
        url: "https://nikhil-rajpurohit.vercel.app/og2.png",
        width: 1200,
        height: 630,
        alt: "deanon",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "deanon",
    description: "Check out my projects.",
    images: [
      {
        url: "https://nikhil-rajpurohit.vercel.app/og2.png",
        width: 1200,
        height: 630,
        alt: "deanon",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}  ${robotoFlex.variable} antialiased  bg-grid-fade`}
      >
        {children}
      </body>
    </html>
  );
}