"use client";

import { useState } from "react";
import { Play, Volume2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const REELS = [
  { id: 1, title: "Wedding Baraat", poster: "/images/group-standing.jpg" },
  { id: 2, title: "Corporate Event", poster: "/images/group-sitting.jpg" },
  { id: 3, title: "Festival Rhythm", poster: "/images/hero-bg.jpg" },
  { id: 4, title: "Grand Entry", poster: "/images/group-traditional.jpg" },
];

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section className="py-32 bg-brand-charcoal overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center animate-on-scroll">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-6">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              LIVE ACTION
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            WATCH THE <span className="text-brand-red">ENERGY</span>
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
          {REELS.map((reel, idx) => (
            <div 
              key={reel.id} 
              className="relative shrink-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-xl overflow-hidden snap-center group cursor-pointer animate-on-scroll"
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => setActiveVideo(reel.id)}
            >
              <img 
                src={reel.poster} 
                alt={reel.title} 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 grayscale group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                <div className="w-16 h-16 rounded-full bg-brand-white/10 backdrop-blur-md flex items-center justify-center border border-brand-white/30 text-brand-white group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-brand-black transition-colors duration-300">
                  <Play size={24} className="ml-1" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2 text-brand-white/50 group-hover:text-brand-white transition-colors">
                  <Volume2 size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Original Audio</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-white group-hover:text-brand-gold transition-colors">{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 p-4 md:p-12 backdrop-blur-md"
          >
            <button 
              className="absolute top-6 right-6 text-brand-white/50 hover:text-brand-red transition-colors z-[101]"
              onClick={() => setActiveVideo(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm aspect-[9/16] bg-brand-charcoal rounded-xl border border-brand-white/10 flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(211,47,47,0.15)]"
            >
              <img src={REELS.find(r => r.id === activeVideo)?.poster} alt="Poster" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" />
              <div className="relative z-10 flex flex-col items-center">
                <Play size={48} className="text-brand-white/30 mb-4" />
                <p className="text-brand-white/50 text-sm tracking-widest uppercase font-bold">Video Player Placeholder</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
