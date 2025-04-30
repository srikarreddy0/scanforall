
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Settings, 
  User, 
  ShieldCheck,
  Sparkles,
  Palette,
  HelpCircle,
  Users,
} from 'lucide-react';
import { 
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showHistory?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "", 
  showBack = false,
  showHistory = false
}) => {
  const location = useLocation();
  
  return (
    <header className="premium-header flex items-center justify-between px-4 py-3 h-16">
      <div className="flex items-center gap-2">
        {showBack ? (
          <Link to="/" className="premium-icon-button">
            <ArrowLeft size={20} />
          </Link>
        ) : (
          <div className="flex items-center">
            <ShieldCheck 
              size={22} 
              className="text-premium-500 mr-2" 
              strokeWidth={2.5} 
            />
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        {/* Notification button with indicator */}
        <Link to="/notifications" className="premium-icon-button relative">
          <Bell size={20} className={location.pathname === '/notifications' ? 'text-premium-500' : ''} />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-premium-500 ring-2 ring-light-100 dark:ring-dark-200"></span>
        </Link>
        
        {/* Settings sheet with updated categories */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="premium-icon-button">
              <Settings size={20} className={location.pathname === '/settings' ? 'text-premium-500' : ''} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] sm:max-w-md dark:bg-dark-200 bg-light-200 dark:text-light-100 text-dark-300 dark:border-dark-100 border-light-400">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-display flex items-center dark:text-light-100 text-dark-300">
                <ShieldCheck size={24} className="text-premium-500 mr-2" />
                <span>Settings</span>
              </SheetTitle>
              <SheetDescription className="dark:text-light-500 text-dark-400">
                Configure your authentication and scanning experience
              </SheetDescription>
            </SheetHeader>
            
            <Accordion type="single" collapsible className="w-full">
              {/* Features */}
              <SettingsCategory 
                title="Features" 
                icon={<Sparkles size={18} className="text-premium-500 mr-2" />}
                items={[
                  { title: "User Scans QR", subitems: ["Voice Output for Blind Users", "AR/Text for General Users"] },
                  { title: "QR Code Verification", subitems: ["Blockchain Ledger Check", "Fake QR Code Alerts"] },
                  { title: "Cloud Backend & Data", subitems: ["Brand Portal", "AWS/Azure Storage", "APIs for Auto Updates"] },
                  { title: "Privacy & Security", subitems: ["Edge Computing (On-Device Processing)", "AES-256 Encryption", "User-Controlled Privacy"] }
                ]} 
              />
              
              {/* Theme */}
              <SettingsCategory 
                title="Theme" 
                icon={<Palette size={18} className="text-premium-500 mr-2" />}
                items={[
                  { 
                    title: "Appearance", 
                    subitems: ["Light Mode", "Dark Mode", "System Default"], 
                    customContent: <ThemeToggle inSettings={true} />
                  },
                  { title: "Color Schemes", subitems: ["Premium Blue", "Night Sky", "Ocean Breeze"] },
                  { title: "Accessibility", subitems: ["High Contrast", "Reduced Motion", "Larger Text"] }
                ]} 
              />
              
              {/* Help */}
              <SettingsCategory 
                title="Help" 
                icon={<HelpCircle size={18} className="text-premium-500 mr-2" />}
                items={[
                  { title: "FAQ", subitems: ["Scanning Issues", "Authentication Problems", "Product Questions"] },
                  { title: "Contact Support", subitems: ["Email", "Chat", "Phone"] },
                  { title: "Tutorials", subitems: ["Quick Start Guide", "Advanced Features", "Security Tips"] }
                ]} 
              />
              
              {/* About Us */}
              <SettingsCategory 
                title="About Us" 
                icon={<Users size={18} className="text-premium-500 mr-2" />}
                items={[
                  { title: "Our Mission", subitems: ["Accessibility for All", "Fighting Counterfeit Products", "Building Trust"] },
                  { title: "The Team", subitems: ["Leadership", "Developers", "Advisors"] },
                  { title: "Legal", subitems: ["Privacy Policy", "Terms of Service", "Licenses"] }
                ]} 
              />
            </Accordion>
          </SheetContent>
        </Sheet>
        
        {/* User profile - Only show on non-profile pages */}
        {location.pathname !== '/profile' && (
          <Link to="/profile" className="premium-icon-button">
            <User size={20} className={location.pathname === '/profile' ? 'text-premium-500' : ''} />
          </Link>
        )}
      </div>
    </header>
  );
};

// Settings Category Component
const SettingsCategory = ({ title, icon, items }) => {
  return (
    <AccordionItem value={title.toLowerCase().replace(/\s/g, '-')} className="dark:border-dark-100 border-light-400">
      <AccordionTrigger className="text-lg font-medium py-3 dark:text-light-100 text-dark-300 hover:text-premium-500">
        <div className="flex items-center">
          {icon}
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-1">
        {items.map((item, index) => (
          <SettingsSubCategory 
            key={index} 
            title={item.title} 
            items={item.subitems} 
            customContent={item.customContent} 
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

// Settings Sub-Category Component
const SettingsSubCategory = ({ title, items, customContent }) => {
  return (
    <Accordion type="single" collapsible className="w-full dark:border-dark-100 border-light-400 pl-3 py-1 mb-2">
      <AccordionItem value={title.toLowerCase().replace(/\s/g, '-')} className="border-none">
        <AccordionTrigger className="text-md py-2 dark:text-light-300 text-dark-400 hover:text-premium-500">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          {customContent ? (
            <div className="pl-2 py-2">{customContent}</div>
          ) : (
            <div className="space-y-2 pl-2">
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-sm py-2 px-3 rounded-lg dark:text-light-400 text-dark-500 dark:hover:bg-dark-100 hover:bg-light-400 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Header;
