"use client";

import { useRef } from "react";
import { FEATURES } from "@/config/data";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="py-32 bg-brand-charcoal overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <motion.div style={{ y }} className="sticky top-32">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white leading-tight mb-6">
                BUILT FOR <br />
                <span className="text-brand-gold">BIG MOMENTS.</span>
              </h2>
              <p className="text-brand-white/70 text-lg">
                We don't just play instruments; we create an atmosphere. Discover what makes Team Aliyanz the premier choice for your next event.
              </p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-brand-black p-10 border border-brand-white/5 hover:border-brand-gold/50 transition-colors duration-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-white/5 flex items-center justify-center text-brand-gold font-heading font-bold text-xl mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500">
                  {idx + 1}
                </div>
                <h3 className="font-bold tracking-widest text-brand-white mb-4 text-lg">{feature.title}</h3>
                <p className="text-brand-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
