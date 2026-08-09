"use client";

import { CheckCircle2, Zap, Settings, Clock, Star, Users } from "lucide-react";

const FEATURES = [
  {
    title: "Professional Performers",
    description: "Experienced and energetic performers delivering top-tier musical experiences.",
    icon: Users
  },
  {
    title: "High-Energy Experience",
    description: "Performances designed to energize the crowd and elevate the atmosphere.",
    icon: Zap
  },
  {
    title: "Custom Packages",
    description: "Flexible performance options tailored for different events and requirements.",
    icon: Settings
  },
  {
    title: "Reliable Service",
    description: "Professional coordination, guaranteed punctuality, and seamless execution.",
    icon: Clock
  },
  {
    title: "Premium Presentation",
    description: "A visually powerful performance experience with cinematic presence.",
    icon: Star
  },
  {
    title: "Event-Focused",
    description: "Performances completely tailored to match the specific occasion.",
    icon: CheckCircle2
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-32 bg-brand-black overflow-hidden border-y border-brand-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 animate-on-scroll">
            <div className="sticky top-32">
              <div className="inline-block px-4 py-1.5 border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-sm rounded-full mb-6">
                <span className="font-heading tracking-[0.2em] text-[10px] text-brand-gold uppercase font-bold">
                  WHY CHOOSE US
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white leading-tight mb-6">
                BUILT FOR <br />
                <span className="text-brand-red">BIG MOMENTS.</span>
              </h2>
              <p className="text-brand-white/70 text-lg">
                We don't just play instruments; we create an atmosphere. Discover what makes Nashik Dhol the premier choice for your next premium event.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="bg-brand-charcoal p-10 border border-brand-white/5 hover:border-brand-red/30 transition-colors duration-500 group rounded-sm animate-on-scroll"
                  style={{ animationDelay: `${(idx % 2) * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-brand-black flex items-center justify-center text-brand-red mb-6 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-brand-black transition-all duration-500 shadow-lg border border-brand-white/5 group-hover:border-transparent">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold tracking-wider text-brand-white mb-4 text-lg group-hover:text-brand-gold transition-colors">{feature.title}</h3>
                  <p className="text-brand-white/60 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
