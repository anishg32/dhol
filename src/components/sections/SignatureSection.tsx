"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

export default function SignatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const words = ["BEAT.", "ENERGY.", "TRADITION.", "CELEBRATION."];

  return (
    <section ref={containerRef} id="experience" className="py-40 bg-brand-black relative flex flex-col items-center justify-center overflow-hidden border-y border-brand-white/5 min-h-[100dvh]">
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute inset-0 w-full h-[120%] origin-top -top-[10%]"
        >
          <Image 
            src="/images/performance.jpg" 
            alt="Signature Performance" 
            fill
            sizes="(max-width: 1024px) 100vw, 100vw"
            className="object-cover opacity-20 grayscale"
          />
        </motion.div>
        <div className="absolute inset-0 bg-brand-black/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center w-full max-w-5xl px-6">
        <div className="animate-on-scroll mb-16">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-6">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              THE VIBE
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-brand-white tracking-widest uppercase">
            Feel the Rhythm
          </h2>
        </div>
        
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          {words.map((word, i) => (
            <Word key={word} word={word} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({ word, index, scrollYProgress }: { word: string, index: number, scrollYProgress: MotionValue<number> }) {
  const start = 0.2 + (index * 0.1);
  const end = 0.5 + (index * 0.1);
  
  const y = useTransform(scrollYProgress, [start, end], [100, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <div className="overflow-hidden py-2">
      <motion.div 
        style={{ y, opacity }}
        className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold text-brand-white leading-none hover:text-brand-red transition-colors duration-500 cursor-default"
      >
        {word}
      </motion.div>
    </div>
  );
}
