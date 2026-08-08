"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".sig-word");
      
      gsap.to(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        stagger: 0.5,
        scale: 1,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="h-screen bg-brand-black relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/performance.jpg" 
          alt="Signature Performance" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-brand-black/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center w-full max-w-5xl px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-brand-red mb-12 tracking-widest uppercase">
          Feel the Rhythm
        </h2>
        
        <div className="flex flex-col items-center space-y-2 md:space-y-4">
          {["BEAT.", "ENERGY.", "TRADITION.", "CELEBRATION."].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <div 
                className="sig-word font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold text-brand-white leading-none opacity-0 translate-y-full scale-95"
              >
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
