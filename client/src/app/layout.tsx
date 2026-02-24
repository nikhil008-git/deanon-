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

  openGraph: {
    type: "website",
    url: "",
    title: "DeAnon.",
    description: "Check out my site.",
    images: [
      {
        url: "https://deanon-inky.vercel.app/deanon.png",
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
    description: "real time chat app.",
    images: [
      {
        url: "https://deanon-inky.vercel.app/deanon.png",
        width: 1200,
        height: 630,
        alt: "deanon",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
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