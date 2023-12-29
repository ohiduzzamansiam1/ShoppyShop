import GoogleAnalytics from "@bradgarropy/next-google-analytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CartProvider from "./Providers";
import Navbar from "./components/Navbar";
import ShoppingCartModal from "./components/ShoppingCartModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppy Shop By Siam",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <ShoppingCartModal />
          <Navbar />
          <GoogleAnalytics measurementId="G-B5KC4GC7XQ" />
          {children}
          <Analytics />
          <SpeedInsights />
        </CartProvider>
      </body>
    </html>
  );
}
