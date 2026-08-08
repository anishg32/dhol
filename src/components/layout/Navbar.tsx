"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/config/data";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "#about" },
  { name: "EVENTS", href: "#events" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "GALLERY", href: "#gallery" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-brand-black/80 backdrop-blur-md py-4 shadow-xl" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold tracking-widest text-brand-white" data-cursor-text="HOME">
          TEAM <span className="text-brand-gold">ALYAAN</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-widest hover:text-brand-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 font-bold tracking-widest text-sm"
          >
            BOOK NOW
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-white"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 bg-brand-black z-50 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-brand-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-3xl tracking-widest hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 px-8 py-3 bg-brand-gold text-brand-black font-bold tracking-widest text-lg"
              >
                BOOK NOW
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
