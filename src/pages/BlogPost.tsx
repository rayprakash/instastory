
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarIcon, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost as BlogPostType } from "@/types/blog";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";

// Mock blog posts (same as in Blog.tsx)
const mockPosts: BlogPostType[] = [
  {
    id: "1",
    title: "How to View Instagram Stories Anonymously",
    slug: "how-to-view-instagram-stories-anonymously",
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor commodo suscipit. Quisque quis ipsum in metus condimentum aliquam. Suspendisse dignissim ante sit amet nulla ullamcorper, in commodo erat rutrum.</p><p>Nullam hendrerit lectus non fringilla dictum. Fusce dapibus, leo ut malesuada aliquam, eros dolor varius felis, at sagittis ipsum dolor in turpis. Curabitur maximus mi in metus hendrerit, id finibus ante elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut at dolor metus. Suspendisse dapibus sapien in diam dignissim, sit amet elementum massa hendrerit.</p><h2>Main Techniques</h2><ul><li>Using third-party apps</li><li>Browser extensions</li><li>Using airplane mode</li></ul><p>Sed ut dignissim libero, in finibus purus. Curabitur et risus nec justo porttitor finibus. Phasellus molestie, justo et pellentesque gravida, ante est auctor risus, non facilisis nulla nisi non dolor.</p>",
    excerpt: "Learn the best techniques to view Instagram stories without being detected by the account owner.",
    featuredImage: "https://via.placeholder.com/1200x600",
    keywords: ["instagram", "stories", "anonymous", "privacy"],
    author: "Admin",
    publishDate: "2023-04-06T10:00:00Z",
    status: "published"
  },
  {
    id: "2",
    title: "Instagram Privacy Features You Should Know About",
    slug: "instagram-privacy-features",
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor commodo suscipit. Quisque quis ipsum in metus condimentum aliquam.</p><p>Suspendisse dignissim ante sit amet nulla ullamcorper, in commodo erat rutrum. Nullam hendrerit lectus non fringilla dictum. Fusce dapibus, leo ut malesuada aliquam, eros dolor varius felis, at sagittis ipsum dolor in turpis.</p><h2>Key Privacy Features</h2><ul><li>Two-factor authentication</li><li>Private accounts</li><li>Story controls</li><li>Restricted accounts</li></ul><p>Curabitur maximus mi in metus hendrerit, id finibus ante elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut at dolor metus.</p>",
    excerpt: "Discover the hidden privacy features on Instagram that can help protect your account and data.",
    featuredImage: "https://via.placeholder.com/1200x600",
    keywords: ["instagram", "privacy", "security", "features"],
    author: "Admin",
    publishDate: "2023-04-04T14:30:00Z",
    status: "published"
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundPost = mockPosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      setLoading(false);
    }, 300);
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto mb-6"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto mb-12"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/blog">Return to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-instablue-50/50 to-white">
      <Helmet>
        <title>{post.title} | InstaView Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.featuredImage && <meta property="og:image" content={post.featuredImage} />}
        <meta property="og:type" content="article" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.featuredImage && <meta name="twitter:image" content={post.featuredImage} />}
      </Helmet>

      <div className="container py-12 px-4 max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/blog" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </Button>

        {post.featuredImage && (
          <div className="w-full h-[400px] overflow-hidden rounded-xl mb-8">
            <img 
              src={post.featuredImage} 
              alt={post.imageAlt || post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4 text-instablue-900">{post.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span className="flex items-center mr-4">
            <User size={16} className="mr-1" /> 
            {post.author}
          </span>
          <span className="flex items-center mr-4">
            <CalendarIcon size={16} className="mr-1" /> 
            {new Date(post.publishDate).toLocaleDateString()}
          </span>
          {post.lastModified && (
            <span className="flex items-center">
              <Clock size={16} className="mr-1" /> 
              Updated: {new Date(post.lastModified).toLocaleDateString()}
            </span>
          )}
        </div>

        <Separator className="mb-8" />
        
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        
        <Separator className="my-8" />
        
        <div className="flex flex-wrap gap-2 mb-8">
          {post.keywords.map(keyword => (
            <span 
              key={keyword} 
              className="bg-instablue-100 text-instablue-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              <Tag size={12} className="mr-1" />
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
