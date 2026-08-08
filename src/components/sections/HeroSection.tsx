"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Cinematic intro animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(".hero-overlay", {
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
      })
      .from(".hero-title-line", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      }, "-=1")
      .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
      }, "-=0.5")
      .from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
      }, "-=0.8");
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Image / Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-black z-10" />
        <img 
          src="/images/hero-bg.jpg" 
          alt="Team Alyaan Performance" 
          className="w-full h-full object-cover object-center scale-105 animate-[slow-pan_30s_linear_infinite_alternate]"
        />
        {/* Dust Particles overlay placeholder */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[url('/images/noise.png')] z-10 pointer-events-none" />
      </div>

      {/* Intro Black Screen Overlay */}
      <div className="hero-overlay absolute inset-0 bg-brand-black z-40" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        <div className="overflow-hidden mb-2">
          <h1 className="hero-title-line font-heading text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-brand-white leading-none">
            THE RHYTHM
          </h1>
        </div>
        <div className="overflow-hidden mb-2">
          <h1 className="hero-title-line font-heading text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-brand-gold leading-none">
            THAT MOVES
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1 className="hero-title-line font-heading text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-brand-white leading-none">
            THE CROWD.
          </h1>
        </div>

        <p className="hero-subtitle text-lg md:text-xl text-brand-white/80 max-w-2xl font-medium tracking-wide mb-12">
          Premium Team Alyaan performances for unforgettable celebrations and events.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href="#contact" 
            className="hero-cta px-10 py-4 bg-brand-gold text-brand-black font-bold tracking-[0.2em] hover:bg-brand-white transition-colors duration-300"
            data-cursor-text="BOOK"
          >
            BOOK A PERFORMANCE
          </a>
          <a 
            href="#events" 
            className="hero-cta px-10 py-4 border border-brand-white/30 text-brand-white font-bold tracking-[0.2em] hover:bg-brand-white/10 transition-colors duration-300"
          >
            EXPLORE OUR EVENTS
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-70 animate-pulse">
        <span className="text-[10px] tracking-[0.3em] font-bold text-brand-white mb-4">SCROLL TO EXPERIENCE</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  );
}
