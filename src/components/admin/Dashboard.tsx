import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Users, MessageSquare, Image, HelpCircle, Layout, FileText, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSeo } from "@/contexts/SeoContext";
import SeoSettings from "./SeoSettings";
import PageManager from "./PageManager";
import SiteSettings from "./SiteSettings";

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
  
  // In a real app, these would be connected to a backend/database
  const sections = [
    {
      id: "overview",
      name: "Overview",
      icon: Layout,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-gradient p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-instablue-800">24,389</p>
              <p className="text-sm text-green-600 mt-2">+15% from last week</p>
            </div>
            <div className="card-gradient p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-instablue-800">3,127</p>
              <p className="text-sm text-green-600 mt-2">+8% from last week</p>
            </div>
            <div className="card-gradient p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Searches Today</h3>
              <p className="text-3xl font-bold text-instablue-800">842</p>
              <p className="text-sm text-green-600 mt-2">+12% from yesterday</p>
            </div>
          </div>
          
          <div className="mt-8 card-gradient p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="pb-4 border-b border-gray-200 flex justify-between">
                  <div>
                    <p className="font-medium">User searched for @username{item}</p>
                    <p className="text-sm text-gray-500">{item * 10} minutes ago</p>
                  </div>
                  <span className="text-instablue-500 text-sm">View Details</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
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
      id: "site",
      name: "Site Settings",
      icon: Settings,
      content: <SiteSettings onSave={handleSaveChanges} />
    },
    {
      id: "testimonials",
      name: "Testimonials",
      icon: MessageSquare,
      content: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Testimonials</h2>
            <Button className="bg-blue-gradient hover:opacity-90">Add New Testimonial</Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?img=${item}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">User {item}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 Stars</td>
                    <td className="px-6 py-4 text-sm text-gray-500">This is testimonial text {item}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-instablue-600 hover:text-instablue-900 mr-4">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: "how-it-works",
      name: "How It Works",
      icon: Image,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Edit How It Works Section</h2>
          
          <div className="space-y-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="card-gradient p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Step {step}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Step Title</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={`Step ${step} Title`}
                    />
                    
                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                      defaultValue={`This is the description for step ${step}...`}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Step Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                      <img
                        src={`https://picsum.photos/400/300?random=${step}`}
                        alt={`Step ${step}`}
                        className="w-full h-40 object-cover rounded mb-4"
                      />
                      <Button variant="outline" className="w-full">Change Image</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end mt-8">
              <Button 
                onClick={handleSaveChanges}
                className="bg-blue-gradient hover:opacity-90 px-8"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "features",
      name: "Features",
      icon: Settings,
      content: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Features</h2>
            <Button className="bg-blue-gradient hover:opacity-90">Add New Feature</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((feature) => (
              <div key={feature} className="card-gradient p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Feature {feature}</h3>
                  <button className="text-red-600 hover:text-red-900">Remove</button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Feature Title</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={`Feature ${feature} Title`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                      defaultValue={`This is the description for feature ${feature}...`}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Shield</option>
                      <option>Eye</option>
                      <option>Download</option>
                      <option>Clock</option>
                      <option>Lock</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleSaveChanges}
              className="bg-blue-gradient hover:opacity-90 px-8"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "faqs",
      name: "FAQs",
      icon: HelpCircle,
      content: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage FAQs</h2>
            <Button className="bg-blue-gradient hover:opacity-90">Add New FAQ</Button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7].map((faq) => (
              <div key={faq} className="card-gradient p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">FAQ {faq}</h3>
                  <button className="text-red-600 hover:text-red-900">Remove</button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={`What is FAQ question ${faq}?`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={4}
                      defaultValue={`This is the answer to FAQ ${faq}. It provides detailed information about the question asked above.`}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleSaveChanges}
              className="bg-blue-gradient hover:opacity-90 px-8"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "ads",
      name: "Ad Units",
      icon: Layout,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Manage Ad Units</h2>
          
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((ad) => (
              <div key={ad} className="card-gradient p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Ad Slot {ad}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={`Ad Unit ${ad}`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Code</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 font-mono text-sm rounded-md"
                      rows={4}
                      defaultValue={`<!-- Ad code for slot ${ad} -->\n<script async src="https://pagead2.example.com/pagead/js/adsbygoogle.js"></script>\n<!-- Replace with actual ad code -->`}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>After Search Section</option>
                      <option>After How It Works</option>
                      <option>After Features</option>
                      <option>After Testimonials</option>
                      <option>After FAQ</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`enabled-${ad}`} 
                      className="h-4 w-4 text-instablue-600 focus:ring-instablue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor={`enabled-${ad}`} className="ml-2 block text-sm text-gray-900">
                      Enabled
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-8">
            <Button 
              onClick={handleSaveChanges}
              className="bg-blue-gradient hover:opacity-90 px-8"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-instablue-50 to-instablue-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
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
