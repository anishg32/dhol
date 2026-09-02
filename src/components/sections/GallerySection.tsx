"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const GALLERY_IMAGES = [
  "/images/new-image-1.jpg", // REPLACE THIS WITH YOUR FIRST IMAGE
  "/images/new-image-2.jpg", // REPLACE THIS WITH YOUR SECOND IMAGE
  "/images/new-image-3.jpg", // REPLACE THIS WITH YOUR THIRD IMAGE
  "/images/hero-bg.jpg",
  "/images/group-standing.jpg",
  "/images/group-sitting.jpg",
  "/images/group-traditional.jpg",
  "/images/group-sitting.jpg",
  "/images/hero-bg.jpg",
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-32 bg-brand-black border-y border-brand-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center animate-on-scroll">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-6">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              PORTFOLIO
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            VISUAL <span className="text-brand-red">EXPERIENCE</span>
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((src, idx) => (
            <div 
              key={idx} 
              className="relative overflow-hidden group cursor-pointer break-inside-avoid rounded-sm animate-on-scroll"
              style={{ animationDelay: `${(idx % 3) * 100}ms` }}
              onClick={() => setSelectedImage(src)}
            >
              <div className="absolute inset-0 bg-brand-red/80 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ZoomIn className="text-brand-white mb-2 w-8 h-8" />
                  <span className="text-brand-white font-bold tracking-[0.2em] text-xs">
                    VIEW FULL
                  </span>
                </div>
              </div>
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 p-4 md:p-12 backdrop-blur-md cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 text-brand-white/50 hover:text-brand-red transition-colors z-[101]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Gallery Lightbox"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
