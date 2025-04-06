
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/blog";
import { Link } from "react-router-dom";
import { CalendarIcon, Clock, User } from "lucide-react";

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
  }
];

const Blog = () => {
  const [posts] = useState<BlogPost[]>(mockPosts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-instablue-50 to-white">
      <div className="container py-12 px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-instablue-900">Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest news, guides, and insights about Instagram stories viewing and social media privacy
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all">
              {post.featuredImage && (
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">
                  <Link to={`/blog/${post.slug}`} className="hover:text-instablue-600 transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center text-sm gap-1">
                  <User size={14} /> {post.author} • 
                  <CalendarIcon size={14} /> {new Date(post.publishDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 h-auto text-instablue-700" asChild>
                  <Link to={`/blog/${post.slug}`}>Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
