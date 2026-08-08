import Link from "next/link";
import { BRAND } from "@/config/data";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brand-black py-20 border-t border-brand-charcoal relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-16 space-y-12 md:space-y-0">
          <div className="text-center md:text-left max-w-sm">
            <Link href="/" className="flex flex-col items-center md:items-start gap-2 mb-6 group">
              <div className="relative h-14 w-48 overflow-hidden rounded bg-brand-black">
                <img 
                  src="/images/logo.png" 
                  alt="Team Aliyanz Logo" 
                  className="absolute w-[200%] max-w-none h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
                />
              </div>
              <span className="font-heading tracking-[0.3em] text-sm text-brand-white font-bold mx-auto md:mx-0 group-hover:text-brand-red transition-colors">TEAM ALIYANZ</span>
            </Link>
            <p className="text-brand-red font-bold tracking-[0.2em] text-xs mb-6">
              {BRAND.tagline}
            </p>
            <p className="text-brand-white/70 text-sm leading-relaxed">
              {BRAND.description}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold tracking-widest mb-6 text-lg">EXPLORE</h3>
            <nav className="flex flex-col space-y-4 text-center md:text-left text-brand-white/70 text-sm tracking-wider">
              <Link href="/" className="hover:text-brand-red transition-colors">HOME</Link>
              <Link href="#about" className="hover:text-brand-red transition-colors">ABOUT</Link>
              <Link href="#events" className="hover:text-brand-red transition-colors">EVENTS</Link>
              <Link href="#gallery" className="hover:text-brand-red transition-colors">GALLERY</Link>
              <Link href="#contact" className="hover:text-brand-red transition-colors">CONTACT</Link>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold tracking-widest mb-6 text-lg">CONNECT</h3>
            <div className="flex space-x-6">
              <a href={BRAND.socials.instagram} target="_blank" rel="noreferrer" className="text-brand-white/70 hover:text-brand-red transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href={BRAND.socials.facebook} target="_blank" rel="noreferrer" className="text-brand-white/70 hover:text-brand-red transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href={BRAND.socials.youtube} target="_blank" rel="noreferrer" className="text-brand-white/70 hover:text-brand-red transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
            <a 
              href={`mailto:${BRAND.email}`}
              className="mt-8 text-sm tracking-wider text-brand-white/70 hover:text-brand-red transition-colors"
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-brand-charcoal text-brand-white/40 text-xs tracking-widest">
          &copy; {new Date().getFullYear()} {BRAND.name}. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
