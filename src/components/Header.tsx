
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock as HistoryIcon, 
  Bell, 
  Settings, 
  User, 
  ShieldCheck,
  X,
  Menu
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

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showHistory?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "ScanForAll", 
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
            <h1 className="text-xl font-display font-semibold text-dark-100">
              {title}
            </h1>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        {showHistory && location.pathname !== '/history' && (
          <Link to="/history" className="premium-icon-button">
            <HistoryIcon size={20} />
          </Link>
        )}
        
        {/* Notification button with indicator */}
        <Link to="/notifications" className="premium-icon-button relative">
          <Bell size={20} className={location.pathname === '/notifications' ? 'text-premium-500' : ''} />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-premium-500 ring-2 ring-light-100"></span>
        </Link>
        
        {/* Settings sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="premium-icon-button">
              <Settings size={20} className={location.pathname === '/settings' ? 'text-premium-500' : ''} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] sm:max-w-md">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-display flex items-center">
                <ShieldCheck size={24} className="text-premium-500 mr-2" />
                <span>ScanForAll Settings</span>
              </SheetTitle>
              <SheetDescription>
                Configure your authentication and scanning experience
              </SheetDescription>
            </SheetHeader>
            
            <Accordion type="single" collapsible className="w-full">
              {/* Technical Architecture */}
              <SettingsCategory 
                title="Technical Architecture" 
                items={[
                  { title: "User Scans QR", subitems: ["Voice Output for Blind Users", "AR/Text for General Users"] },
                  { title: "QR Code Verification", subitems: ["Blockchain Ledger Check", "Fake QR Code Alerts"] },
                  { title: "Cloud Backend & Data", subitems: ["Brand Portal", "AWS/Azure Storage", "APIs for Auto Updates"] },
                  { title: "Privacy & Security", subitems: ["Edge Computing (On-Device Processing)", "AES-256 Encryption", "User-Controlled Privacy"] }
                ]} 
              />
              
              {/* QR Code Security */}
              <SettingsCategory 
                title="QR Code Security" 
                items={[
                  { title: "Blockchain Authentication", subitems: ["Tamper-Proof QR Codes", "Immutable Scan Records"] },
                  { title: "Scan Verification Alerts", subitems: ["User Warning for Fake QR", "Report Counterfeit Products"] },
                  { title: "Holographic Security", subitems: ["Dynamic QR Patterns", "Prevent Unauthorized Duplication"] },
                  { title: "AI-Based Verification", subitems: ["Detect Packaging Inconsistencies", "Cross-Check Logo & Shape"] }
                ]} 
              />
              
              {/* Business Strategy */}
              <SettingsCategory 
                title="Business Strategy" 
                items={[
                  { title: "Regulatory Compliance", subitems: ["FSSAI & CDSCO Partnerships", "Certified Accessibility Badge"] },
                  { title: "Cost Efficiency", subitems: ["Cheaper than Braille Labels", "Govt Subsidies for Accessibility"] },
                  { title: "Consumer Engagement", subitems: ["Loyalty Points for Scans", "QR-Based Discounts"] }
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
const SettingsCategory = ({ title, items }) => {
  return (
    <AccordionItem value={title.toLowerCase().replace(/\s/g, '-')}>
      <AccordionTrigger className="text-lg font-medium py-3">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pl-1">
        {items.map((item, index) => (
          <SettingsSubCategory key={index} title={item.title} items={item.subitems} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

// Settings Sub-Category Component
const SettingsSubCategory = ({ title, items }) => {
  return (
    <Accordion type="single" collapsible className="w-full border-l border-light-500 pl-3 py-1 mb-2">
      <AccordionItem value={title.toLowerCase().replace(/\s/g, '-')} className="border-none">
        <AccordionTrigger className="text-md py-2">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pl-2">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center text-sm py-2 px-3 rounded-lg text-dark-200 hover:bg-light-300 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Header;
