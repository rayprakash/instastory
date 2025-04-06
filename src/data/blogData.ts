
import { BlogPost } from "@/types/blog";

// Get blog posts from localStorage or use defaults
export const getBlogPosts = (): BlogPost[] => {
  const savedPosts = localStorage.getItem('instaview-blog-posts');
  
  if (savedPosts) {
    return JSON.parse(savedPosts);
  }
  
  // Default posts if nothing in localStorage
  const defaultPosts: BlogPost[] = [
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
  
  // Save default posts to localStorage
  localStorage.setItem('instaview-blog-posts', JSON.stringify(defaultPosts));
  
  return defaultPosts;
};

// Save blog posts to localStorage
export const saveBlogPosts = (posts: BlogPost[]): void => {
  localStorage.setItem('instaview-blog-posts', JSON.stringify(posts));
};
