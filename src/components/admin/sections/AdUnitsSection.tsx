
import React from "react";
import { Button } from "@/components/ui/button";

interface AdUnitsSectionProps {
  onSave: () => void;
}

const AdUnitsSection = ({ onSave }: AdUnitsSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Ad Units</h2>
      
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((ad) => (
          <div key={ad} className="card-gradient p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Ad Slot {ad}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={`Ad Unit ${ad}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Code</label>
                <textarea
                  className="w-full p-2 border border-gray-300 font-mono text-sm rounded-md"
                  rows={4}
                  defaultValue={`<!-- Ad code for slot ${ad} -->\n<script async src="https://pagead2.example.com/pagead/js/adsbygoogle.js"></script>\n<!-- Replace with actual ad code -->`}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
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
                  id={`enabled-${ad}`} 
                  className="h-4 w-4 text-instablue-600 focus:ring-instablue-500 border-gray-300 rounded"
                  defaultChecked 
                />
                <label htmlFor={`enabled-${ad}`} className="ml-2 block text-sm text-gray-900">
                  Enabled
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={onSave}
          className="bg-blue-gradient hover:opacity-90 px-8"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdUnitsSection;
