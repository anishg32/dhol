"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SimpleContactSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const responseData = await res.json();
        setError(responseData.error || "Failed to send message.");
      }
    } catch (err) {
      setError("Unable to send message right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-brand-black relative border-t border-brand-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-brand-white mb-6">
            HAVE A <span className="text-brand-red">QUESTION?</span>
          </h2>
          <p className="text-brand-white/70 text-lg">
            Not ready to book yet? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center border border-brand-white/10 bg-brand-charcoal rounded-sm"
              >
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-brand-white mb-3">
                  Message Sent
                </h3>
                <p className="text-brand-white/70 mb-6">
                  Thank you for reaching out! We'll reply to your email soon.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2 border border-brand-white/20 text-xs tracking-widest uppercase hover:bg-brand-white/5 transition-colors rounded-sm text-brand-white"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {error && (
                  <div className="bg-brand-red/10 border border-brand-red text-brand-red px-4 py-3 rounded-sm text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">FULL NAME</label>
                    <input 
                      name="name"
                      required
                      type="text" 
                      className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EMAIL ADDRESS</label>
                    <input 
                      name="email"
                      required
                      type="email" 
                      className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">PHONE NUMBER (OPTIONAL)</label>
                  <input 
                    name="phone"
                    type="tel" 
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="+91 98765 43210" 
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">YOUR MESSAGE</label>
                  <textarea 
                    name="message"
                    required
                    rows={4} 
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors resize-none" 
                    placeholder="How can we help you?"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 border border-brand-red text-brand-red font-bold tracking-[0.2em] hover:bg-brand-red hover:text-brand-black transition-all duration-300 mt-4 disabled:opacity-70 flex items-center justify-center uppercase text-sm"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
