
import React from "react";
import { Button } from "@/components/ui/button";

interface FaqsSectionProps {
  onSave: () => void;
}

const FaqsSection = ({ onSave }: FaqsSectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage FAQs</h2>
        <Button className="bg-blue-gradient hover:opacity-90">Add New FAQ</Button>
      </div>
      
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6, 7].map((faq) => (
          <div key={faq} className="card-gradient p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">FAQ {faq}</h3>
              <button className="text-red-600 hover:text-red-900">Remove</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={`What is FAQ question ${faq}?`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                  defaultValue={`This is the answer to FAQ ${faq}. It provides detailed information about the question asked above.`}
                ></textarea>
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

export default FaqsSection;
