
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center hero-gradient text-white py-16 px-4 relative overflow-hidden">
      {/* Background circles/decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-1/3 h-1/3 rounded-full bg-blue-500/20 animate-float"></div>
        <div className="absolute bottom-[-15%] left-[-5%] w-1/2 h-1/2 rounded-full bg-blue-600/10 animate-float animation-delay-2000"></div>
        <div className="absolute top-[30%] left-[10%] w-16 h-16 rounded-full bg-blue-400/20 animate-pulse-light"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-shadow">
            View Instagram Stories <span className="underline decoration-instablue-300 decoration-wavy">Anonymously</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-instablue-50">
            Browse and download Instagram stories without being detected, completely free and without login.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              className="bg-white text-instablue-800 hover:bg-instablue-50 px-8 py-6 text-lg"
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Try Now
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works
            </Button>
          </div>
          
          <div className="mt-12 animate-bounce">
            <Button
              variant="ghost"
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent hover:bg-white/10 rounded-full h-12 w-12 flex items-center justify-center"
            >
              <ArrowDown />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
