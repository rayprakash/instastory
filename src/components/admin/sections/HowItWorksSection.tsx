
import React from "react";
import { Button } from "@/components/ui/button";

interface HowItWorksSectionProps {
  onSave: () => void;
}

const HowItWorksSection = ({ onSave }: HowItWorksSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit How It Works Section</h2>
      
      <div className="space-y-6">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="card-gradient p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Step {step}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Step Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={`Step ${step} Title`}
                />
                
                <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  defaultValue={`This is the description for step ${step}...`}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Step Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                  <img
                    src={`https://picsum.photos/400/300?random=${step}`}
                    alt={`Step ${step}`}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <Button variant="outline" className="w-full">Change Image</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-end mt-8">
          <Button 
            onClick={onSave}
            className="bg-blue-gradient hover:opacity-90 px-8"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
