
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSeo } from '@/contexts/SeoContext';
import { Upload } from 'lucide-react';

interface SiteSettingsProps {
  onSave: () => void;
}

const SiteSettings = ({ onSave }: SiteSettingsProps) => {
  const { seoSettings, updateSeoSettings } = useSeo();
  const [localSettings, setLocalSettings] = useState({ ...seoSettings });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a URL for preview
      const imageUrl = URL.createObjectURL(file);
      setLocalSettings(prev => ({ ...prev, [type]: imageUrl }));
      
      // Store the file object
      if (type === 'logo') {
        setLogoFile(file);
      } else {
        setFaviconFile(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload the files to storage
    // Here we simulate that by just updating the settings with the local URLs
    updateSeoSettings(localSettings);
    onSave();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Site Settings</h2>
      <p className="text-gray-600">Configure your site branding and identity.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-gradient p-6 rounded-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo</label>
            <div className="flex items-start space-x-4">
              <div className="w-32 h-32 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                {localSettings.logo ? (
                  <img src={localSettings.logo} alt="Logo preview" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-gray-400">No logo</span>
                )}
              </div>
              <div className="flex-1">
                <label className="cursor-pointer">
                  <div className="flex items-center space-x-2 border border-gray-300 rounded p-2 hover:bg-gray-50 transition">
                    <Upload size={16} />
                    <span>Upload Logo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageChange(e, 'logo')}
                      className="hidden" 
                    />
                  </div>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 200px x 50px, PNG or SVG format
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                {localSettings.favicon && !localSettings.favicon.includes('/favicon.ico') ? (
                  <img src={localSettings.favicon} alt="Favicon preview" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-gray-400">Default</span>
                )}
              </div>
              <div className="flex-1">
                <label className="cursor-pointer">
                  <div className="flex items-center space-x-2 border border-gray-300 rounded p-2 hover:bg-gray-50 transition">
                    <Upload size={16} />
                    <span>Upload Favicon</span>
                    <input 
                      type="file" 
                      accept="image/x-icon,image/png" 
                      onChange={(e) => handleImageChange(e, 'favicon')}
                      className="hidden" 
                    />
                  </div>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 32x32px, ICO or PNG format
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-gradient hover:opacity-90 px-8">
            Save Site Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
