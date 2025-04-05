
import React from "react";
import { Button } from "@/components/ui/button";

interface FeaturesSectionProps {
  onSave: () => void;
}

const FeaturesSection = ({ onSave }: FeaturesSectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Features</h2>
        <Button className="bg-blue-gradient hover:opacity-90">Add New Feature</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((feature) => (
          <div key={feature} className="card-gradient p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Feature {feature}</h3>
              <button className="text-red-600 hover:text-red-900">Remove</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={`Feature ${feature} Title`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  defaultValue={`This is the description for feature ${feature}...`}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Shield</option>
                  <option>Eye</option>
                  <option>Download</option>
                  <option>Clock</option>
                  <option>Lock</option>
                </select>
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

export default FeaturesSection;
