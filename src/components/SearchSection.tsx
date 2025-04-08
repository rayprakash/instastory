
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Download, X, Info, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { fetchInstagramStories, saveApiConfig, getApiConfig, InstagramStory, InstagramApiConfig } from "@/utils/instagramApi";

const SearchSection = () => {
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<InstagramStory[]>([]);
  const [apiConfig, setApiConfig] = useState<InstagramApiConfig>({ useBackend: false });

  // Load saved API config on component mount
  useEffect(() => {
    const savedConfig = getApiConfig();
    if (savedConfig) {
      setApiConfig(savedConfig);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Use our Instagram API utility to fetch stories
      const stories = await fetchInstagramStories(username.trim());
      setResults(stories);
      setIsDialogOpen(true);
      
      if (!apiConfig.useBackend) {
        toast.info("Using mock data. Configure backend integration in settings for real Instagram data.", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching Instagram stories:", error);
      toast.error("Failed to fetch Instagram stories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = () => {
    if (apiConfig.useBackend && !apiConfig.serverUrl) {
      toast.error("Please enter a valid server URL if using backend integration.");
      return;
    }
    
    saveApiConfig(apiConfig);
    toast.success("API configuration saved successfully!");
    setIsSettingsOpen(false);
  };

  const handleDownload = (id: string) => {
    console.log(`Downloading story ${id}`);
    toast.info("Download functionality would be implemented in a full application", {
      duration: 3000,
    });
    // In a real app, this would trigger the download
  };

  return (
    <div className="relative">
      <div className="max-w-3xl mx-auto my-8 px-4">
        <div className="glass rounded-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-instablue-800">Instagram Story Viewer</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings size={18} />
              <span className="hidden sm:inline">API Settings</span>
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Instagram username or profile URL"
                  className="pl-10 py-6 border-instablue-200 bg-white/80"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-blue-gradient hover:opacity-90 transition py-6"
                disabled={isLoading || !username.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>View Stories</span>
                    <ArrowRight size={16} />
                  </div>
                )}
              </Button>
            </div>
            
            {!apiConfig.useBackend && (
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertTitle>Backend Integration Required</AlertTitle>
                <AlertDescription>
                  Read the Instagram API guide in <code>src/utils/instagramApi.md</code> and configure backend integration.
                </AlertDescription>
              </Alert>
            )}
            
            <p className="text-sm text-gray-500 text-center">
              Enter a public Instagram username to view their stories anonymously
            </p>
          </form>
        </div>
      </div>

      {/* Results Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Stories from @{username}</DialogTitle>
            <DialogDescription>
              View or download stories without being detected
            </DialogDescription>
          </DialogHeader>
          
          {!apiConfig.useBackend && (
            <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Using mock data. Read the Instagram API guide and implement backend integration for real data.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-3 gap-2 my-4">
            {results.map((story) => (
              <div key={story.id} className="relative group">
                <img 
                  src={story.mediaUrl} 
                  alt="Story thumbnail" 
                  className="aspect-square object-cover rounded-md"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-auto"
                  onClick={() => handleDownload(story.id)}
                >
                  <Download size={14} />
                </Button>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="mr-2"
            >
              Close
            </Button>
            <Button 
              className="bg-blue-gradient hover:opacity-90"
              onClick={() => {
                if (!apiConfig.useBackend) {
                  toast.info("Read the Instagram API guide and implement backend integration.");
                } else {
                  toast.info("This is a demo with limited functionality.");
                }
              }}
            >
              View All Stories
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* API Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Instagram API Settings</DialogTitle>
            <DialogDescription>
              Configure your Instagram API integration by following the guide in <code>src/utils/instagramApi.md</code>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <input
                id="useBackend"
                type="checkbox"
                checked={apiConfig.useBackend}
                onChange={(e) => setApiConfig({...apiConfig, useBackend: e.target.checked})}
                className="rounded border-gray-300"
              />
              <label htmlFor="useBackend" className="text-sm font-medium text-gray-700">
                Use Backend Integration
              </label>
            </div>
            
            {apiConfig.useBackend && (
              <div>
                <label htmlFor="serverUrl" className="text-sm font-medium text-gray-700 block mb-2">
                  Backend Server URL
                </label>
                <Input
                  id="serverUrl"
                  value={apiConfig.serverUrl || ''}
                  onChange={(e) => setApiConfig({...apiConfig, serverUrl: e.target.value})}
                  placeholder="Enter your backend server URL (e.g., https://your-api.example.com)"
                  className="w-full"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Set up your own backend following the instructions in the Instagram API guide
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setIsSettingsOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-gradient hover:opacity-90"
              onClick={handleSaveConfig}
            >
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Ad container */}
      <div className="ad-container mx-auto max-w-3xl"></div>
    </div>
  );
};

export default SearchSection;
