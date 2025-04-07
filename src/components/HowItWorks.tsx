import { ArrowRight, Search, Eye, Download, Shield, Users, Lock, MousePointer } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Enter Username",
      description: "Type the Instagram username or paste the profile URL in the search box",
      vectorComponent: () => (
        <div className="flex items-center justify-center h-48 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-xl">
          <div className="relative w-32 h-32">
            <Search size={64} stroke="#4f46e5" className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            <MousePointer size={24} stroke="#4f46e5" className="absolute bottom-0 right-0 animate-pulse" />
            <div className="absolute w-40 h-2 bg-gray-300 rounded bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-8" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: Eye,
      title: "View Stories",
      description: "Our system fetches and displays all available stories anonymously",
      vectorComponent: () => (
        <div className="flex items-center justify-center h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
          <div className="relative w-32 h-32">
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-24 h-24 rounded-lg border-2 border-blue-500" />
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-20 h-20 rounded-lg border-2 border-indigo-500 overflow-hidden">
              <div className="w-full h-1/2 bg-indigo-100" />
              <div className="w-full h-1/2 bg-blue-100" />
            </div>
            <Eye size={28} stroke="#4f46e5" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: Download,
      title: "Download",
      description: "Save any stories you like to your device with just one click",
      vectorComponent: () => (
        <div className="flex items-center justify-center h-48 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
          <div className="relative w-32 h-32">
            <div className="absolute w-20 h-28 border-2 border-purple-500 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <Download size={32} stroke="#8b5cf6" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce" />
          </div>
        </div>
      )
    },
    {
      id: 4,
      icon: Shield,
      title: "Stay Anonymous",
      description: "The profile owner will never know you viewed their stories",
      vectorComponent: () => (
        <div className="flex items-center justify-center h-48 bg-gradient-to-r from-pink-50 to-indigo-50 rounded-t-xl">
          <div className="relative w-32 h-32">
            <Shield size={64} stroke="#ec4899" className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            <Users size={20} stroke="#6366f1" className="absolute bottom-8 right-4" />
            <Lock size={16} stroke="#6366f1" className="absolute top-10 left-10" />
          </div>
        </div>
      )
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
              <step.vectorComponent />
              
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
      
      <div className="ad-container mt-12 max-w-3xl mx-auto"></div>
    </section>
  );
};

export default HowItWorks;
