
import { Settings, LogOut, Users, MessageSquare, Image, HelpCircle, Layout, FileText, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
  sections: Array<{
    id: string;
    name: string;
    icon: React.ElementType;
  }>;
}

const AdminNavigation = ({ activeSection, setActiveSection, onLogout, sections }: AdminNavigationProps) => {
  return (
    <div className="bg-instablue-800 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-instablue-300 text-sm mt-1">Manage your website</p>
      </div>
      
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center px-3 py-2 w-full text-left rounded-md transition ${
              activeSection === section.id 
                ? 'bg-instablue-700 text-white' 
                : 'text-instablue-300 hover:bg-instablue-700/50 hover:text-white'
            }`}
          >
            <section.icon size={18} className="mr-2" />
            {section.name}
          </button>
        ))}
      </nav>
      
      <div className="mt-auto pt-8 border-t border-instablue-700 mt-8">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center text-instablue-300 hover:text-white hover:bg-instablue-700/50"
          onClick={onLogout}
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminNavigation;
