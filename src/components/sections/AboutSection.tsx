"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text-reveal", {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 lg:py-48 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div ref={textRef} className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white leading-tight mb-8">
              <div className="overflow-hidden"><div className="about-text-reveal">MORE THAN A</div></div>
              <div className="overflow-hidden"><div className="about-text-reveal text-brand-red">PERFORMANCE.</div></div>
              <div className="overflow-hidden"><div className="about-text-reveal">IT'S AN</div></div>
              <div className="overflow-hidden"><div className="about-text-reveal">EXPERIENCE.</div></div>
            </h2>
            
            <div className="space-y-6 text-brand-white/70 text-lg about-text-reveal">
              <p>
                We bring the powerful, traditional rhythm of Team Aliyanz to major celebrations and events. Our performances are not just heard; they are felt.
              </p>
              <p>
                With a highly professional and coordinated team, we deliver high-energy performances designed to bring the crowd into the moment and create unforgettable memories.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-6 about-text-reveal">
              <div>
                <div className="text-brand-red font-bold text-3xl mb-2">100%</div>
                <div className="text-sm tracking-widest text-brand-white/60">PROFESSIONAL</div>
              </div>
              <div>
                <div className="text-brand-red font-bold text-3xl mb-2">PURE</div>
                <div className="text-sm tracking-widest text-brand-white/60">ENERGY</div>
              </div>
            </div>
          </div>

          <motion.div 
            style={{ y, opacity }} 
            className="relative h-[600px] w-full group"
          >
            <div className="absolute inset-0 bg-brand-red/20 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />
            <div className="relative h-full w-full z-10 overflow-hidden">
              <img 
                src="/images/group-standing.jpg" 
                alt="Team Aliyanz Experience" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent mix-blend-multiply" />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
