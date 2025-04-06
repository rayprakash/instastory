
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Globe, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Default languages
const defaultLanguages = [
  { code: "en", name: "English", isDefault: true, active: true },
  { code: "es", name: "Español", isDefault: false, active: true },
  { code: "fr", name: "Français", isDefault: false, active: true },
  { code: "de", name: "Deutsch", isDefault: false, active: true },
  { code: "zh", name: "中文", isDefault: false, active: true },
  { code: "hi", name: "हिंदी", isDefault: false, active: true },
  { code: "ar", name: "العربية", isDefault: false, active: true },
  { code: "ru", name: "Русский", isDefault: false, active: true },
];

interface LanguageSettingsProps {
  onSave: () => void;
}

const LanguageSettings = ({ onSave }: LanguageSettingsProps) => {
  const { toast } = useToast();
  const [languages, setLanguages] = useState(defaultLanguages);
  const [newLanguage, setNewLanguage] = useState({ code: "", name: "" });
  const [apiKey, setApiKey] = useState("");
  const [translationService, setTranslationService] = useState("google");

  const handleAddLanguage = () => {
    if (!newLanguage.code || !newLanguage.name) {
      toast({
        title: "Error",
        description: "Both language code and name are required",
        variant: "destructive",
      });
      return;
    }

    if (languages.some(lang => lang.code === newLanguage.code)) {
      toast({
        title: "Error",
        description: "Language code already exists",
        variant: "destructive",
      });
      return;
    }

    setLanguages([
      ...languages,
      { ...newLanguage, isDefault: false, active: true }
    ]);
    
    setNewLanguage({ code: "", name: "" });
  };

  const toggleLanguageActive = (code: string) => {
    setLanguages(
      languages.map(lang => {
        if (lang.code === code) {
          return { ...lang, active: !lang.active };
        }
        return lang;
      })
    );
  };

  const setDefaultLanguage = (code: string) => {
    setLanguages(
      languages.map(lang => ({
        ...lang,
        isDefault: lang.code === code
      }))
    );
  };

  const deleteLanguage = (code: string) => {
    // Prevent deleting the default language
    const langToRemove = languages.find(lang => lang.code === code);
    
    if (langToRemove?.isDefault) {
      toast({
        title: "Cannot remove default language",
        description: "Please set another language as default first.",
        variant: "destructive",
      });
      return;
    }

    setLanguages(languages.filter(lang => lang.code !== code));
  };

  const saveSettings = () => {
    // In a real implementation, we would save this to a database or localStorage
    localStorage.setItem("supported-languages", JSON.stringify(languages));
    localStorage.setItem("translation-api-key", apiKey);
    localStorage.setItem("translation-service", translationService);
    
    toast({
      title: "Language settings saved",
      description: "Your language settings have been updated successfully.",
    });
    
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Settings
          </CardTitle>
          <CardDescription>
            Configure the languages available on your website and translation settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="languages">
            <TabsList className="mb-4">
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="translation">Translation API</TabsTrigger>
            </TabsList>
            
            <TabsContent value="languages" className="space-y-6">
              <Table>
                <TableCaption>Current supported languages</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages.map((language) => (
                    <TableRow key={language.code}>
                      <TableCell>{language.code}</TableCell>
                      <TableCell>{language.name}</TableCell>
                      <TableCell>
                        <Button 
                          variant={language.active ? "default" : "outline"} 
                          size="sm"
                          onClick={() => toggleLanguageActive(language.code)}
                        >
                          {language.active ? "Active" : "Inactive"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setDefaultLanguage(language.code)}
                          disabled={language.isDefault}
                        >
                          {language.isDefault ? <Check className="h-4 w-4 text-green-500" /> : "Set Default"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteLanguage(language.code)}
                          disabled={language.isDefault}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Add New Language</h3>
                <div className="flex items-center gap-4">
                  <Input 
                    placeholder="Language code (e.g., fr)" 
                    value={newLanguage.code}
                    onChange={(e) => setNewLanguage({...newLanguage, code: e.target.value})}
                    className="w-32"
                  />
                  <Input 
                    placeholder="Language name (e.g., French)" 
                    value={newLanguage.name}
                    onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
                  />
                  <Button onClick={handleAddLanguage} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="translation" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Translation Service</label>
                  <select
                    value={translationService}
                    onChange={(e) => setTranslationService(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="google">Google Cloud Translation API</option>
                    <option value="microsoft">Microsoft Translator API</option>
                    <option value="deepl">DeepL API</option>
                  </select>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select which service you want to use for automatic translations.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">API Key</label>
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your API key will be encrypted and stored securely.
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800">
                  <h4 className="font-medium mb-1">Usage Information</h4>
                  <p className="text-sm">
                    Translation APIs typically charge based on usage. For example, Google Cloud Translation API charges approximately $20 per million characters translated.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={saveSettings}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LanguageSettings;
