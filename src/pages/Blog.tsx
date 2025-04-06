
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/blog";
import { Link } from "react-router-dom";
import { CalendarIcon, Clock, User } from "lucide-react";
import { getBlogPosts } from "@/data/blogData";
import { Helmet } from "react-helmet-async";
import { useSeo } from "@/contexts/SeoContext";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { seoSettings } = useSeo();

  useEffect(() => {
    // Get posts from localStorage
    const savedPosts = getBlogPosts();
    
    // Filter to show only published posts
    const publishedPosts = savedPosts.filter(post => post.status === 'published');
    
    setPosts(publishedPosts);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-instablue-50 to-white">
        <div className="container py-12 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded-md w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-instablue-50 to-white">
      <Helmet>
        <title>Blog | {seoSettings.title}</title>
        <meta name="description" content="Latest news, guides, and insights about Instagram stories viewing and social media privacy" />
        <meta name="keywords" content="instagram, blog, stories, privacy, social media" />
      </Helmet>
      
      <div className="container py-12 px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-instablue-900">Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest news, guides, and insights about Instagram stories viewing and social media privacy
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-700 mb-2">No Posts Yet</h2>
            <p className="text-gray-500 mb-4">Check back later for new content</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all">
                {post.featuredImage && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.featuredImage} 
                      alt={post.imageAlt || post.title} 
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
        )}
      </div>
    </div>
  );
};

export default Blog;
