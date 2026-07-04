import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/layout/Header";

import Cursor from '@/components/ui/Cursor/Cursor';

import TransitionOverlay from "@/components/TransitionOverlay/TransitionOverlay";

import "@/styles/globals.scss";

import Providers from "@/providers/Providers";

import Footer from "@/components/layout/Footer/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ciclikmedia Portfolio 2026",
  description: "Premium frontend portfolio by Ciclikmedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>

          <Cursor />      

          <TransitionOverlay />

           <Header />    

          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}