
import NavigationBar from "@/components/NavigationBar";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      
      <main className="flex-grow">
        <Hero />
        
        <div id="search-section">
          <SearchSection />
        </div>
        
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
