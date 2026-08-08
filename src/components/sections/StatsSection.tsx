"use client";

import { useEffect, useRef } from "react";
import { STATS } from "@/config/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-black border-y border-brand-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-item flex flex-col items-center justify-center">
              <div className="font-heading text-5xl md:text-6xl font-bold text-brand-gold mb-4 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                {stat.value}
              </div>
              <div className="text-brand-white/60 text-sm tracking-widest uppercase font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
