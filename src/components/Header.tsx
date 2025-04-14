
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock as HistoryIcon, Bell, Settings, User, Shield } from 'lucide-react';

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
            <Link to="/settings" className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200">
              <Settings size={20} className={`${location.pathname === '/settings' ? 'text-blue-500' : 'text-gray-600'}`} />
            </Link>
            
            <Link to="/profile" className="p-2 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200">
              <User size={20} className={`${location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-600'}`} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
