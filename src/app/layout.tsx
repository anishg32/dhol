import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Aliyanz | Premium Dhol Performance for Events & Celebrations",
  description: "Experience powerful Team Aliyanz performances for weddings, festivals, college events, corporate celebrations, processions and special occasions. Contact us for event bookings.",
  openGraph: {
    title: "Team Aliyanz | Premium Dhol Performance for Events & Celebrations",
    description: "Experience powerful Team Aliyanz performances for weddings, festivals, college events, corporate celebrations, processions and special occasions. Contact us for event bookings.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-white selection:bg-brand-red/30">
        {children}
      </body>
    </html>
  );
}
