"use client";

import { siteConfig } from "@/config/site";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 lg:py-48 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-2xl animate-on-scroll">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white leading-tight mb-8">
              <span className="block">MORE THAN A</span>
              <span className="block text-brand-red">PERFORMANCE.</span>
              <span className="block">IT'S AN</span>
              <span className="block">EXPERIENCE.</span>
            </h2>
            
            <div className="space-y-6 text-brand-white/70 text-lg">
              <p>
                We bring the powerful, traditional rhythm of Nashik Dhol to major celebrations and events. Our performances are not just heard; they are felt deeply by every attendee.
              </p>
              <p>
                With a highly professional and coordinated team, we deliver high-energy performances designed to bring the crowd into the moment and create unforgettable memories, fully customized for your unique event requirements.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-6">
              {siteConfig.stats.slice(0, 2).map((stat, idx) => (
                <div key={idx}>
                  <div className="text-brand-red font-bold text-4xl mb-2">{stat.value}</div>
                  <div className="text-sm tracking-widest text-brand-white/60 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] w-full group animate-on-scroll">
            <div className="absolute inset-0 bg-brand-red/20 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />
            <div className="relative h-full w-full z-10 overflow-hidden">
              <img 
                src="/images/group-standing.jpg" 
                alt="Premium Dhol Experience" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent mix-blend-multiply" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
