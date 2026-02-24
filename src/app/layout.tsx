import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getStorefrontConfig } from "@/lib/api/storefront";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { ToastContainer } from "@/components/ui/Toast";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
    const config = await getStorefrontConfig();
    return {
        title: {
            default: config.seoTitle || config.name || "ZevCommerce Store",
            template: `%s | ${config.name || "ZevCommerce Store"}`,
        },
        description: config.seoDescription || "A modern ecommerce store powered by ZevCommerce",
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const config = await getStorefrontConfig();
    const storeName = process.env.NEXT_PUBLIC_STORE_NAME || config.name || "Store";

    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className="font-sans min-h-screen flex flex-col bg-surface text-text-primary antialiased">
                <Providers config={config}>
                    <DemoBanner />
                    <Header storeName={storeName} />
                    <main className="flex-1 flex flex-col">
                        {children}
                    </main>
                    <Footer storeName={storeName} />
                    <CartDrawer />
                    <ToastContainer />
                </Providers>
            </body>
        </html>
    );
}
