"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
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

  const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <section id="contact" className="py-32 bg-brand-charcoal relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="animate-on-scroll">
            <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-6">
              <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
                BOOK NOW
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white mb-6">
              MAKE YOUR EVENT <br />
              <span className="text-brand-red">UNFORGETTABLE.</span>
            </h2>
            <p className="text-brand-white/70 text-lg mb-12 max-w-md">
              Tell us about your event and our team will get in touch with you to create a customized performance package.
            </p>
            
            <div className="space-y-10">
              <div className="group">
                <h4 className="text-brand-white/50 font-bold tracking-widest text-xs mb-3">CALL US</h4>
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-brand-white text-2xl md:text-3xl font-heading group-hover:text-brand-red transition-colors">{siteConfig.contact.phone}</a>
              </div>
              <div className="group">
                <h4 className="text-brand-white/50 font-bold tracking-widest text-xs mb-3">WHATSAPP</h4>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="text-brand-white text-2xl md:text-3xl font-heading group-hover:text-[#25D366] transition-colors">{siteConfig.contact.whatsapp}</a>
              </div>
              <div>
                <h4 className="text-brand-white/50 font-bold tracking-widest text-xs mb-3">LOCATION / SERVICE AREA</h4>
                <p className="text-brand-white text-lg">{siteConfig.contact.location}</p>
              </div>
            </div>
          </div>

          <div className="relative animate-on-scroll">
            <div className="absolute inset-0 bg-brand-black border border-brand-white/5 rounded-sm z-0 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 p-8 md:p-12">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[600px] text-center"
                  >
                    <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mb-8">
                      <svg className="w-12 h-12 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-4xl font-bold text-brand-white mb-4">ENQUIRY RECEIVED</h3>
                    <p className="text-brand-white/70 text-lg mb-8">We will contact you shortly to discuss your event.</p>
                    <p className="text-brand-white/50 text-sm">Need immediate assistance? <a href={whatsappLink} className="text-[#25D366] hover:underline">WhatsApp Us</a></p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">FULL NAME</label>
                        <input required type="text" className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">PHONE NUMBER</label>
                        <input required type="tel" className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EVENT TYPE</label>
                        <select required defaultValue="" className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors appearance-none">
                          <option value="" disabled>Select Event</option>
                          {siteConfig.events.map(e => (
                            <option key={e.title} value={e.title.toLowerCase()}>{e.title}</option>
                          ))}
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EVENT DATE</label>
                        <input required type="date" className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white/50 focus:text-brand-white focus:outline-none focus:border-brand-red transition-colors [color-scheme:dark]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EVENT LOCATION</label>
                      <input required type="text" className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" placeholder="City, Venue Name" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">NUMBER OF PERFORMERS</label>
                        <select className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors appearance-none">
                          <option value="standard">Standard (10-15)</option>
                          <option value="large">Large (20-30)</option>
                          <option value="grand">Grand (40+)</option>
                          <option value="custom">Not sure, need advice</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">PERFORMANCE DURATION</label>
                        <select className="w-full bg-brand-black border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors appearance-none">
                          <option value="1">1 Hour</option>
                          <option value="2">2 Hours</option>
                          <option value="3">3+ Hours</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">ADDITIONAL REQUIREMENTS</label>
                      <textarea rows={3} className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors resize-none" placeholder="Any specific requests?"></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-brand-red text-brand-black font-bold tracking-[0.2em] hover:bg-brand-white transition-all duration-300 mt-8 disabled:opacity-70 flex items-center justify-center group shadow-[0_0_20px_rgba(211,47,47,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="group-hover:scale-105 transition-transform">SEND ENQUIRY</span>
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
