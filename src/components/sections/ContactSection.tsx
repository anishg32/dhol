"use client";

import { useState } from "react";
import { BRAND } from "@/config/data";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-brand-black relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white mb-6">
              MAKE YOUR EVENT <br />
              <span className="text-brand-red">UNFORGETTABLE.</span>
            </h2>
            <p className="text-brand-white/70 text-lg mb-12 max-w-md">
              Tell us about your event and our team will get in touch with you.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-brand-white font-bold tracking-widest text-sm mb-2">CALL US</h4>
                <a href={`tel:${BRAND.phone}`} className="text-brand-red text-2xl font-heading hover:text-brand-white transition-colors">{BRAND.phone}</a>
              </div>
              <div>
                <h4 className="text-brand-white font-bold tracking-widest text-sm mb-2">WHATSAPP</h4>
                <a href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-brand-red text-2xl font-heading hover:text-brand-white transition-colors">{BRAND.whatsapp}</a>
              </div>
              <div>
                <h4 className="text-brand-white font-bold tracking-widest text-sm mb-2">LOCATION</h4>
                <p className="text-brand-white/80">{BRAND.location}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-brand-charcoal/30 backdrop-blur-sm -m-8 p-8 border border-brand-white/5 rounded-2xl z-0 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[500px] text-center"
                  >
                    <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-brand-white mb-4">ENQUIRY RECEIVED</h3>
                    <p className="text-brand-white/70">We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-brand-white/60">NAME</label>
                        <input required type="text" className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" placeholder="Your Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-brand-white/60">PHONE NUMBER</label>
                        <input required type="tel" className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" placeholder="Your Phone" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-brand-white/60">EVENT TYPE</label>
                        <select className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors appearance-none">
                          <option value="wedding">Wedding</option>
                          <option value="festival">Festival</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-brand-white/60">EVENT DATE</label>
                        <input type="date" className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-brand-white/60">MESSAGE</label>
                      <textarea rows={4} className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors resize-none" placeholder="Tell us more about your event..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-brand-red text-brand-black font-bold tracking-[0.2em] hover:bg-brand-white transition-colors mt-8 disabled:opacity-70 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "SEND ENQUIRY"
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
