
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
    <header className="flex items-center justify-between p-4 h-16 neu-header">
      <div className="flex items-center gap-2">
        {showBack && (
          <Link to="/" className="neu-button-small relative group">
            <ArrowLeft size={20} className="text-neu-text" />
          </Link>
        )}
        <div className="flex items-center">
          <Shield size={20} className="text-neu-accent mr-2" />
          <h1 className="text-xl font-semibold text-neu-text">{title}</h1>
        </div>
      </div>
      
      <div className="flex gap-2">
        {showHistory && location.pathname !== '/history' && (
          <Link to="/history" className="neu-button-small relative group p-2">
            <HistoryIcon size={20} className="text-neu-text" />
          </Link>
        )}
        
        {/* Notification icon with indicator */}
        <Link to="/notifications" className="neu-button-small relative group p-2">
          <Bell size={20} className={`${location.pathname === '/notifications' ? 'text-neu-accent' : 'text-neu-text'}`} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-neu-accent"></span>
        </Link>
        
        {/* Settings and profile icons */}
        {location.pathname !== '/' && (
          <>
            <Link to="/settings" className="neu-button-small relative group p-2">
              <Settings size={20} className={`${location.pathname === '/settings' ? 'text-neu-accent' : 'text-neu-text'}`} />
            </Link>
            
            <Link to="/profile" className="neu-button-small relative group p-2">
              <User size={20} className={`${location.pathname === '/profile' ? 'text-neu-accent' : 'text-neu-text'}`} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
