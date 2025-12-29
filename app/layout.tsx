import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthModalManager from "@/components/auth/AuthModalManager";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ElectroShop - Premium Electronic Accessories",
  description: "Your trusted destination for premium electronic accessories. Quality products, great prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AuthModalManager />
      </body>
    </html>
  );
}
