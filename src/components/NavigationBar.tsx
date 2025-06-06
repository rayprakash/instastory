
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "hi", name: "हिंदी" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" }
];

const NavigationBar = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Detect user's browser language or get from localStorage
    const savedLang = localStorage.getItem("preferred-language");
    const browserLang = navigator.language.split('-')[0];
    const supported = languages.find(lang => lang.code === (savedLang || browserLang));
    
    if (supported) {
      setCurrentLanguage(supported.code);
    }
  }, []);

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem("preferred-language", code);
    // In a real app, you would update the i18n context here
    console.log(`Language changed to ${code}`);
  };

  return (
    <nav className="w-full py-4 px-6 md:px-10 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-instablue-100">
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-2">
          <div className="font-bold text-2xl bg-clip-text text-transparent bg-blue-gradient">
            InstaView
          </div>
        </a>
        
        <div className="hidden md:flex ml-10 space-x-4">
          <Button variant="link" className="text-instablue-700" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link" className="text-instablue-700" asChild>
            <Link to="/blog">Blog</Link>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Globe size={16} />
              <span>{languages.find(l => l.code === currentLanguage)?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code} 
                onClick={() => handleLanguageChange(lang.code)}
                className={currentLanguage === lang.code ? "bg-instablue-50" : ""}
              >
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavigationBar;
