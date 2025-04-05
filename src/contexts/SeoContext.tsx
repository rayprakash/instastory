
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  favicon: string;
  logo: string;
}

interface SeoContextType {
  seoSettings: SeoSettings;
  updateSeoSettings: (settings: Partial<SeoSettings>) => void;
}

const defaultSeoSettings: SeoSettings = {
  title: 'InstaView - Anonymous Instagram Stories Viewer',
  description: 'View Instagram stories anonymously without being detected. Free, easy-to-use, and secure.',
  keywords: 'instagram viewer, anonymous, stories, instagram, social media',
  favicon: '/favicon.ico',
  logo: '',
};

const SeoContext = createContext<SeoContextType>({
  seoSettings: defaultSeoSettings,
  updateSeoSettings: () => {},
});

export const useSeo = () => useContext(SeoContext);

export const SeoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    // Load SEO settings from localStorage if available
    const savedSettings = localStorage.getItem('instaview-seo-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSeoSettings;
  });

  useEffect(() => {
    // Save to localStorage whenever settings change
    localStorage.setItem('instaview-seo-settings', JSON.stringify(seoSettings));
  }, [seoSettings]);

  const updateSeoSettings = (newSettings: Partial<SeoSettings>) => {
    setSeoSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SeoContext.Provider value={{ seoSettings, updateSeoSettings }}>
      <Helmet>
        <title>{seoSettings.title}</title>
        <meta name="description" content={seoSettings.description} />
        <meta name="keywords" content={seoSettings.keywords} />
        <link rel="icon" href={seoSettings.favicon} />
        <meta property="og:title" content={seoSettings.title} />
        <meta property="og:description" content={seoSettings.description} />
        <meta property="twitter:title" content={seoSettings.title} />
        <meta property="twitter:description" content={seoSettings.description} />
      </Helmet>
      {children}
    </SeoContext.Provider>
  );
};
