
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, History, Bell, Settings, User } from 'lucide-react';

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
    <header className="flex items-center justify-between p-4 h-16 border-b border-emerald-700 bg-gradient-to-r from-indigo-800 to-emerald-800">
      <div className="flex items-center gap-2">
        {showBack && (
          <Link to="/" className="nav-button">
            <ArrowLeft size={24} className="text-white" />
          </Link>
        )}
        <h1 className="text-xl font-semibold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent">{title}</h1>
      </div>
      
      <div className="flex gap-3">
        {showHistory && location.pathname !== '/history' && (
          <Link to="/history" className="nav-button">
            <History size={24} className="text-white" />
          </Link>
        )}
        
        {/* Notification icon with indicator */}
        <Link to="/notifications" className="nav-button relative">
          <Bell size={24} className="text-white" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-emerald-400"></span>
        </Link>
        
        {/* Settings and profile icons, visible on pages other than home */}
        {location.pathname !== '/' && (
          <>
            <Link to="/settings" className="nav-button">
              <Settings size={24} className="text-white" />
            </Link>
            
            <Link to="/profile" className="nav-button">
              <User size={24} className="text-white" />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
