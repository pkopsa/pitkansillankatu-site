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
  title: "Pitkänsillankatu 33 A 13 – Kokkola | 69 m² | 99 200 €",
  description:
    "Muuttovalmis sijoitusasunto Kokkolan ydinkeskustassa. 69 m², ylin kerros, bruttovuokratuotto 9–10 %. Ota yhteyttä: Petri Kopsa, +358 50 306 0635.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
