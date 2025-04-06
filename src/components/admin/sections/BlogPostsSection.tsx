
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash2, Eye, Filter, ArrowUpDown } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import { getBlogPosts, saveBlogPosts } from "@/data/blogData";
import { toast } from "sonner";

interface BlogPostsSectionProps {
  onSave: () => void;
}

const BlogPostsSection = ({ onSave }: BlogPostsSectionProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const loadedPosts = getBlogPosts();
    setPosts(loadedPosts);
    setLoading(false);
  }, []);

  const handleNewPost = () => {
    setCurrentPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setShowEditor(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      saveBlogPosts(updatedPosts);
      toast.success("Blog post deleted successfully");
      onSave();
    }
  };

  const handleSavePost = (post: BlogPost) => {
    let updatedPosts: BlogPost[];
    
    if (post.id) {
      // Update existing post
      updatedPosts = posts.map(p => p.id === post.id ? post : p);
    } else {
      // Create new post with generated ID
      const newPost = {
        ...post,
        id: Math.random().toString(36).substring(2, 9),
      };
      updatedPosts = [newPost, ...posts];
    }
    
    setPosts(updatedPosts);
    saveBlogPosts(updatedPosts);
    setShowEditor(false);
    onSave();
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.keywords.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (showEditor) {
    return (
      <BlogPostEditor 
        post={currentPost} 
        onSave={handleSavePost} 
        onCancel={() => setShowEditor(false)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={handleNewPost} className="bg-blue-gradient hover:opacity-90">
          <Plus size={16} className="mr-2" /> New Post
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search posts by title, slug or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter size={16} />
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">
                <div className="flex items-center">
                  Title
                  <ArrowUpDown size={14} className="ml-2" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  Loading blog posts...
                </TableCell>
              </TableRow>
            ) : filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  No blog posts found. Create your first post to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-500">/{post.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(post.lastModified || post.publishDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye size={16} />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogPostsSection;
