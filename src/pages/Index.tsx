
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, HelpCircle, Sparkles, Bell, Search, Shield } from 'lucide-react';
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
    <div className="app-container bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen">
      <Header showHistory={true} />
      
      <div className="p-6 flex flex-col h-[calc(100vh-4rem)]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">Verify Product</h1>
          <p className="text-gray-300 animate-fade-in">
            Authenticate your products with a simple scan
          </p>
        </div>
        
        {/* Quick access buttons with improved design */}
        <div className="flex justify-around mb-8 space-x-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/profile')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-2 flex items-center justify-center shadow-lg">
              <User size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">Profile</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/history')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-2 flex items-center justify-center shadow-lg">
              <Search size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">Search</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/notifications')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-2 flex items-center justify-center shadow-lg">
              <Bell size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">Alerts</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/settings')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 mb-2 flex items-center justify-center shadow-lg">
              <Settings size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">Settings</span>
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield className="text-trustBlue" size={24} />
              <h2 className="text-xl font-semibold">Scan Here</h2>
            </div>
            <p className="text-sm text-gray-400">Position QR code within frame</p>
          </div>
          
          <Scanner onScan={handleScan} />
        </div>
        
        {/* Quick info tabs with improved styling */}
        <div className="mt-8">
          <div className="grid grid-cols-4 border-b border-gray-600">
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-trustBlue">Details</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-trustBlue">Mfg - Exp</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-trustBlue">Contents</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-trustBlue">Usage</Button>
          </div>
        </div>
        
        {/* Help button with gradient and shadow */}
        <div className="fixed bottom-6 right-6">
          <Button 
            className="h-14 w-14 rounded-full bg-gradient-to-br from-trustBlue to-indigo-600 shadow-xl hover:scale-110 transition-transform"
            onClick={() => navigate('/help')}
          >
            <HelpCircle size={28} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
