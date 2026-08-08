import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EventTypesSection from "@/components/sections/EventTypesSection";
import SignatureSection from "@/components/sections/SignatureSection";
import PerformanceShowcaseSection from "@/components/sections/PerformanceShowcaseSection";
import GallerySection from "@/components/sections/GallerySection";
import VideoSection from "@/components/sections/VideoSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <EventTypesSection />
        <SignatureSection />
        <PerformanceShowcaseSection />
        <GallerySection />
        <VideoSection />
        <WhyChooseUsSection />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
