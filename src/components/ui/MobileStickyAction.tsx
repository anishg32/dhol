"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function MobileStickyAction() {
  const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent("Hello, I would like to enquire about Nashik Dhol performance for my event.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-charcoal/95 backdrop-blur-md border-t border-white/10 shadow-2xl pb-safe">
      <div className="flex items-center justify-between p-2 gap-2 h-16">
        <a 
          href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
          className="flex-1 flex flex-col items-center justify-center text-brand-white/80 hover:text-brand-white text-xs font-medium gap-1"
        >
          <Phone size={20} />
          <span>Call</span>
        </a>
        
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center text-[#25D366] hover:text-[#25D366]/80 text-xs font-medium gap-1"
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
        
        <a 
          href="#contact"
          className="flex-[1.5] flex items-center justify-center bg-brand-red text-brand-black text-sm font-bold tracking-wider h-full rounded hover:bg-brand-white transition-colors"
        >
          <Calendar size={16} className="mr-2" />
          BOOK NOW
        </a>
      </div>
    </div>
  );
}
