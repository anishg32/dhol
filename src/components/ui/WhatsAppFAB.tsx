"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export default function WhatsAppFAB() {
  const whatsappNumber = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent("Hello, I would like to enquire about Nashik Dhol performance for my event.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] hidden md:flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      whileHover={{ y: -5 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
