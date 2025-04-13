
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, History } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showHistory?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "TrustScan", 
  showBack = false,
  showHistory = false
}) => {
  const location = useLocation();
  
  return (
    <header className="flex items-center justify-between p-4 h-16 border-b">
      <div className="flex items-center gap-2">
        {showBack && (
          <Link to="/" className="nav-button">
            <ArrowLeft size={24} className="text-darkText" />
          </Link>
        )}
        <h1 className="text-xl font-semibold text-darkText">{title}</h1>
      </div>
      
      <div>
        {showHistory && location.pathname !== '/history' && (
          <Link to="/history" className="nav-button">
            <History size={24} className="text-darkText" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
