
import { useState } from "react";
import { Settings, LogOut, Users, MessageSquare, Image, HelpCircle, Layout, FileText, Globe, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSeo } from "@/contexts/SeoContext";
import AdminNavigation from "./AdminNavigation";
import OverviewSection from "./sections/OverviewSection";
import SeoSettings from "./SeoSettings";
import PageManager from "./PageManager";
import SiteSettings from "./SiteSettings";
import ContactSettings from "./ContactSettings";
import TestimonialsSection from "./sections/TestimonialsSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import FeaturesSection from "./sections/FeaturesSection";
import FaqsSection from "./sections/FaqsSection";
import AdUnitsSection from "./sections/AdUnitsSection";
import ProfileSection from "./sections/ProfileSection";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("overview");

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been successfully saved",
    });
  };
  
  // Define all sections with their components
  const sections = [
    {
      id: "overview",
      name: "Overview",
      icon: Layout,
      content: <OverviewSection />
    },
    {
      id: "profile",
      name: "Profile",
      icon: User,
      content: <ProfileSection onSave={handleSaveChanges} />
    },
    {
      id: "seo",
      name: "SEO Settings",
      icon: Globe,
      content: <SeoSettings onSave={handleSaveChanges} />
    },
    {
      id: "pages",
      name: "Pages",
      icon: FileText,
      content: <PageManager onSave={handleSaveChanges} />
    },
    {
      id: "contact",
      name: "Contact Form",
      icon: Mail,
      content: <ContactSettings onSave={handleSaveChanges} />
    },
    {
      id: "site",
      name: "Site Settings",
      icon: Settings,
      content: <SiteSettings onSave={handleSaveChanges} />
    },
    {
      id: "testimonials",
      name: "Testimonials",
      icon: MessageSquare,
      content: <TestimonialsSection onSave={handleSaveChanges} />
    },
    {
      id: "how-it-works",
      name: "How It Works",
      icon: Image,
      content: <HowItWorksSection onSave={handleSaveChanges} />
    },
    {
      id: "features",
      name: "Features",
      icon: Settings,
      content: <FeaturesSection onSave={handleSaveChanges} />
    },
    {
      id: "faqs",
      name: "FAQs",
      icon: HelpCircle,
      content: <FaqsSection onSave={handleSaveChanges} />
    },
    {
      id: "ads",
      name: "Ad Units",
      icon: Layout,
      content: <AdUnitsSection onSave={handleSaveChanges} />
    }
  ];

  // Create navigation data (icon and name only) for the sidebar
  const navigationData = sections.map(({ id, name, icon }) => ({ id, name, icon }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-instablue-50 to-instablue-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <AdminNavigation 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
            onLogout={onLogout} 
            sections={navigationData}
          />
          
          {/* Content Area */}
          <div className="p-8">
            {sections.find(section => section.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
