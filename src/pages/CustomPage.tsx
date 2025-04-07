
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { useSeo } from "@/contexts/SeoContext";

const CustomPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { updateSeo } = useSeo();
  const [pageContent, setPageContent] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = () => {
      try {
        console.log("Loading custom page with slug:", slug);
        // Get custom pages from localStorage
        const pagesStr = localStorage.getItem("instaview-custom-pages");
        
        // If no pages in localStorage, redirect to 404
        if (!pagesStr) {
          console.error("No custom pages found in localStorage");
          navigate("/not-found");
          return;
        }
        
        const pages = JSON.parse(pagesStr);
        console.log("All custom pages:", pages);
        
        // Find the page with matching slug
        const page = pages.find((p: any) => p.slug === slug);
        
        if (page) {
          console.log("Found matching page:", page);
          setPageContent({
            title: page.title,
            content: page.content,
          });
          
          // Update SEO
          updateSeo({
            title: page.title,
            description: page.description || `${page.title} - InstaView`,
          });
        } else {
          console.error("Page not found with slug:", slug);
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error loading custom page:", error);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug, navigate, updateSeo]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8">
        {pageContent && (
          <>
            <h1 className="text-3xl font-bold mb-6">{pageContent.title}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CustomPage;
