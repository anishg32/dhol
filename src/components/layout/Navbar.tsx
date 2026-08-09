"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "#about" },
  { name: "PERFORMANCES", href: "#performances" },
  { name: "EVENTS", href: "#events" },
  { name: "GALLERY", href: "#gallery" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Basic active section detection
      const sections = NAV_LINKS.map(link => link.href.substring(1)).filter(Boolean);
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 150)) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-brand-black/70 backdrop-blur-lg py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-brand-white/10" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-center gap-1 group" data-cursor-text="HOME">
          <div className={`relative overflow-hidden flex items-center justify-center rounded bg-brand-black transition-all duration-500 ${isScrolled ? "h-8 w-24" : "h-10 w-32"}`}>
            <img 
              src="/images/logo.png" 
              alt="Nashik Dhol Logo" 
              className="absolute w-[200%] max-w-none h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
            />
          </div>
          <span className={`font-heading tracking-[0.2em] font-bold group-hover:text-brand-red transition-all duration-500 ${isScrolled ? "text-[8px] text-brand-white/80" : "text-[10px] text-brand-white"}`}>
            TEAM ALIYANZ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? activeSection === "" : activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-widest transition-colors relative py-2 ${isActive ? "text-brand-red" : "text-brand-white/80 hover:text-brand-white"}`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <a
            href="#contact"
            className="ml-4 px-6 py-2.5 bg-brand-red/10 border border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-black transition-all duration-300 font-bold tracking-widest text-xs"
          >
            BOOK NOW
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-white hover:text-brand-red transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            className="fixed inset-0 bg-brand-black/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-brand-white/80 hover:text-brand-red transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center space-y-8 w-full px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-4xl tracking-widest text-brand-white hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.1 }}
                className="w-full max-w-xs pt-8"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-8 py-4 bg-brand-red text-brand-black font-bold tracking-widest text-lg rounded-sm"
                >
                  BOOK NOW
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
