"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Cinematic intro animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(".hero-overlay", {
        opacity: 0,
        duration: 2.5,
        ease: "power2.inOut",
      })
      .from(".hero-label", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=1.5")
      .from(".hero-title-line", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      }, "-=1.2")
      .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
      }, "-=0.8")
      .from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
      }, "-=0.6");
      
      // Continuous rhythmic animation for the red text
      gsap.to(".hero-red-text", {
        scale: 1.05,
        textShadow: "0 0 40px rgba(211, 47, 47, 0.6)",
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2.5
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black" id="home">
      {/* Background Image / Video with Parallax */}
      <div className="absolute inset-0 z-0 animate-parallax">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/60 to-brand-black/95 z-10" />
        <img 
          src="/images/hero-bg.jpg" 
          alt="Premium Nashik Dhol Performance" 
          className="w-full h-full object-cover object-center scale-110 animate-[slow-pan_40s_linear_infinite_alternate]"
        />
        {/* Dust Particles overlay placeholder */}
        <div className="absolute inset-0 opacity-20 mix-blend-screen bg-[url('/images/noise.png')] z-10 pointer-events-none" />
      </div>

      {/* Intro Black Screen Overlay */}
      <div className="hero-overlay absolute inset-0 bg-brand-black z-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 text-center flex flex-col items-center mt-12 md:mt-0">
        <div className="hero-label inline-block px-4 py-1.5 border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-sm rounded-full mb-8">
          <span className="font-heading tracking-[0.25em] text-[10px] md:text-xs text-brand-gold uppercase font-bold">
            NASHIK DHOL • LIVE EVENT EXPERIENCE
          </span>
        </div>
        
        <div className="overflow-hidden mb-2">
          <h1 className="hero-title-line font-heading text-5xl md:text-7xl lg:text-8xl md:tracking-[-0.02em] font-bold text-brand-white leading-tight md:leading-none">
            PREMIUM LIVE
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1 className="hero-title-line font-heading text-5xl md:text-7xl lg:text-8xl md:tracking-[-0.02em] font-bold text-brand-white leading-tight md:leading-none">
            <span className="hero-red-text text-brand-red inline-block origin-center mr-4 md:mr-6">DHOL</span> 
            PERFORMANCE
          </h1>
        </div>

        <p className="hero-subtitle text-base md:text-xl text-brand-white/80 max-w-2xl font-medium tracking-wider mb-12">
          Powerful rhythms. Unforgettable celebrations.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <a 
            href="#contact" 
            className="hero-cta w-full sm:w-auto px-10 py-4 bg-brand-red text-brand-black font-bold tracking-[0.2em] text-sm hover:bg-brand-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(211,47,47,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            data-cursor-text="BOOK"
          >
            BOOK NOW
          </a>
          <a 
            href="#performances" 
            className="hero-cta w-full sm:w-auto px-10 py-4 border border-brand-white/30 text-brand-white font-bold tracking-[0.2em] text-sm hover:bg-brand-white/10 hover:border-brand-white transition-all duration-300"
          >
            WATCH PERFORMANCE
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-70 animate-pulse">
        <span className="text-[9px] tracking-[0.3em] font-bold text-brand-white mb-4 hidden md:block">SCROLL TO DISCOVER</span>
        <div className="w-[1px] h-16 md:h-12 bg-gradient-to-b from-brand-red to-transparent" />
      </div>
    </section>
  );
}
