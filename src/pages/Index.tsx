
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, HelpCircle, Sparkles, Bell, Search, Shield, Clock as HistoryIcon } from 'lucide-react';
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
    <div className="app-container bg-gradient-to-b from-indigo-900 to-emerald-900 text-white min-h-screen">
      <Header showHistory={true} />
      
      <div className="p-6 flex flex-col h-[calc(100vh-4rem)]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent mb-2 animate-fade-in">Verify Product</h1>
          <p className="text-gray-300 animate-fade-in">
            Authenticate your products with a simple scan
          </p>
        </div>
        
        {/* Quick access buttons with enhanced premium design - Arranged for better user psychology */}
        <div className="flex justify-around mb-8 space-x-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/search')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 mb-2 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)]">
              <Search size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">Search</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/history')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 mb-2 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <HistoryIcon size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">History</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/notifications')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 mb-2 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)]">
              <Bell size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">Alerts</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
            onClick={() => navigate('/profile')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 mb-2 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <User size={24} className="text-white" />
            </div>
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <Shield className="text-emerald-300" size={24} />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent">ScanForAll</h2>
            </div>
            <p className="text-sm text-gray-300">Position QR code within frame</p>
          </div>
          
          <Scanner onScan={handleScan} />
        </div>
        
        {/* Quick info tabs with premium styling */}
        <div className="mt-8">
          <div className="grid grid-cols-4 border-b border-emerald-700">
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-emerald-300">Details</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-emerald-300">Mfg - Exp</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-emerald-300">Contents</Button>
            <Button variant="ghost" className="py-3 text-xs font-medium text-white hover:bg-white/10 hover:text-emerald-300">Usage</Button>
          </div>
        </div>
        
        {/* Settings button with enhanced gradient and shadow - Placed at bottom right for easy access */}
        <div className="fixed bottom-6 right-6">
          <Button 
            className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform"
            onClick={() => navigate('/settings')}
          >
            <Settings size={28} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
