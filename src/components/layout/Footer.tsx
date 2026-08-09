import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brand-black py-20 border-t border-brand-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-16 space-y-12 md:space-y-0">
          <div className="text-center md:text-left max-w-sm">
            <Link href="/" className="flex flex-col items-center md:items-start gap-2 mb-6 group">
              <span className="font-heading tracking-[0.3em] text-2xl text-brand-white font-bold mx-auto md:mx-0 group-hover:text-brand-red transition-colors">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-brand-gold font-bold tracking-[0.2em] text-xs mb-6">
              {siteConfig.description.toUpperCase()}
            </p>
            <p className="text-brand-white/50 text-sm leading-relaxed font-medium">
              Bringing the authentic beats of Nashik to life with cinematic premium performances.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold tracking-widest mb-6 text-sm text-brand-white/50">EXPLORE</h3>
            <nav className="flex flex-col space-y-4 text-center md:text-left text-brand-white font-bold text-sm tracking-wider">
              <Link href="/" className="hover:text-brand-red transition-colors">HOME</Link>
              <Link href="#about" className="hover:text-brand-red transition-colors">ABOUT</Link>
              <Link href="#events" className="hover:text-brand-red transition-colors">EVENTS</Link>
              <Link href="#gallery" className="hover:text-brand-red transition-colors">GALLERY</Link>
              <Link href="#contact" className="hover:text-brand-red transition-colors">CONTACT</Link>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold tracking-widest mb-6 text-sm text-brand-white/50">CONNECT</h3>
            <div className="flex space-x-6">
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="text-brand-white/70 hover:text-brand-red transition-transform hover:scale-110">
                <FaInstagram size={24} />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="text-brand-white/70 hover:text-brand-red transition-transform hover:scale-110">
                <FaYoutube size={24} />
              </a>
            </div>
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-8 text-sm tracking-wider font-bold text-brand-white hover:text-brand-red transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-brand-white/5 text-brand-white/30 text-[10px] font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} {siteConfig.name}. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
