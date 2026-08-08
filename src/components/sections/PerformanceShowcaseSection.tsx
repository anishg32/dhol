"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_IMAGES = [
  "/images/wedding.jpg",
  "/images/festival.jpg",
  "/images/corporate.jpg",
  "/images/about-img.jpg"
];

export default function PerformanceShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const getScrollAmount = () => {
        let containerWidth = container.scrollWidth;
        return -(containerWidth - window.innerWidth);
      };

      const tween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-brand-black overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6 lg:px-12 mb-12 shrink-0">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
          THE <span className="text-brand-red">PERFORMANCE</span>
        </h2>
      </div>
      
      <div className="flex w-fit items-center h-[60vh] pl-6 lg:pl-12" ref={scrollContainerRef}>
        {SHOWCASE_IMAGES.map((src, idx) => (
          <div 
            key={idx} 
            className="w-[80vw] md:w-[60vw] lg:w-[40vw] h-full flex-shrink-0 mr-8 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src={src} 
              alt={`Performance Showcase ${idx + 1}`} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
