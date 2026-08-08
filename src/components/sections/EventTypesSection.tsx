"use client";

import { useRef } from "react";
import { EVENT_TYPES } from "@/config/data";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EventTypesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="events" className="py-32 bg-brand-charcoal relative" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div style={{ y }} className="mb-20 text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            WHERE THE <span className="text-brand-gold">RHYTHM</span> BELONGS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENT_TYPES.map((event, index) => (
            <div 
              key={event.title}
              className="group relative h-[450px] overflow-hidden bg-brand-black"
              data-cursor-text="VIEW"
            >
              <div className="absolute inset-0">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-[1px] bg-brand-gold mb-6 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <h3 className="font-heading text-2xl font-bold text-brand-white mb-2">{event.title}</h3>
                <p className="text-brand-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
