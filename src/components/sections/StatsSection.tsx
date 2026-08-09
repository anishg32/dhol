"use client";

import { siteConfig } from "@/config/site";

export default function StatsSection() {
  return (
    <section className="py-24 bg-brand-black border-y border-brand-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 text-center animate-on-scroll">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <div className="font-heading text-5xl md:text-6xl font-bold text-brand-red mb-4 drop-shadow-[0_0_15px_rgba(211,47,47,0.4)]">
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
