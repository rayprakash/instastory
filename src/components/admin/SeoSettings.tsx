
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSeo } from '@/contexts/SeoContext';

interface SeoSettingsProps {
  onSave: () => void;
}

const SeoSettings = ({ onSave }: SeoSettingsProps) => {
  const { seoSettings, updateSeoSettings } = useSeo();
  const [localSettings, setLocalSettings] = useState({ ...seoSettings });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings(localSettings);
    onSave();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">SEO Settings</h2>
      <p className="text-gray-600">Configure your site's SEO settings to improve search engine rankings.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-gradient p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <Input 
              name="title" 
              value={localSettings.title} 
              onChange={handleChange} 
              className="w-full" 
              placeholder="Enter page title"
            />
            <p className="text-xs text-gray-500 mt-1">
              The title that appears in search engine results (50-60 characters recommended)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <Textarea 
              name="description" 
              value={localSettings.description} 
              onChange={handleChange} 
              className="w-full" 
              placeholder="Enter meta description"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              A brief summary of your page (150-160 characters recommended)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
            <Input 
              name="keywords" 
              value={localSettings.keywords} 
              onChange={handleChange} 
              className="w-full" 
              placeholder="Enter keywords separated by commas"
            />
            <p className="text-xs text-gray-500 mt-1">
              Keywords that describe your content (comma-separated)
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-gradient hover:opacity-90 px-8">
            Save SEO Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SeoSettings;
