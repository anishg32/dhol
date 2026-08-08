"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-32 bg-brand-black relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            WATCH THE <span className="text-brand-red">ENERGY.</span>
          </h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-video group cursor-pointer" onClick={() => setIsPlaying(true)} data-cursor-text="PLAY">
          {/* Video Placeholder Poster */}
          <div className="absolute inset-0 overflow-hidden border border-brand-white/10 rounded-sm">
            <img 
              src="/images/hero-bg.jpg" 
              alt="Video Placeholder" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors duration-500" />
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-brand-red bg-brand-black/50 backdrop-blur-sm flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-brand-black transition-all duration-500 hover:scale-110">
              <Play size={32} className="ml-2" />
            </div>
          </div>
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
              className="w-full max-w-6xl aspect-video bg-black rounded-sm border border-brand-white/10 flex items-center justify-center"
            >
              <div className="text-brand-white/50 flex flex-col items-center">
                <Play size={48} className="mb-4 opacity-50" />
                <p className="tracking-widest text-sm">[ VIDEO PLACEHOLDER ]</p>
                <p className="text-xs mt-2 text-brand-white/30">Replace with actual performance video</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
