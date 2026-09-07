"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Star, Quote, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*NEW FEEDBACK SUBMITTED*
Name: ${name}
Event: ${event}
Rating: ${rating} Stars
Feedback: ${feedback}
`;

    const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    // Reset and close
    setIsModalOpen(false);
    setName("");
    setEvent("");
    setFeedback("");
    setRating(5);
  };

  return (
    <section className="py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-brand-black to-brand-black opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16 text-center animate-on-scroll">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-6">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white mb-8">
            THE CROWD <span className="text-brand-red">SPEAKS.</span>
          </h2>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-block px-8 py-3 bg-brand-red/10 border border-brand-red text-brand-red text-sm tracking-widest uppercase hover:bg-brand-red hover:text-brand-black transition-all duration-300 font-bold"
          >
            Leave Feedback
          </button>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 -mx-6 px-6 lg:mx-0 lg:px-0 gap-6 animate-on-scroll">
          {siteConfig.testimonials.map((testimonial) => (
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
                &quot;{testimonial.quote}&quot;
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

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-brand-charcoal border border-brand-white/10 p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-brand-white/50 hover:text-brand-red transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-8">
                <h3 className="font-heading text-3xl font-bold text-brand-white mb-2">
                  RATE YOUR <span className="text-brand-red">EXPERIENCE</span>
                </h3>
                <p className="text-brand-white/50 text-sm">
                  Your feedback helps us improve our performances.
                </p>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          size={32} 
                          fill={(hoveredRating || rating) >= star ? "#FBBF24" : "transparent"} 
                          className={(hoveredRating || rating) >= star ? "text-brand-gold" : "text-brand-white/20"} 
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-brand-white/50 text-xs mt-3 uppercase tracking-widest">
                    {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 uppercase">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 uppercase">Event Type / Date</label>
                  <input 
                    type="text" 
                    required
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="Wedding - Oct 2026" 
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 uppercase">Your Feedback</label>
                  <textarea 
                    required
                    rows={4} 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors resize-none" 
                    placeholder="Tell us about the performance..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-brand-red text-brand-black font-bold tracking-[0.2em] hover:bg-brand-white transition-all duration-300 mt-8 flex items-center justify-center uppercase"
                >
                  Send Feedback
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
