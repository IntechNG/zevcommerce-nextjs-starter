import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Switch to Inter for modern commerce aesthetic
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ZevCommerce Starter",
  description: "A premium Next.js 15 storefront powered by ZevCommerce Headless API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen flex flex-col bg-surface text-text-primary antialiased">
        <Navbar />
        {/* Main Content Area: Takes up remaining space pushing footer down */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
