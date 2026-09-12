import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Page Not Found | ${siteConfig.name}`,
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black to-brand-charcoal z-10" />
        <div className="absolute inset-0 opacity-20 mix-blend-screen bg-[url('/images/noise.png')] z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 animate-fade-in">
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-brand-red mb-4 tracking-tighter drop-shadow-lg">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-white mb-6 uppercase tracking-widest">
          Lost the Rhythm?
        </h2>
        <p className="text-brand-white/70 max-w-md mx-auto mb-10 text-lg">
          The page you are looking for has been moved or no longer exists. Let&apos;s get you back to the performance.
        </p>
        <Link 
          href="/" 
          className="inline-block px-10 py-4 bg-brand-red text-brand-black font-bold tracking-[0.2em] text-sm hover:bg-brand-white transition-all duration-300 shadow-[0_0_20px_rgba(211,47,47,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
