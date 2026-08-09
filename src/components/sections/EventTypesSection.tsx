"use client";

import { siteConfig } from "@/config/site";

export default function EventTypesSection() {
  return (
    <section id="events" className="py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center animate-on-scroll">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-6">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              OUR EXPERTISE
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white">
            WHERE THE <span className="text-brand-red">RHYTHM</span> BELONGS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.events.map((event, index) => (
            <div 
              key={event.title}
              className="group relative h-[450px] overflow-hidden bg-brand-black rounded-sm animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
              data-cursor-text="VIEW"
            >
              {/* 3D tilt effect base layer */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img 
                  src={event.image} 
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 border border-brand-white/0 group-hover:border-brand-gold/30 transition-colors duration-500 z-20" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500 z-30">
                <div className="w-12 h-[2px] bg-brand-red mb-6 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <h3 className="font-heading text-2xl font-bold text-brand-white mb-2 group-hover:text-brand-gold transition-colors duration-300 drop-shadow-md">
                  {event.title}
                </h3>
                <p className="text-brand-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 font-medium">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
