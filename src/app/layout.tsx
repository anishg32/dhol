import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { siteConfig } from "@/config/site";
import WhatsAppFAB from "@/components/ui/WhatsAppFAB";
import MobileStickyAction from "@/components/ui/MobileStickyAction";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-white selection:bg-brand-red/30 pb-[64px] md:pb-0">
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#D32F2F', // Brand red
                secondary: '#1A1A1A',
              },
            },
          }}
        />
        <WhatsAppFAB />
        <MobileStickyAction />
      </body>
    </html>
  );
}
