"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";

export default function PerformanceShowcaseSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="performances" className="relative bg-brand-black overflow-hidden py-32">
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-on-scroll">
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-brand-white mb-6 uppercase tracking-tight">
            FEEL THE <span className="text-brand-red">RHYTHM</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-white/80 font-medium">
            Not just music. An experience that moves the entire crowd.
          </p>
        </div>

        {/* Cinematic Video Placeholder */}
        <div 
          onClick={() => setIsPlaying(true)}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden group cursor-pointer animate-on-scroll shadow-[0_20px_50px_rgba(211,47,47,0.15)] ring-1 ring-brand-white/10"
        >
          <img 
            src="/images/hero-bg.jpg" 
            alt="Performance Video Thumbnail" 
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-brand-black/60 group-hover:bg-brand-black/30 transition-colors duration-500 flex flex-col items-center justify-center">
            
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-brand-white/30 bg-brand-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500 hover:scale-110 group-hover:shadow-[0_0_40px_rgba(211,47,47,0.6)]">
              <Play className="w-10 h-10 md:w-12 md:h-12 text-brand-white ml-2 transition-transform duration-500" />
            </div>
            
            <span className="mt-8 font-heading tracking-[0.3em] text-xs md:text-sm text-brand-white/80 group-hover:text-brand-white uppercase font-bold transition-colors duration-500">
              Watch The Experience
            </span>
          </div>
        </div>

        {/* Statistics below video */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 animate-on-scroll">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="text-center border-l border-brand-white/10 first:border-transparent">
              <div className="font-heading text-4xl md:text-5xl font-bold text-brand-white mb-2">
                {stat.value}
              </div>
              <div className="text-brand-white/50 text-xs tracking-[0.2em] uppercase font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 p-4 md:p-12 backdrop-blur-md"
          >
            <button 
              className="absolute top-6 right-6 text-brand-white/50 hover:text-brand-red transition-colors z-[101]"
              onClick={() => setIsPlaying(false)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-lg border border-brand-white/10 flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(211,47,47,0.15)]"
            >
              <video 
                src="/videos/performance.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-contain bg-black"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Optional Placeholder overlay if video isn't found */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 mix-blend-overlay">
                <Play size={48} className="text-brand-white/30 mb-4" />
                <p className="text-brand-white/50 text-sm tracking-widest uppercase font-bold">Main Performance Video</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
