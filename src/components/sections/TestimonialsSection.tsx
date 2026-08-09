"use client";

import { siteConfig } from "@/config/site";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-brand-black to-brand-black opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20 text-center animate-on-scroll">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-6">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            THE CROWD <span className="text-brand-red">SPEAKS.</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 -mx-6 px-6 lg:mx-0 lg:px-0 gap-6 animate-on-scroll">
          {siteConfig.testimonials.map((testimonial, idx) => (
            <div 
              key={testimonial.id}
              className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[40vw] bg-brand-charcoal p-10 md:p-12 border border-brand-white/5 rounded-sm hover:-translate-y-2 transition-transform duration-500 shadow-xl relative"
            >
              <Quote className="absolute top-8 right-8 text-brand-white/5 w-16 h-16 md:w-24 md:h-24" />
              <div className="flex space-x-1 text-brand-gold mb-8 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-brand-white/90 text-lg md:text-xl italic mb-10 font-serif leading-relaxed relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-brand-white/10 pt-6 relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-brand-white font-bold tracking-wider text-sm mb-1">{testimonial.author}</p>
                  <p className="text-brand-red text-xs font-bold tracking-widest">{testimonial.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
