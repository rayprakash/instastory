
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useSeo } from "@/contexts/SeoContext";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

const CustomPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { seoSettings } = useSeo();

  useEffect(() => {
    setLoading(true);
    
    // Get pages from localStorage
    const savedPages = localStorage.getItem('instaview-pages');
    const pages = savedPages ? JSON.parse(savedPages) : [];
    
    // Find the page with matching slug
    const foundPage = pages.find((p: Page) => p.slug === slug);
    
    if (foundPage) {
      setPage(foundPage);
      setNotFound(false);
    } else {
      setPage(null);
      setNotFound(true);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto mb-6"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto mb-12"></div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Page not found</p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{page?.title} | {seoSettings.title}</title>
      </Helmet>
      
      <NavigationBar />
      
      <main className="flex-grow container px-4 py-12 max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/" className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-4xl font-bold mb-8 text-instablue-900">{page?.title}</h1>
        
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page?.content || '' }} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomPage;
