
import { ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-instablue-700 to-instablue-800 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="font-bold text-3xl mb-4">InstaView</div>
            <p className="text-instablue-100 max-w-md">
              The most reliable tool for viewing Instagram stories anonymously without being detected.
            </p>
            <p className="mt-4 text-instablue-200">
              &copy; {currentYear} InstaView. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Pages</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-instablue-200 transition">Home</a></li>
                <li><a href="#features" className="hover:text-instablue-200 transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-instablue-200 transition">How It Works</a></li>
                <li><a href="#faq" className="hover:text-instablue-200 transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-instablue-200 transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-instablue-200 transition">Terms of Service</a></li>
                <li><a href="/contact" className="hover:text-instablue-200 transition">Contact Us</a></li>
                <li><a href="/about" className="hover:text-instablue-200 transition">About</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-instablue-600 pt-6 text-sm text-instablue-300 text-center">
          <p className="mb-2">
            We are not affiliated with Instagram or Meta. This is an independent tool.
          </p>
          <p>
            Instagram™ is a registered trademark of Meta Platforms, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
