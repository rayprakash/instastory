
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface ContactSettingsProps {
  onSave: () => void;
}

const ContactSettings = ({ onSave }: ContactSettingsProps) => {
  const { toast } = useToast();
  const [notificationEmail, setNotificationEmail] = useState("admin@example.com");
  const [successMessage, setSuccessMessage] = useState("Thank you for your message. We'll get back to you soon!");
  const [formFields, setFormFields] = useState([
    { id: 1, name: "name", label: "Name", required: true, active: true },
    { id: 2, name: "email", label: "Email", required: true, active: true },
    { id: 3, name: "message", label: "Message", required: true, active: true },
    { id: 4, name: "phone", label: "Phone Number", required: false, active: false }
  ]);

  const toggleField = (id: number) => {
    setFormFields(
      formFields.map(field =>
        field.id === id ? { ...field, active: !field.active } : field
      )
    );
  };

  const toggleRequired = (id: number) => {
    setFormFields(
      formFields.map(field =>
        field.id === id ? { ...field, required: !field.required } : field
      )
    );
  };

  const handleSave = () => {
    // In a real implementation, you would save these settings to a backend
    console.log("Saving contact settings:", {
      notificationEmail,
      successMessage,
      formFields
    });
    
    toast({
      title: "Contact settings saved",
      description: "Your contact form settings have been updated."
    });
    
    onSave();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Form Settings</h2>
      
      <div className="card-gradient p-6 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Email
            </label>
            <Input
              type="email"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              placeholder="Where to send form submissions"
            />
            <p className="text-sm text-gray-500 mt-1">
              Form submissions will be sent to this email address
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Success Message
            </label>
            <Textarea
              value={successMessage}
              onChange={(e) => setSuccessMessage(e.target.value)}
              placeholder="Message to display after successful submission"
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <div className="card-gradient p-6 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-4">Form Fields</h3>
        <div className="space-y-4">
          {formFields.map((field) => (
            <div key={field.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div>
                <p className="font-medium">{field.label}</p>
                <p className="text-sm text-gray-500">{field.name}</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`required-${field.id}`}
                    checked={field.required}
                    onCheckedChange={() => toggleRequired(field.id)}
                    disabled={!field.active}
                  />
                  <label htmlFor={`required-${field.id}`} className="text-sm text-gray-700">
                    Required
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`active-${field.id}`}
                    checked={field.active}
                    onCheckedChange={() => toggleField(field.id)}
                  />
                  <label htmlFor={`active-${field.id}`} className="text-sm text-gray-700">
                    Active
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button onClick={handleSave} className="bg-blue-gradient hover:opacity-90 px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ContactSettings;
