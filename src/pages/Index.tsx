
import { useEffect, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { getAdUnits, AdUnit } from "@/utils/adminSettings";

const Index = () => {
  const [adUnits, setAdUnits] = useState<AdUnit[]>([]);

  useEffect(() => {
    // Load ad units from localStorage
    try {
      const savedAdUnits = getAdUnits();
      console.log("Index page loaded ad units:", savedAdUnits);
      setAdUnits(savedAdUnits);
    } catch (error) {
      console.error("Error loading ad units on index page:", error);
    }
  }, []);

  // Render ad by location
  const renderAd = (location: string) => {
    const ad = adUnits.find(unit => unit.location === location && unit.enabled);
    
    if (ad && ad.code) {
      return (
        <div className="ad-container max-w-5xl mx-auto my-8 px-4">
          <div dangerouslySetInnerHTML={{ __html: ad.code }} />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      
      <main className="flex-grow">
        <Hero />
        
        <div id="search-section">
          <SearchSection />
        </div>
        
        {renderAd('After Search Section')}
        
        <HowItWorks />
        
        {renderAd('After How It Works')}
        
        <Features />
        
        {renderAd('After Features')}
        
        <Testimonials />
        
        {renderAd('After Testimonials')}
        
        <FAQSection />
        
        {renderAd('After FAQ')}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
