import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Jan | Talatona - Belas - Angola",
  description:
    "Hotel Jan: conforto, elegância e hospitalidade em Camama, Talatona, Belas - Angola. Reserve já a sua estadia inesquecível.",
  keywords: [
    "Hotel Jan",
    "hotel Angola",
    "hotel Talatona",
    "hospedagem Belas",
    "reserva de quartos Angola",
  ],
  authors: [{ name: "Hotel Jan" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Navbar />
        <main className="container mx-auto px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
