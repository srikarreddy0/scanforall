
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
    <header className="flex items-center justify-between p-4 h-16 backdrop-blur-xl bg-gradient-to-r from-indigo-900/80 to-emerald-900/80 border-b border-white/10 shadow-lg">
      <div className="flex items-center gap-2">
        {showBack && (
          <Link to="/" className="nav-button relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <ArrowLeft size={24} className="text-white relative z-10" />
          </Link>
        )}
        <div className="flex items-center">
          <Shield size={20} className="text-emerald-300 mr-2 animate-pulse" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-teal-100 to-emerald-200 bg-clip-text text-transparent">{title}</h1>
        </div>
      </div>
      
      <div className="flex gap-3">
        {showHistory && location.pathname !== '/history' && (
          <Link to="/history" className="nav-button relative group">
            <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <HistoryIcon size={24} className="text-white relative z-10" />
          </Link>
        )}
        
        {/* Notification icon with indicator - neumorphism style */}
        <Link to="/notifications" className="nav-button relative group">
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          <Bell size={24} className={`relative z-10 ${location.pathname === '/notifications' ? 'text-emerald-300' : 'text-white'}`} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse"></span>
        </Link>
        
        {/* Settings and profile icons, visible on pages other than home - with glassmorphism hover effect */}
        {location.pathname !== '/' && (
          <>
            <Link to="/settings" className="nav-button relative group">
              <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <Settings size={24} className={`relative z-10 ${location.pathname === '/settings' ? 'text-emerald-300' : 'text-white'}`} />
            </Link>
            
            <Link to="/profile" className="nav-button relative group">
              <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <User size={24} className={`relative z-10 ${location.pathname === '/profile' ? 'text-emerald-300' : 'text-white'}`} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
