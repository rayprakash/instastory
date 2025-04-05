
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Download, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const SearchSection = () => {
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    // Simulate search process
    setIsLoading(true);
    
    // In a real app, this would be an API call to your backend
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(true);
      
      // Mock results
      setResults([
        { id: 1, type: 'story', thumbnail: 'https://picsum.photos/200/300', timestamp: new Date().toISOString() },
        { id: 2, type: 'story', thumbnail: 'https://picsum.photos/201/300', timestamp: new Date().toISOString() },
        { id: 3, type: 'story', thumbnail: 'https://picsum.photos/202/300', timestamp: new Date().toISOString() },
      ]);
    }, 1500);
  };

  const handleDownload = (id: number) => {
    console.log(`Downloading item ${id}`);
    // In a real app, this would trigger the download
  };

  return (
    <div className="relative">
      <div className="max-w-3xl mx-auto my-8 px-4">
        <div className="glass rounded-xl p-6 md:p-8">
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
            <p className="text-sm text-gray-500 text-center">
              Enter a public Instagram username to view their stories anonymously
            </p>
          </form>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Stories from @{username}</DialogTitle>
            <DialogDescription>
              View or download stories without being detected
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-2 my-4">
            {results.map((item) => (
              <div key={item.id} className="relative group">
                <img 
                  src={item.thumbnail} 
                  alt="Story thumbnail" 
                  className="aspect-square object-cover rounded-md"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-auto"
                  onClick={() => handleDownload(item.id)}
                >
                  <Download size={14} />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="mr-2"
            >
              Close
            </Button>
            <Button 
              className="bg-blue-gradient hover:opacity-90"
              onClick={() => console.log("View all stories")}
            >
              View All Stories
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Ad space below search */}
      <div className="ad-container mx-auto max-w-3xl">
        Advertisement Space
      </div>
    </div>
  );
};

export default SearchSection;
