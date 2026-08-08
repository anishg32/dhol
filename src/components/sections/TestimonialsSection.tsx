"use client";

import { TESTIMONIALS } from "@/config/data";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-brand-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-brand-black to-brand-black opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            THE CROWD <span className="text-brand-gold">SPEAKS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-brand-charcoal/50 backdrop-blur-sm p-10 border border-brand-white/5 rounded-sm hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex space-x-1 text-brand-gold mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-brand-white/80 text-lg italic mb-8 font-serif leading-relaxed">
                "{testimonial.review}"
              </p>
              <div className="border-t border-brand-white/10 pt-6">
                <p className="text-brand-white font-bold tracking-widest text-sm mb-1">{testimonial.name}</p>
                <p className="text-brand-gold text-xs font-bold tracking-widest">{testimonial.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
