import { UserCheck, ShieldCheck, Clock, Download, Eye, Lock, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Anonymous",
      description: "View Instagram stories without leaving any trace. Profile owners will never know you viewed their content."
    },
    {
      icon: Eye,
      title: "Story Viewer",
      description: "Access and view Instagram stories even if you don't have an Instagram account."
    },
    {
      icon: Download,
      title: "Easy Download",
      description: "Save stories to your device with a single click in high quality resolution."
    },
    {
      icon: Zap,
      title: "Fast Loading",
      description: "Our optimized system loads stories quickly, saving you time and bandwidth."
    },
    {
      icon: Clock,
      title: "Access Expired Stories",
      description: "View stories that have been published within the last 24 hours even if they've expired."
    },
    {
      icon: Lock,
      title: "Privacy Focused",
      description: "We don't store your searches or any personal information, ensuring complete privacy."
    }
  ];

  return (
    <section className="section bg-white" id="features">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-instablue-900">
            Why Choose InstaView
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The most reliable and secure way to view Instagram stories anonymously
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-gradient p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]"
            >
              <div className="h-12 w-12 rounded-full bg-instablue-100 flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-instablue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-instablue-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ad container with no text label */}
      <div className="ad-container mt-12 max-w-3xl mx-auto"></div>
    </section>
  );
};

export default Features;
