"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const GALLERY_IMAGES = [
  "/images/hero-bg.jpg",
  "/images/group-standing.jpg",
  "/images/group-sitting.jpg",
  "/images/group-traditional.jpg",
  "/images/wedding.jpg",
  "/images/festival.jpg",
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-32 bg-brand-charcoal">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            VISUAL <span className="text-brand-red">EXPERIENCE</span>
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((src, idx) => (
            <div 
              key={idx} 
              className="relative overflow-hidden group cursor-pointer break-inside-avoid rounded-sm"
              onClick={() => setSelectedImage(src)}
              data-cursor-text="EXPAND"
            >
              <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <span className="text-brand-red font-bold tracking-widest text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  VIEW IMAGE
                </span>
              </div>
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 p-4 md:p-12 backdrop-blur-sm cursor-zoom-out"
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
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
