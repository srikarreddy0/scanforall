
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  User, 
  Search, 
  Shield, 
  Clock as HistoryIcon, 
  Bell,
  BarChart2
} from 'lucide-react';
import Header from '../components/Header';
import Scanner from '../components/Scanner';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleScan = (productId: string) => {
    // Navigate to product details page with the scanned product ID
    navigate(`/product/${productId}`);
  };

  return (
    <div className="app-container bg-gradient-to-b from-blue-50 to-white">
      <Header showHistory={true} />
      
      <div className="p-6 flex flex-col h-[calc(100vh-4rem)]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">Verify Product</h1>
          <p className="text-gray-600 animate-fade-in">
            Authenticate your products with a simple scan
          </p>
        </div>
        
        {/* Quick access buttons with white/blue neumorphic design */}
        <div className="flex justify-around mb-8 space-x-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center bg-transparent hover:bg-transparent"
            onClick={() => navigate('/search')}
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200 flex items-center justify-center mb-2">
              <Search size={20} className="text-gray-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">Search</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center bg-transparent hover:bg-transparent"
            onClick={() => navigate('/history')}
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200 flex items-center justify-center mb-2">
              <HistoryIcon size={20} className="text-gray-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">History</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center bg-transparent hover:bg-transparent"
            onClick={() => navigate('/notifications')}
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200 flex items-center justify-center mb-2 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
            </div>
            <span className="text-xs font-medium text-gray-600">Alerts</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center bg-transparent hover:bg-transparent"
            onClick={() => navigate('/profile')}
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200 flex items-center justify-center mb-2">
              <User size={20} className="text-gray-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">Profile</span>
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield className="text-blue-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">ScanForAll</h2>
            </div>
            <p className="text-sm text-gray-600">Position QR code within frame</p>
          </div>
          
          <Scanner onScan={handleScan} />
        </div>
        
        {/* Quick info tabs with neumorphic styling */}
        <div className="mt-8">
          <div className="grid grid-cols-4 border-b border-blue-100">
            <Button variant="ghost" className="py-3 text-xs font-medium text-gray-600 hover:bg-blue-50">Details</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-gray-600 hover:bg-blue-50">Mfg - Exp</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-gray-600 hover:bg-blue-50">Contents</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-gray-600 hover:bg-blue-50">Usage</Button>
          </div>
        </div>
        
        {/* Settings button with neumorphic style */}
        <div className="fixed bottom-6 right-6">
          <Button 
            className="h-14 w-14 rounded-full bg-white shadow-neu-flat hover:shadow-neu-pressed transition-all duration-200 flex items-center justify-center"
            onClick={() => navigate('/settings')}
          >
            <Settings size={24} className="text-blue-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
