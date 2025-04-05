
import { ArrowRight, Eye, Shield, Download, UserCheck, Search } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Enter Username",
      description: "Type the Instagram username or paste the profile URL in the search box",
      imageSrc: "https://picsum.photos/400/300"
    },
    {
      id: 2,
      icon: Eye,
      title: "View Stories",
      description: "Our system fetches and displays all available stories anonymously",
      imageSrc: "https://picsum.photos/401/300"
    },
    {
      id: 3,
      icon: Download,
      title: "Download",
      description: "Save any stories you like to your device with just one click",
      imageSrc: "https://picsum.photos/402/300"
    },
    {
      id: 4,
      icon: Shield,
      title: "Stay Anonymous",
      description: "The profile owner will never know you viewed their stories",
      imageSrc: "https://picsum.photos/403/300"
    }
  ];

  return (
    <section className="section bg-gradient-to-br from-white to-instablue-50" id="how-it-works">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-instablue-900">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View Instagram stories anonymously in just a few simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={step.imageSrc} 
                  alt={step.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-instablue-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {step.id}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-instablue-800 flex items-center gap-2">
                  <step.icon size={20} className="text-instablue-500" />
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-[-2rem] -translate-y-1/2">
                  <ArrowRight size={24} className="text-instablue-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Ad space below how it works */}
      <div className="ad-container mt-12 max-w-3xl mx-auto">
        Advertisement Space
      </div>
    </section>
  );
};

export default HowItWorks;
