
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
import { fetchInstagramStories, saveRapidAPIKey, getRapidAPIKey, InstagramStory } from "@/utils/instagramApi";

const SearchSection = () => {
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<InstagramStory[]>([]);
  const [apiKey, setApiKey] = useState("");

  // Load saved API key on component mount
  useEffect(() => {
    const savedApiKey = getRapidAPIKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
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
      
      if (!getRapidAPIKey()) {
        toast.info("Using mock data. Add your RapidAPI key in settings for real Instagram data.", {
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

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      saveRapidAPIKey(apiKey.trim());
      toast.success("API key saved successfully!");
      setIsSettingsOpen(false);
    } else {
      toast.error("Please enter a valid API key.");
    }
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
            
            {!getRapidAPIKey() && (
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertTitle>API Key Required</AlertTitle>
                <AlertDescription>
                  Add your RapidAPI key in settings to view real Instagram stories.
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
          
          {!getRapidAPIKey() && (
            <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Using mock data. Add your RapidAPI key in settings for real Instagram stories.
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
                if (!getRapidAPIKey()) {
                  toast.info("Add your RapidAPI key in settings for real Instagram data.");
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
      
      {/* API Key Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>RapidAPI Settings</DialogTitle>
            <DialogDescription>
              Add your RapidAPI key to fetch real Instagram stories
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="apiKey" className="text-sm font-medium text-gray-700 block mb-2">
                RapidAPI Key
              </label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your RapidAPI key"
                className="w-full"
                type="password"
              />
              <p className="mt-2 text-xs text-gray-500">
                Get your API key from <a href="https://rapidapi.com/hub" target="_blank" rel="noreferrer" className="text-blue-500 underline">RapidAPI</a>
              </p>
            </div>
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
              onClick={handleSaveApiKey}
            >
              Save API Key
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
