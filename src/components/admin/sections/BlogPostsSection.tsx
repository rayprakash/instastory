
import { useState } from "react";
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

// Mock blog posts for demonstration
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to View Instagram Stories Anonymously",
    slug: "how-to-view-instagram-stories-anonymously",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Learn the best techniques to view Instagram stories without being detected by the account owner.",
    featuredImage: "https://via.placeholder.com/800x400",
    keywords: ["instagram", "stories", "anonymous", "privacy"],
    author: "Admin",
    publishDate: "2023-04-06T10:00:00Z",
    status: "published"
  },
  {
    id: "2",
    title: "Instagram Privacy Features You Should Know About",
    slug: "instagram-privacy-features",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Discover the hidden privacy features on Instagram that can help protect your account and data.",
    featuredImage: "https://via.placeholder.com/800x400",
    keywords: ["instagram", "privacy", "security", "features"],
    author: "Admin",
    publishDate: "2023-04-04T14:30:00Z",
    status: "published"
  },
  {
    id: "3",
    title: "5 Best Tools for Social Media Management",
    slug: "best-tools-social-media-management",
    content: "Draft content...",
    excerpt: "A comprehensive guide to the best tools for managing your social media presence.",
    featuredImage: "",
    keywords: ["social media", "tools", "management", "marketing"],
    author: "Admin",
    publishDate: "2023-04-08T09:15:00Z",
    status: "draft"
  }
];

interface BlogPostsSectionProps {
  onSave: () => void;
}

const BlogPostsSection = ({ onSave }: BlogPostsSectionProps) => {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const handleNewPost = () => {
    setCurrentPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setShowEditor(true);
  };

  const handleDeletePost = (id: string) => {
    // In a real app, you would make an API call to delete the post
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleSavePost = (post: BlogPost) => {
    if (post.id) {
      // Update existing post
      setPosts(posts.map(p => p.id === post.id ? post : p));
    } else {
      // Create new post with generated ID
      const newPost = {
        ...post,
        id: Math.random().toString(36).substring(2, 9),
      };
      setPosts([newPost, ...posts]);
    }
    
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
            {filteredPosts.length === 0 ? (
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
