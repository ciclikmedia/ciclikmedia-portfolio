import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Noise from "@/components/ui/Noise/Noise";
import Cursor from "@/components/ui/Cursor/Cursor";

import { TransitionProvider } from "@/transition/TransitionProvider";
import ProjectTransitionProvider from "@/project-transition/ProjectTransitionProvider";

import Providers from "@/providers/Providers";
import Footer from "@/components/layout/Footer/Footer";

import "@/styles/globals.scss";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <ProjectTransitionProvider>
            <Noise />

            <Cursor />

            <Header />

            <TransitionProvider>
              {children}
            </TransitionProvider>

            <Footer />
          </ProjectTransitionProvider>
        </Providers>
      </body>
    </html>
  );
}