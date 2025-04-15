
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock as HistoryIcon, Bell, Settings, User, Shield, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <header className="flex items-center justify-between p-4 h-16 bg-white border-b border-blue-100">
      <div className="flex items-center gap-2">
        {showBack && (
          <Link to="/" className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200">
            <ArrowLeft size={20} className="text-blue-500" />
          </Link>
        )}
        <div className="flex items-center">
          <Shield size={20} className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
      </div>
      
      <div className="flex gap-2">
        {showHistory && location.pathname !== '/history' && (
          <Link to="/history" className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200">
            <HistoryIcon size={20} className="text-gray-600" />
          </Link>
        )}
        
        {/* Notification icon with indicator */}
        <Link to="/notifications" className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200 relative">
          <Bell size={20} className={`${location.pathname === '/notifications' ? 'text-blue-500' : 'text-gray-600'}`} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
        </Link>
        
        {/* Settings and profile icons */}
        {location.pathname !== '/' && (
          <>
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200"
              >
                <Settings size={20} className={`${location.pathname === '/settings' ? 'text-blue-500' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <Link to="/profile" className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200">
              <User size={20} className={`${location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-600'}`} />
            </Link>
          </>
        )}
        
        {/* Settings Menu Button on Home */}
        {location.pathname === '/' && (
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
            
            {/* Settings Dropdown */}
            {showSettings && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-neu-flat z-50">
                <div className="p-4 max-h-[80vh] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-blue-100 pb-2">Settings</h3>
                  
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
                </div>
                <button 
                  className="w-full p-2 text-center text-blue-500 hover:bg-blue-50 rounded-b-lg border-t border-blue-100"
                  onClick={() => setShowSettings(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

// Settings Category Component
const SettingsCategory = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200">
          <span className="font-medium text-gray-700">{title}</span>
          <ChevronDown 
            size={16} 
            className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-2 mt-2 space-y-2">
          {items.map((item, index) => (
            <SettingsSubCategory key={index} title={item.title} items={item.subitems} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

// Settings Sub-Category Component
const SettingsSubCategory = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="pl-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm rounded-md bg-white hover:bg-blue-50 transition-all duration-200">
          <span className="font-medium text-gray-700">{title}</span>
          <ChevronDown 
            size={14} 
            className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 mt-1 space-y-1">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="p-2 text-xs text-gray-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Header;
