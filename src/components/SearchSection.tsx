
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, ArrowRight, Download, X, Info, Settings, 
  Instagram, Image, Play, Film, Bookmark, ExternalLink, Database
} from "lucide-react";
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
import { 
  fetchInstagramStories, 
  fetchInstagramPosts,
  fetchInstagramHighlights,
  fetchInstagramReels,
  fetchInstagramProfile,
  saveApiConfig, 
  getApiConfig, 
  InstagramStory, 
  InstagramPost,
  InstagramProfile,
  InstagramApiConfig,
  ContentType
} from "@/utils/instagramApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SearchSection = () => {
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreenView, setIsFullScreenView] = useState(false);
  const [fullScreenMedia, setFullScreenMedia] = useState<{url: string, type: string} | null>(null);
  
  const [activeTab, setActiveTab] = useState<ContentType>("STORIES");
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [stories, setStories] = useState<InstagramStory[]>([]);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [highlights, setHighlights] = useState<InstagramStory[]>([]);
  const [reels, setReels] = useState<InstagramPost[]>([]);
  
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
      // Show loading toast
      toast.loading("Downloading profile data. Please wait...");
      
      // Fetch profile data
      const profileData = await fetchInstagramProfile(username.trim());
      setProfile(profileData);
      
      // Fetch stories
      const storiesData = await fetchInstagramStories(username.trim());
      setStories(storiesData);
      
      // Fetch posts
      const postsData = await fetchInstagramPosts(username.trim());
      setPosts(postsData);
      
      // Fetch highlights
      const highlightsData = await fetchInstagramHighlights(username.trim());
      setHighlights(highlightsData);
      
      // Fetch reels
      const reelsData = await fetchInstagramReels(username.trim());
      setReels(reelsData);
      
      // Open dialog with results
      setIsDialogOpen(true);
      
      // Dismiss loading toast and show success
      toast.dismiss();
      toast.success(`Successfully loaded @${username.trim()}'s content`);
      
      if (!apiConfig.useBackend && !apiConfig.useSupabase) {
        toast.info("Using mock data. Configure backend integration in settings for real Instagram data.", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching Instagram data:", error);
      toast.dismiss();
      toast.error("Failed to fetch Instagram data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = () => {
    // Validate that at least one option is selected
    if (!apiConfig.useBackend && !apiConfig.useSupabase) {
      toast.error("Please select at least one data source option.");
      return;
    }
    
    // Validate server URL if using custom backend
    if (apiConfig.useBackend && !apiConfig.serverUrl) {
      toast.error("Please enter a valid server URL if using custom backend integration.");
      return;
    }
    
    saveApiConfig(apiConfig);
    toast.success("API configuration saved successfully!");
    setIsSettingsOpen(false);
  };

  const handleDownload = (url: string, type: string, id: string) => {
    toast.info("Starting download...", { duration: 2000 });
    
    // Create a hidden anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `instagram-${type}-${id}.${type === 'VIDEO' ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started!");
  };
  
  const openFullscreen = (url: string, type: string) => {
    setFullScreenMedia({ url, type });
    setIsFullScreenView(true);
  };
  
  const closeFullscreen = () => {
    setIsFullScreenView(false);
    setFullScreenMedia(null);
  };

  const renderMediaItem = (item: InstagramStory | InstagramPost, type: ContentType) => {
    const { id, mediaType, mediaUrl } = item;
    const thumbnailUrl = 'thumbnail' in item && item.thumbnail ? item.thumbnail : mediaUrl;
    
    return (
      <div key={id} className="relative group overflow-hidden rounded-md">
        {mediaType === 'VIDEO' ? (
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <img 
              src={thumbnailUrl} 
              alt="Video thumbnail" 
              className="w-full h-full object-cover"
            />
            <Play className="absolute text-white fill-white opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={28} />
          </div>
        ) : (
          <div className="aspect-square bg-gray-100">
            <img 
              src={mediaUrl} 
              alt={`Instagram ${type.toLowerCase()}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Controls overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 h-auto w-auto"
              onClick={() => openFullscreen(mediaUrl, mediaType)}
            >
              <ExternalLink size={16} />
            </Button>
            
            <Button
              size="sm"
              variant="ghost" 
              className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 h-auto w-auto"
              onClick={() => handleDownload(mediaUrl, mediaType, id)}
            >
              <Download size={16} />
            </Button>
          </div>
        </div>
        
        {'caption' in item && item.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-xs line-clamp-2">{item.caption}</p>
          </div>
        )}
      </div>
    );
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
                    <span>View Instagram Content</span>
                    <ArrowRight size={16} />
                  </div>
                )}
              </Button>
            </div>
            
            {!apiConfig.useBackend && !apiConfig.useSupabase && (
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertTitle>Using Mock Data</AlertTitle>
                <AlertDescription>
                  This application is using sample data to simulate Instagram content viewing. Configure backend integration in settings for real Instagram data.
                </AlertDescription>
              </Alert>
            )}
            
            {apiConfig.useSupabase && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <Database className="h-4 w-4" />
                <AlertTitle>Using Supabase Integration</AlertTitle>
                <AlertDescription>
                  This application is using Supabase Edge Functions to fetch Instagram data.
                </AlertDescription>
              </Alert>
            )}
            
            <p className="text-sm text-gray-500 text-center">
              Enter a public Instagram username to view their content anonymously
            </p>
          </form>
        </div>
      </div>

      {/* Instagram Content Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          {profile && (
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={profile.profilePicture} 
                  alt={profile.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">@{profile.username}</h3>
                {profile.fullName && <p className="text-gray-600">{profile.fullName}</p>}
                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span>{profile.postsCount} posts</span>
                  {profile.followers && <span>{profile.followers.toLocaleString()} followers</span>}
                  {profile.following && <span>{profile.following.toLocaleString()} following</span>}
                </div>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="STORIES" value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType)}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="STORIES" className="flex items-center gap-2">
                <Image size={16} /> Stories
              </TabsTrigger>
              <TabsTrigger value="POSTS" className="flex items-center gap-2">
                <Instagram size={16} /> Posts
              </TabsTrigger>
              <TabsTrigger value="HIGHLIGHTS" className="flex items-center gap-2">
                <Bookmark size={16} /> Highlights
              </TabsTrigger>
              <TabsTrigger value="REELS" className="flex items-center gap-2">
                <Film size={16} /> Reels
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="STORIES" className="mt-4">
              {stories.length === 0 ? (
                <div className="text-center py-8">
                  <p>No stories found for this user.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stories.map(story => renderMediaItem(story, "STORIES"))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="POSTS" className="mt-4">
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p>No posts found for this user.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {posts.map(post => renderMediaItem(post, "POSTS"))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="HIGHLIGHTS" className="mt-4">
              {highlights.length === 0 ? (
                <div className="text-center py-8">
                  <p>No highlights found for this user.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {highlights.map(highlight => renderMediaItem(highlight, "HIGHLIGHTS"))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="REELS" className="mt-4">
              {reels.length === 0 ? (
                <div className="text-center py-8">
                  <p>No reels found for this user.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {reels.map(reel => renderMediaItem(reel, "REELS"))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Full screen media view */}
      <Dialog 
        open={isFullScreenView} 
        onOpenChange={closeFullscreen}
      >
        <DialogContent className="sm:max-w-6xl max-h-screen p-0 overflow-hidden bg-black">
          <div className="absolute top-2 right-2 z-10">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white bg-black/50 hover:bg-black/70 rounded-full p-2 h-auto w-auto"
              onClick={closeFullscreen}
            >
              <X size={20} />
            </Button>
          </div>
          
          {fullScreenMedia && (
            <div className="w-full h-full flex items-center justify-center bg-black">
              {fullScreenMedia.type === 'VIDEO' ? (
                <video 
                  src={fullScreenMedia.url} 
                  controls 
                  autoPlay 
                  className="max-h-[80vh] max-w-full"
                />
              ) : (
                <img 
                  src={fullScreenMedia.url} 
                  alt="Full size media" 
                  className="max-h-[80vh] max-w-full object-contain"
                />
              )}
            </div>
          )}
          
          <div className="absolute bottom-4 right-4">
            {fullScreenMedia && (
              <Button 
                className="bg-blue-gradient hover:opacity-90"
                onClick={() => handleDownload(fullScreenMedia.url, fullScreenMedia.type, 'fullview')}
              >
                <Download size={16} className="mr-2" /> Download
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* API Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Instagram API Settings</DialogTitle>
            <DialogDescription>
              Configure your Instagram API integration options
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <input
                id="useSupabase"
                type="checkbox"
                checked={apiConfig.useSupabase}
                onChange={(e) => setApiConfig({...apiConfig, useSupabase: e.target.checked})}
                className="rounded border-gray-300"
              />
              <label htmlFor="useSupabase" className="text-sm font-medium text-gray-700">
                Use Supabase Edge Functions (Recommended)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="useBackend"
                type="checkbox"
                checked={apiConfig.useBackend}
                onChange={(e) => setApiConfig({...apiConfig, useBackend: e.target.checked})}
                className="rounded border-gray-300"
              />
              <label htmlFor="useBackend" className="text-sm font-medium text-gray-700">
                Use Custom Backend Integration
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
            
            {!apiConfig.useBackend && !apiConfig.useSupabase && (
              <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                <Info className="h-4 w-4" />
                <AlertTitle>Mock Data Only</AlertTitle>
                <AlertDescription>
                  With no backend integration selected, the app will use mock data only.
                </AlertDescription>
              </Alert>
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
