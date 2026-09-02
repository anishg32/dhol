"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  email: z.string().email("Valid email is required"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().min(1, "Date is required"),
  eventStartTime: z.string().min(1, "Start time is required"),
  eventEndTime: z.string().min(1, "End time is required"),
  eventLocation: z.string().min(1, "Location is required"),
  expectedCrowd: z.string().min(1, "Expected crowd is required"),
  requirements: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function ContactSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.ok) {
        setBookingId(responseData.bookingId);
        setIsSuccess(true);
      } else {
        setServerError(responseData.error || "Something went wrong.");
      }
    } catch (error) {
      setServerError("Unable to submit your booking right now. Please try again.");
    }
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
            
            <div className="relative z-10 p-8 md:p-12">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[650px] text-center"
                  >
                    <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mb-8">
                      <svg className="w-12 h-12 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-brand-white mb-4">
                      Booking Request Submitted Successfully
                    </h3>
                    <div className="bg-brand-charcoal border border-brand-white/10 p-4 rounded-sm mb-6 inline-block">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-1">BOOKING ID</span>
                      <span className="font-mono text-xl text-brand-red">{bookingId}</span>
                    </div>
                    <p className="text-brand-white/70 text-lg mb-8">
                      We have received your booking request and our team will contact you shortly to confirm the details.
                    </p>
                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                        setBookingId(null);
                        reset();
                      }}
                      className="px-6 py-3 border border-brand-white/20 text-sm tracking-widest uppercase hover:bg-brand-white/5 transition-colors rounded-sm"
                    >
                      Book Another Event
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {serverError && (
                      <div className="bg-brand-red/10 border border-brand-red text-brand-red px-4 py-3 rounded-sm text-sm">
                        {serverError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">FULL NAME</label>
                        <input 
                          {...register("customerName")}
                          type="text" 
                          className={`w-full bg-transparent border-b ${errors.customerName ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors`} 
                          placeholder="John Doe" 
                        />
                        {errors.customerName && <p className="text-brand-red text-xs mt-1">{errors.customerName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">MOBILE NUMBER</label>
                        <input 
                          {...register("mobileNumber")}
                          type="tel" 
                          className={`w-full bg-transparent border-b ${errors.mobileNumber ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors`} 
                          placeholder="+91 98765 43210" 
                        />
                        {errors.mobileNumber && <p className="text-brand-red text-xs mt-1">{errors.mobileNumber.message}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">WHATSAPP NUMBER</label>
                        <input 
                          {...register("whatsappNumber")}
                          type="tel" 
                          className={`w-full bg-transparent border-b ${errors.whatsappNumber ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors`} 
                          placeholder="+91 98765 43210" 
                        />
                        {errors.whatsappNumber && <p className="text-brand-red text-xs mt-1">{errors.whatsappNumber.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EMAIL ADDRESS</label>
                        <input 
                          {...register("email")}
                          type="email" 
                          className={`w-full bg-transparent border-b ${errors.email ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors`} 
                          placeholder="john@example.com" 
                        />
                        {errors.email && <p className="text-brand-red text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EVENT TYPE</label>
                        <select 
                          {...register("eventType")}
                          defaultValue="" 
                          className={`w-full bg-brand-black border-b ${errors.eventType ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors appearance-none`}
                        >
                          <option value="" disabled>Select Event</option>
                          {siteConfig.events.map(e => (
                            <option key={e.title} value={e.title.toLowerCase()}>{e.title}</option>
                          ))}
                          <option value="other">Other</option>
                        </select>
                        {errors.eventType && <p className="text-brand-red text-xs mt-1">{errors.eventType.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EVENT DATE</label>
                        <input 
                          {...register("eventDate")}
                          type="date" 
                          className={`w-full bg-transparent border-b ${errors.eventDate ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white/50 focus:text-brand-white focus:outline-none focus:border-brand-red transition-colors [color-scheme:dark]`} 
                        />
                        {errors.eventDate && <p className="text-brand-red text-xs mt-1">{errors.eventDate.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">START TIME</label>
                        <input 
                          {...register("eventStartTime")}
                          type="time" 
                          className={`w-full bg-transparent border-b ${errors.eventStartTime ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white/50 focus:text-brand-white focus:outline-none focus:border-brand-red transition-colors [color-scheme:dark]`} 
                        />
                        {errors.eventStartTime && <p className="text-brand-red text-xs mt-1">{errors.eventStartTime.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">END TIME</label>
                        <input 
                          {...register("eventEndTime")}
                          type="time" 
                          className={`w-full bg-transparent border-b ${errors.eventEndTime ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white/50 focus:text-brand-white focus:outline-none focus:border-brand-red transition-colors [color-scheme:dark]`} 
                        />
                        {errors.eventEndTime && <p className="text-brand-red text-xs mt-1">{errors.eventEndTime.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EVENT LOCATION</label>
                        <input 
                          {...register("eventLocation")}
                          type="text" 
                          className={`w-full bg-transparent border-b ${errors.eventLocation ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors`} 
                          placeholder="City, Venue Name" 
                        />
                        {errors.eventLocation && <p className="text-brand-red text-xs mt-1">{errors.eventLocation.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EXPECTED CROWD</label>
                        <select 
                          {...register("expectedCrowd")}
                          defaultValue=""
                          className={`w-full bg-brand-black border-b ${errors.expectedCrowd ? 'border-brand-red' : 'border-brand-white/20'} px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors appearance-none`}
                        >
                          <option value="" disabled>Select Crowd Size</option>
                          <option value="50-100">50 - 100 People</option>
                          <option value="100-300">100 - 300 People</option>
                          <option value="300-500">300 - 500 People</option>
                          <option value="500+">500+ People</option>
                        </select>
                        {errors.expectedCrowd && <p className="text-brand-red text-xs mt-1">{errors.expectedCrowd.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">ADDITIONAL REQUIREMENTS (OPTIONAL)</label>
                      <textarea 
                        {...register("requirements")}
                        rows={3} 
                        className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors resize-none" 
                        placeholder="Any specific requests?"
                      />
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
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
