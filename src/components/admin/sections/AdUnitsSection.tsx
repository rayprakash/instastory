
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AdUnit, getAdUnits, saveAdUnits } from "@/utils/adminSettings";

interface AdUnitsSectionProps {
  onSave: () => void;
}

const AdUnitsSection = ({ onSave }: AdUnitsSectionProps) => {
  const [adUnits, setAdUnits] = useState<AdUnit[]>([]);

  useEffect(() => {
    // Load ad units from localStorage
    const savedAdUnits = getAdUnits();
    setAdUnits(savedAdUnits);
  }, []);

  const handleChange = (id: string, field: keyof AdUnit, value: string | boolean) => {
    setAdUnits(prev => 
      prev.map(unit => 
        unit.id === id ? { ...unit, [field]: value } : unit
      )
    );
  };

  const handleSave = () => {
    // Save ad units to localStorage
    saveAdUnits(adUnits);
    toast.success("Ad units saved successfully");
    onSave();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Ad Units</h2>
      
      <div className="space-y-6">
        {adUnits.map((ad) => (
          <div key={ad.id} className="card-gradient p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Ad Slot {ad.id}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={ad.name}
                  onChange={(e) => handleChange(ad.id, 'name', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Code</label>
                <textarea
                  className="w-full p-2 border border-gray-300 font-mono text-sm rounded-md"
                  rows={4}
                  value={ad.code}
                  onChange={(e) => handleChange(ad.id, 'code', e.target.value)}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={ad.location}
                  onChange={(e) => handleChange(ad.id, 'location', e.target.value)}
                >
                  <option>After Search Section</option>
                  <option>After How It Works</option>
                  <option>After Features</option>
                  <option>After Testimonials</option>
                  <option>After FAQ</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`enabled-${ad.id}`} 
                  className="h-4 w-4 text-instablue-600 focus:ring-instablue-500 border-gray-300 rounded"
                  checked={ad.enabled}
                  onChange={(e) => handleChange(ad.id, 'enabled', e.target.checked)}
                />
                <label htmlFor={`enabled-${ad.id}`} className="ml-2 block text-sm text-gray-900">
                  Enabled
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleSave}
          className="bg-blue-gradient hover:opacity-90 px-8"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdUnitsSection;
